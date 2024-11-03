'use client'

import Box from "@/components/box";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { Products } from "@/type-db";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface CartItemProps {
  item: Products;
}

const CartItem = ({ item }: CartItemProps) => {
  const [qty, setQty] = useState(item.qty ?? 1);
  const cart = useCart();

  const handleIncrement = () => {
    const newQty = qty + 1;
    setQty(newQty);
    cart.updateQty(item.id, newQty);
  };

  const handleDecrement = () => {
    if (qty > 1) {
      const newQty = qty - 1;
      setQty(newQty);
      cart.updateQty(item.id, newQty);
    }
  };

  return (
    <Box className="flex items-center justify-between gap-4 border border-gray-200 p-3 rounded-2xl">
      <div className="aspect-square w-24 min-w-24 h-24 min-h-24 rounded-md bg-gray-100 flex items-center justify-center relative overflow-hidden">
        <Image
          src={item.images[0].url}
          alt=""
          className="w-full h-full object-contain"
          fill
        />
      </div>
      <div className="w-full">
        <h2 className="w-full min-w-44 whitespace-nowrap truncate font-semibold text-2xl text-neutral-700">
          {item.name}
        </h2>
        <div className="w-full flex items-center justify-start gap-2 flex-wrap mt-4">
          {item.cuisine && (
            <div className="rounded-md bg-emerald-500/10 px-2 py-[2px] text-sm font-semibold capitalize">
              {item.cuisine}
            </div>
          )}
          {item.category && (
            <div className="rounded-md bg-red-200/80 px-2 py-[2px] text-sm font-semibold capitalize">
              {item.category}
            </div>
          )}
          {item.size && (
            <div className="rounded-md bg-red-300/40 px-2 py-[2px] text-sm font-semibold capitalize">
              {item.size}
            </div>
          )}
        </div>
      </div>
      <Box className="flex items-center justify-center h-full">
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="outline"
            onClick={handleDecrement}
            disabled={qty <= 1}
          >
            -
          </Button>
          <span className="px-4 font-bold">{qty}</span>
          <Button
            size="icon"
            variant="outline"
            onClick={handleIncrement}
          >
            +
          </Button>
        </div>
      </Box>
      <Box className="flex items-center justify-center h-full">
        <h2 className="font-bold text-muted-foreground">
          $ {(item.discountPrice * qty).toFixed(2)}
        </h2>
      </Box>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => cart.removeItem(item.id)}
        className="text-muted-foreground hover:text-red-500 p-2"
      >
        <Trash className="w-4 h-4 cursor-pointer" />
      </Button>
    </Box>
  );
};

export default CartItem;
