// Modal.tsx
import React from 'react';
import { Order } from "@/type-db";
import { CheckCircle, Truck, Loader } from "lucide-react"; // Import relevant icons

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, order }) => {
  if (!isOpen) return null;

  const statusStages = ["Processing", "Delivering", "Deliveried"];
  const currentStatusIndex = statusStages.indexOf(order.order_status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-md shadow-lg p-6 w-11/12 md:w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Order Receipt</h2>
        <div className="border-b border-gray-200 mb-4">
          <p className="text-lg">
            <strong>Order ID:</strong> {order.id}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Phone:</strong> {order.phone}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Address:</strong> {order.address}
          </p>
        </div>

        <h3 className="text-lg font-semibold mb-2">Items Ordered:</h3>
        <ul className="mb-4">
          {order.orderItems.map((item) => (
            <li key={item.id} className="flex justify-between mb-2">
              <span>
                {item.name} (x{item.qty})
              </span>
              <span>
                {(item.discountPrice || item.price).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
            </li>
          ))}
        </ul>

        <div className="border-t border-gray-200 pt-2">
          <p className="text-lg font-semibold">
            <span className="mr-2">Total:</span>
            <span className="font-bold text-red-500">
              {order.orderItems
                .reduce(
                  (total, item) =>
                    total + (item.discountPrice || item.price) * item.qty,
                  0
                )
                .toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
            </span>
          </p>
        </div>

        {/* Status bar */}
        <div className="mt-4 flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-2">
            {statusStages.map((status, index) => (
              <div key={status} className="flex flex-col items-center">
                {index === 0 && (
                  <Loader
                    className={`h-5 w-5 transition-colors duration-500 ${
                      index <= currentStatusIndex
                        ? "text-blue-500"
                        : "text-gray-300"
                    }`}
                  />
                )}
                {index === 1 && (
                  <Truck
                    className={`h-5 w-5 transition-colors duration-500 ${
                      index <= currentStatusIndex
                        ? "text-blue-500"
                        : "text-gray-300"
                    }`}
                  />
                )}
                {index === 2 && (
                  <CheckCircle
                    className={`h-5 w-5 transition-colors duration-500 ${
                      index <= currentStatusIndex
                        ? "text-blue-500"
                        : "text-gray-300"
                    }`}
                  />
                )}
                <span
                  className={`text-sm transition-colors duration-500 ${
                    index <= currentStatusIndex ? "text-blue-500" : "text-gray-300"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </div>
            ))}
          </div>

          {/* Horizontal progress line with smooth fill */}
          <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 h-2 rounded-full bg-blue-500 transition-all duration-500 ease-in-out"
              style={{ width: `${((currentStatusIndex + 1) / statusStages.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
