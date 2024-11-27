import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function SoundAnimation() {
  return (
    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-white font-bold">
      <div className="width-[500]">
        <DotLottieReact
          src="https://lottie.host/569c911c-12a2-4e5f-872b-304f8a0a9945/WztGs4Ei3E.lottie"
          loop
          autoplay
        />
      </div>
    </div>
  );
}
