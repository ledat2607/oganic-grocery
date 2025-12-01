'use client';
import { useState } from "react";
import Box from "@/components/box";
import { Button } from "@/components/ui/button";
import { Order } from "@/type-db";
import Image from "next/image";
import Modal from "./modal-order";

interface OrderItemProps {
  order: Order;
}

export default function OrderItem({ order }: OrderItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Box>
      {/* Card */}
      <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-transform transform hover:scale-105 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <p className="font-semibold text-lg">Order #{order.id.slice(0, 6)}</p>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              order.order_status.toLowerCase() === "processing"
                ? "bg-yellow-500 text-white"
                : "bg-green-500 text-white"
            }`}
          >
            {order.order_status}
          </span>
        </div>

        {/* Thumbnail */}
        {order.orderItems[0]?.images[0]?.url && (
          <div className="w-full h-40 relative mb-3 rounded-lg overflow-hidden">
            <Image
              src={order.orderItems[0].images[0].url}
              alt={order.orderItems[0].name}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Info */}
        <p className="text-gray-500 text-sm mb-1">
          {order.orderItems.length} item(s)
        </p>
        <p className="text-gray-500 text-sm mb-3">
          {/* Placed on {order?.createdAt?.toDate().toLocaleDateString()} */}
        </p>

        <Button onClick={() => setIsModalOpen(true)}>View Details</Button>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={order}
      />
    </Box>
  );
}
