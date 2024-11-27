import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

export default function ImageInputButton() {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Image Preview
      {image ? (
        <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-300 shadow">
          <Image
            src={image}
            alt="Uploaded preview"
            className="object-cover"
            fill
          />
        </div>
      ) : (
        <div className="w-32 h-32 rounded-full flex items-center justify-center bg-gray-100 border border-gray-300">
          <span className="text-gray-500 text-sm">No image</span>
        </div>
      )} */}
      {/* Upload Button */}
      <label htmlFor="image-upload">
        <Button
          variant="default"
          className="px-4 py-2 bg-white text-black hover:bg-black hover:text-white ease-in-out duration-300 rounded-full"
        >
          <ImageIcon />
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </Button>
      </label>
    </div>
  );
}
