"use client";

import { Input } from "@/components/ui/input";
import ImageInputButton from "./imageUpload";

export default function Prompt() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-transparent">
      <h1 className="text-5xl font-bold">Ready to get roasted?</h1>
      <p>
        Insert an image of yourself or enter your personality traits below to
        get started
      </p>
      <div className="flex flex-row justify-center gap-2 mt-4 w-full max-w-3xl">
        <ImageInputButton />
        <Input
          placeholder="Enter your personality traits"
          className="w-full md:w-2/3 lg:w-3/4"
        />
      </div>
    </div>
  );
}
