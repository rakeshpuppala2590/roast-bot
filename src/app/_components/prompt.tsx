"use client";

import SoundAnimation from "./soundAnimation";
import ChatBot from "./chatBot";

export default function Prompt() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 bg-transparent min-h-screen">
      <div className="flex flex-row justify-center gap-3">
        <SoundAnimation />
      </div>
      <h1 className="text-6xl font-bold text-center">Yapster is listening!</h1>
      <div className="w-full max-w-3xl">
        <ChatBot />
      </div>
    </div>
  );
}
