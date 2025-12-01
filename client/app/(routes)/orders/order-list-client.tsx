'use client';

import { useState } from "react";
import { Order } from "@/type-db";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Modal from "./modal-order";
import { formatTimestamp } from "@/hooks/time";

interface Props {
  orders: Order[];
}

export default function OrderListClient({ orders }: Props) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {orders.length === 0 && (
        <div className="text-center text-gray-400 py-20 text-lg">
          No orders found
        </div>
      )}

      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-transform transform hover:scale-105 flex flex-col"
        >
          <div className="flex justify-between items-center mb-3">
            <p className="font-semibold text-lg">
              Order #{order.id.slice(0, 6)}
            </p>
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

          {order.orderItems[0]?.images[0].url && (
            <div className="w-full h-40 relative mb-3 rounded-lg overflow-hidden">
              <Image
                src={order.orderItems[0].images[0].url}
                alt={order.orderItems[0].name}
                fill
                className="object-cover"
              />
            </div>
          )}

          <p className="text-gray-500 text-sm mb-2">
            {order.orderItems.length} item(s)
          </p>
          <p className="text-gray-500 text-sm mb-3">
            Placed on {formatTimestamp(order.createdAt)}
          </p>

          <Button onClick={() => setSelectedOrder(order)}>View Details</Button>
        </div>
      ))}
      {selectedOrder && (
        <Modal
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          order={selectedOrder}
        />
      )}
    </div>
  );
}
