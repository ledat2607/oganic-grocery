import { format } from "date-fns";
import { OrderColumns } from "./components/columns";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Order } from "@/type-db";
import { formatter } from "@/lib/utils";
import { OrderClient } from "./components/order-client";

const OrderPage = async ({ params }: { params: { storeId: string } }) => {
  const orderData = (
    await getDocs(collection(doc(db, "stores", params.storeId), "orders"))
  ).docs.map((doc) => doc.data()) as Order[];

  // Filter out orders that have an address
  const filteredOrderData = orderData.filter((item) => item.address);

  const formattedOrder: OrderColumns[] = filteredOrderData.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    isPaid: item.isPaid,
    images: item.orderItems.map((item) => item.images[0].url),
    products: item.orderItems.map((item) => item.id).join(","),
    productQuantities: item.orderItems.map((item) => ({
      productId: item.id,
      qty: item.qty,
    })),
    order_status: item.order_status,
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        if (item && item.qty !== undefined) {
          return total + Number(item.discountPrice * item.qty);
        }
        return total;
      }, 0)
    ),
    createdAt: item.createdAt
      ? format(item.createdAt.toDate(), "MMMM do, yyyy")
      : "",
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrder} />
      </div>
    </div>
  );
};

export default OrderPage;
