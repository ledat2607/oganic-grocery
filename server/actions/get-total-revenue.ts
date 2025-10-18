import { db } from "@/lib/firebase";
import { Order, Store } from "@/type-db";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export const getTotalRevenue = async (storeId: string) => {
  try {
    const ordersSnapshot = await getDocs(
      collection(doc(db, "stores", storeId), "orders")
    );
    const ordersData = ordersSnapshot.docs.map((doc) => doc.data()) as Order[];

    const storeSnapshot = await getDoc(doc(db, "stores", storeId));
    if (!storeSnapshot.exists()) throw new Error("Store not found");

    const storeData = storeSnapshot.data() as Store;

    const paidOrders = ordersData.filter((order) => order.isPaid);

    const totalRevenue = paidOrders.reduce((total, order) => {
      const orderTotal = order.orderItems.reduce((orderSum, item) => {
        const price = Number(item.price) || 0;
        const qty = Number(item.qty) || 1;
        return orderSum + price * qty;
      }, 0);
      return total + orderTotal;
    }, 0);

    const revenue = totalRevenue - (Number(storeData.withdraw) || 0);

    return Number.isFinite(revenue) ? revenue : 0;
  } catch (error) {
    console.error("Error fetching total revenue:", error);
    return 0;
  }
};
