"use client";

import SoundAnimation from "./soundAnimation";
import ChatBot from "./chatBot";
import { useState } from "react";

export default function Prompt() {
  const [listening, setListening] = useState(true);

  return (
    <div className="relative min-h-screen">
      {/* Background Animation */}
      <div className="area absolute inset-0 -z-10">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="relative flex flex-col items-center justify-center gap-8 bg-transparent text-white min-h-screen">
        <div className="flex flex-row justify-center gap-3">
          <SoundAnimation />
        </div>
        {listening && (
          <h1 className="text-6xl text-white font-bold text-center">
            I dare you to say something!
          </h1>
        )}
        <div className="w-full max-w-3xl">
          <ChatBot
            onFirstMessage={() => {
              setListening(false);
            }}
          />
        </div>
      </div>
    </div>
  );
  // return (
  //   <div className="flex flex-1 flex-col items-center justify-center gap-8 bg-transparent min-h-screen">
  //     <div className="flex flex-row justify-center gap-3">
  //       <SoundAnimation />
  //     </div>
  //     {listening && (
  //       <h1 className="text-5xl font-bold text-center">I am listening!</h1>
  //     )}
  //     <div className="w-full max-w-3xl">
  //       <ChatBot
  //         onFirstMessage={() => {
  //           setListening(false);
  //         }}
  //       />
  //     </div>
  //   </div>
  // );
}
