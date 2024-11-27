"use client";

import { Input } from "@/components/ui/input";
import ImageInputButton from "./imageUpload";
import SoundAnimation from "./soundAnimation";

export default function Prompt() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-transparent">
      <SoundAnimation />
      <h1 className="text-6xl font-bold">Ready to get roasted?</h1>
      <p className="text-md">
        Insert an image of yourself or enter your personality traits below to
        get started
      </p>
      <div className="flex flex-row justify-center gap-2 mt-4 w-full max-w-3xl">
        <ImageInputButton />
        <Input
          placeholder="Enter your personality traits"
          className="w-full md:w-2/3 lg:w-3/4 bg-white text-black ease-in-out duration-300 rounded-full px-4 py-2 text-lg"
        />
      </div>
    </div>
  );
}
