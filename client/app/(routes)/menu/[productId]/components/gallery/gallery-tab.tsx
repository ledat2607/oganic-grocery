"use client";

import Image from "next/image";

interface GalleryTabProps {
  url: string;
}

const GalleryTab = ({ url }: GalleryTabProps) => {
  return (
    <div
      className="
        w-full h-full aspect-square rounded-xl 
        overflow-hidden relative bg-white
        border border-neutral-200
        group transition-all duration-300
        hover:shadow-lg hover:scale-[1.03]
      "
    >
      <Image
        src={url}
        alt="Product thumbnail"
        fill
        className="object-cover transition-all duration-300 group-hover:scale-110"
      />
    </div>
  );
};

export default GalleryTab;
