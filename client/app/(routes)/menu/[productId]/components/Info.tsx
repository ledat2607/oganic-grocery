'use client'

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useCart from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { Products } from "@/type-db";
import { CookingPot, ShoppingCart, Soup } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface InfoProps {
  product: Products;
}

const Info = ({ product }: InfoProps) => {
  const [qty, setQty] = useState(1);
  const cart = useCart();

  const addToCart = (data: Products) => {
    cart.addItem({ ...data, qty });
  };

  return (
    <div className="space-y-8">
      {/* Product Title */}
      <h1 className="text-4xl font-bold text-neutral-900 tracking-tight">
        {product.name}
      </h1>

      {/* Description */}
      <p className="text-lg leading-relaxed text-neutral-600">
        {product.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-3 mt-6">
        {product.category && (
          <Badge className="text-base px-4 py-2 bg-emerald-500/20 text-emerald-700 hover:bg-emerald-500/30 cursor-pointer">
            <Soup className="w-4 h-4 mr-2" />
            {product.category}
          </Badge>
        )}

        {product.cuisine && (
          <Badge className="text-base px-4 py-2 bg-red-500/20 text-red-700 hover:bg-red-500/30 cursor-pointer">
            <CookingPot className="w-4 h-4 mr-2" />
            {product.cuisine}
          </Badge>
        )}

        {product.size && (
          <Badge className="text-base px-4 py-2 bg-blue-500/20 text-blue-700 hover:bg-blue-500/30 cursor-pointer">
            <Soup className="w-4 h-4 mr-2" />
            {product.size}
          </Badge>
        )}
      </div>

      {/* Price & Quantity */}
      <div className="grid grid-cols-4 gap-6 bg-neutral-50 p-6 rounded-2xl shadow-sm">
        <div className="col-span-1 space-y-8 text-lg font-semibold text-neutral-700">
          <p>Price</p>
          <p>Serves</p>
          <p>Stock</p>
        </div>

        <div className="col-span-3 space-y-8">
          {/* Price */}
          <div className="flex items-end gap-6">
            <p className="text-3xl font-bold text-green-600">
              ${product.discountPrice}
            </p>
            <p className="text-xl text-red-400 line-through">
              ${product.price}
            </p>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <motion.div
                key={num}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setQty(num)}
                className={cn(
                  "w-10 h-10 rounded-full cursor-pointer flex items-center justify-center border-2 text-base font-semibold transition-all",
                  qty === num
                    ? "bg-green-500 text-white border-green-500 shadow-lg"
                    : "border-neutral-300 text-neutral-600"
                )}
              >
                {num}
              </motion.div>
            ))}
          </div>

          {/* Stock */}
          <div className="flex items-center gap-4 text-lg">
            <p className="font-medium text-neutral-600">Stock: {product.qty}</p>
            <p className="font-bold text-green-600 underline">
              Sold: {product.sold_out}
            </p>
          </div>
        </div>
      </div>

      {/* Add to cart */}
      <Button
        onClick={() => addToCart(product)}
        className="w-full py-6 text-xl font-semibold shadow-lg hover:shadow-xl transition-all bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-3"
      >
        <ShoppingCart className="w-6 h-6" />
        Add to cart
      </Button>
    </div>
  );
};

export default Info;
