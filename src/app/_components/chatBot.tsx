"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { auth, db, provider } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

interface ChatMessage {
  content: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  onFirstMessage: () => void;
}

export default function ChatBot({ onFirstMessage }: ChatbotProps) {
  useEffect(() => {
    const fetchChatHistory = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        console.error("No user logged in");
        return;
      }

      const userId = currentUser.uid;

      try {
        const q = query(
          collection(db, "users", userId, "chatHistory"),
          orderBy("timestamp", "asc")
        );
        const querySnapshot = await getDocs(q);

        const fetchedMessages: ChatMessage[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();

          fetchedMessages.push({
            ...data,
            timestamp: data.timestamp.toDate(), // Convert Firestore Timestamp to Date
          } as ChatMessage);
        });

        setMessages(fetchedMessages);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();
  }, []);

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.error("No user logged in");
      return;
    }

    const userId = currentUser.uid;

    // Add user message
    const userMessage: ChatMessage = {
      content: prompt,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    // Save user message to Firestore
    try {
      await addDoc(collection(db, "users", userId, "chatHistory"), userMessage);
    } catch (error) {
      console.error("Error saving user message:", error);
    }

    if (messages.length === 0) {
      onFirstMessage();
    }

    try {
      const response = await fetch("/api/cerebras", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: prompt }),
      });
      const data = await response.json();

      // Add bot message
      const botMessage: ChatMessage = {
        content: data.response,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);

      // Save bot message to Firestore
      try {
        await addDoc(
          collection(db, "users", userId, "chatHistory"),
          botMessage
        );
      } catch (error) {
        console.error("Error saving bot message:", error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setPrompt("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-between w-full max-w-3xl bg-transparent rounded-lg p-4">
      <div className="text-center"></div>

      {/* Chat Messages */}
      <div className="flex-1 w-full overflow-y-auto p-4 rounded-lg space-y-4 bg-lavender max-h-[40vh] chat-scrollbar">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.isBot ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-xl ${
                message.isBot
                  ? "bg-gray-200/85 text-black rounded-tl-none"
                  : "bg-white/95 text-black rounded-tr-none"
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              <span className="text-xs opacity-70 block mt-1">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className="flex w-full gap-2 mt-4 bg-lavender p-2 rounded-lg"
      >
        <Input
          className="w-full bg-white text-black ease-in-out duration-300 rounded px-4 py-2 text-lg"
          placeholder="Say something!"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button
          variant="default"
          disabled={loading}
          className="bg-gradient-to-l from-purple-500/95 to-orange-500/95 text-white font-bold px-4 py-2 rounded-md hover:bg-black hover:text-white ease-in-out duration-300 disabled:bg-gray-400"
        >
          {loading ? "Sending..." : "Send"}
        </Button>
      </form>
    </div>
  );
}
