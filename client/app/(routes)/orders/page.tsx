import Container from "@/components/container";
import { db } from "@/lib/firebase";
import { Order } from "@/type-db";
import { auth } from "@clerk/nextjs/server";
import { collection, doc, getDocs } from "firebase/firestore";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import OrderContent from "./order-content";
import { OrderFilter } from "./order-filter";
import Image from "next/image";
import OrderItem from "./order-item";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Modal from "./modal-order";
import OrderListClient from "./order-list-client";

export const revalidate = 0;

const OrderPage = async ({
  params,
  searchParams,
}: {
  params: { storeId: string };
  searchParams: { status?: string };
}) => {
  const { userId } = auth();

  const status = (searchParams?.status || "all").toLowerCase();

  const orderData = (
    await getDocs(
      collection(doc(db, "stores", "VFiQXRkIfcT3ZdhUuhQB"), "orders")
    )
  ).docs.map((doc) => doc.data()) as Order[];

  // ⭐ Luôn lấy tất cả đơn hàng của user
  let formatedOrder = orderData.filter((item) => item.userId === userId);

  // ⭐ Chỉ lọc khi KHÔNG phải all
  if (status !== "all") {
    if (status === "processing") {
      formatedOrder = formatedOrder.filter(
        (o) => o.order_status?.toLowerCase() === "processing"
      );
    }

    if (status === "deliveried") {
      formatedOrder = formatedOrder.filter(
        (o) => o.order_status?.toLowerCase() === "deliveried"
      );
    }
  }

  return (
    <Container className="bg-gray-50 min-h-screen py-8 px-4 md:px-8">
      <OrderFilter />

      {formatedOrder.length === 0 ? (
        <div className="text-center text-gray-400 py-20 text-lg">
          No orders found
        </div>
      ) : (
        // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        //   {formatedOrder.map((order) => (
        //     <div
        //       key={order.id}
        //       className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-transform transform hover:scale-105"
        //     >
        //       {/* Order Header */}
        //       <div className="flex justify-between items-center mb-3">
        //         <p className="font-semibold text-lg">
        //           Order #{order.id.slice(0, 6)}
        //         </p>
        //         {order.order_status.toLowerCase() === "processing" && (
        //           <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">
        //             Processing
        //           </span>
        //         )}
        //         {order.order_status.toLowerCase() === "deliveried" && (
        //           <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
        //             Deliveried
        //           </span>
        //         )}
        //       </div>
        //       {/* Order Details */}
        //       <p className="text-gray-500 text-sm mb-2">
        //         {order.orderItems.length} item(s)
        //       </p>
        //       <p className="text-gray-500 text-sm mb-2">
        //         Placed on {order?.createdAt?.toDate().toLocaleDateString()}
        //       </p>
        //       {/* Thumbnail */}
        //       {order.orderItems[0]?.images[0].url && (
        //         <div className="w-full h-40 relative mb-3 rounded-lg overflow-hidden">
        //           <Image
        //             src={order.orderItems[0].images[0].url}
        //             alt="product"
        //             fill
        //             className="object-cover"
        //           />
        //         </div>
        //       )}
        //       {/* View Details Button */}
        //       <Button>View Details</Button>
        //     </div>
        //   ))}
        // </div>
        <OrderListClient orders={formatedOrder} />
      )}
    </Container>
  );
};

export default OrderPage;
