"use client";

import { Products } from "@/type-db";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import useCart from "@/hooks/use-cart";

interface PopularcontentProps {
  data: Products;
}

const Popularcontent = ({ data }: PopularcontentProps) => {
  const cart = useCart();
  const [isLiked, setIsLiked] = useState(false);

  const addToCart = (data: Products) => {
    cart.addItem({ ...data, qty: 1 });
  };

  return (
    <div
      className="
        group
        w-full 
        bg-white 
        rounded-2xl 
        border 
        shadow-sm 
        hover:shadow-md 
        transition 
        overflow-hidden 
        flex 
        flex-col
      "
    >
      {/* Product Image */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={data.images[0]?.url}
          alt={data.name}
          fill
          className="
            object-cover 
            group-hover:scale-105 
            transition 
            duration-300
          "
        />

        {/* Wishlist Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="
            absolute 
            top-3 
            right-3 
            bg-white 
            rounded-full 
            p-2 
            shadow-sm 
            hover:shadow-md 
            transition
          "
        >
          <Heart
            className={`w-5 h-5 ${
              isLiked ? "text-red-500 fill-red-500" : "text-neutral-600"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">

        {/* Name */}
        <Link href={`/menu/${data.id}`}>
          <h2
            className="
              text-lg 
              font-semibold 
              text-neutral-900 
              mb-1 
              line-clamp-1
            "
          >
            {data.name}
          </h2>
        </Link>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap mb-3">
          <span className="px-2 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700">
            {data.cuisine}
          </span>
          <span className="px-2 py-1 text-xs rounded-full bg-rose-100 text-rose-700">
            {data.category}
          </span>
          <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700">
            {data.size}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-neutral-500 line-clamp-2 mb-4">
          {data.description}
        </p>

        {/* Price + Order */}
        <div className="mt-auto flex items-center gap-3">
          <div className="text-xl font-bold text-emerald-600">
            ${data.discountPrice}
          </div>

          <Link className="w-full" href={`/menu/${data.id}`}>
            <Button
              className="
                w-full 
                bg-emerald-500 
                hover:bg-emerald-600 
                text-white 
                rounded-xl 
                font-semibold
              "
            >
              Order
            </Button>
          </Link>

          {/* Add to cart */}
          <Button
            onClick={() => addToCart(data)}
            className="
              p-2 
              bg-neutral-200 
              hover:bg-neutral-300 
              rounded-xl
            "
          >
            <ShoppingCart className="w-5 h-5 text-neutral-700" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Popularcontent;
