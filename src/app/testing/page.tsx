"use client";
import { useState } from "react";

interface ChatMessage {
  content: string;
  isBot: boolean;
  timestamp: Date;
}

export default function RoastBot() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      content: prompt,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

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
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setPrompt("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Roast Bot 🔥</h1>

      {/* Chat Messages */}
      <div className="h-[60vh] overflow-y-auto mb-4 space-y-4 p-4 border rounded-lg">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.isBot ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.isBot
                  ? "bg-gray-200 rounded-tl-none"
                  : "bg-blue-500 text-white rounded-tr-none"
              }`}
            >
              <p>{message.content}</p>
              <span className="text-xs opacity-70">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-md"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
