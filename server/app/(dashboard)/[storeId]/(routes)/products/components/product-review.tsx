"use client";

import Image from "next/image";

interface ProductPreviewProps {
  name: string;
  price: number;
  discountPrice?: number;
  description?: string;
  image?: string;
  category?: string;
}

export default function ProductPreview({
  name,
  price,
  discountPrice,
  description,
  image,
  category,
}: ProductPreviewProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);

  return (
    <div className="bg-white/90 backdrop-blur-lg p-4 rounded-3xl shadow-xl w-full max-w-sm mx-auto border border-green-100 transition hover:shadow-2xl">
      <div className="relative h-48 w-full overflow-hidden rounded-2xl">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-green-50 text-green-600">
            No Image
          </div>
        )}
      </div>

      <div className="mt-4 space-y-1">
        <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full">
          {category || "Unknown"}
        </span>

        <h2 className="text-lg font-bold text-gray-800 truncate">{name || "Product Name"}</h2>

        <div className="flex items-center gap-2">
          {discountPrice && discountPrice < price && (
            <span className="text-sm line-through text-gray-400">
              {formatCurrency(price)}
            </span>
          )}
          <span className="text-xl font-semibold text-green-600">
            {formatCurrency(discountPrice && discountPrice < price ? discountPrice : price)}
          </span>
        </div>

        <p className="text-gray-500 text-sm line-clamp-2">
          {description || "No description yet..."}
        </p>
      </div>
    </div>
  );
}
