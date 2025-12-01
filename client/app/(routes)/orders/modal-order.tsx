'use client';

import { Order } from "@/type-db";
import { Dialog } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { formatTimestamp } from "@/hooks/time";



interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
}

export default function ModalOrder({ isOpen, onClose, order }: ModalProps) {
  const steps = ["Processing", "Delivering", "Deliveried"];
  const currentStepIndex = steps.findIndex(
    (s) => s.toLowerCase() === order.order_status?.toLowerCase()
  );

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-50 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black/30" onClick={onClose} />

        <div className="relative bg-white rounded-2xl max-w-2xl w-full p-6 shadow-lg space-y-6">
          <Dialog.Title className="text-xl font-semibold text-gray-800">
            Order #{order.id.slice(0, 6)}
          </Dialog.Title>

          {/* Timeline / Progress */}
          <div className="flex mx-8 mt-6 items-center justify-between mb-6">
            {steps.map((step, idx) => (
              <div key={step} className="flex-1 flex items-center">
                {/* Circle */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
                    idx <= currentStepIndex ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  {idx + 1}
                </div>

                {/* Line nối (trừ step cuối) */}
                {idx <= steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      idx <= currentStepIndex ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                )}

                {/* Step label */}
                <span className="absolute top-16 text-xs font-bold text-center w-20 translate-x-1/2">
                  {step}
                </span>
              </div>
            ))}
          </div>

          {/* Order Info */}
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Placed on: {formatTimestamp(order.createdAt)}
            </p>
            <p className="text-sm text-gray-600">
              Shipping to: {order.address}
            </p>
            <p className="text-sm text-gray-600">Phone: {order.phone}</p>
            <p className="text-sm text-gray-600">
              Payment:{" "}
              <span
                className={order.isPaid ? "text-green-500" : "text-red-500"}
              >
                {order.isPaid ? "Paid" : "Unpaid"}
              </span>
            </p>
          </div>

          {/* Order Items */}
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {order.orderItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b pb-2"
              >
                <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={item.images[0].url}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500">Quantity: {item.qty}</p>
                  <p className="text-sm text-gray-500">Price: ${item.price}</p>
                </div>
              </div>
            ))}
          </div>

          <Button onClick={onClose} className="w-full mt-4">
            Close
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
