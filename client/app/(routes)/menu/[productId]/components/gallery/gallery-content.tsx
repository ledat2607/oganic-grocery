"use client";

import Image from "next/image";

interface GallerContentProps {
  url: string;
}

const GalleryContent = ({ url }: GallerContentProps) => {
  return (
    <div
      className="
        w-full max-w-[550px] aspect-square 
        rounded-2xl overflow-hidden relative
        bg-gradient-to-br from-white to-neutral-100
        border border-neutral-200
        shadow-xl
        transition-all duration-300
        hover:shadow-2xl hover:scale-[1.01]
      "
    >
      <Image
        src={url}
        alt="Product image"
        fill
        className="
          object-contain p-4 
          transition-all duration-300 
          hover:scale-105
        "
      />
    </div>
  );
};

export default GalleryContent;
