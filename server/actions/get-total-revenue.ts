import { db } from "@/lib/firebase";
import { Order, Store } from "@/type-db";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export const getTotalRevenue = async (storeId: string) => {
  try {
    // Lấy danh sách đơn hàng trong `orders` của store
    const ordersSnapshot = await getDocs(
      collection(doc(db, "stores", storeId), "orders")
    );
    const ordersData = ordersSnapshot.docs.map((doc) => doc.data()) as Order[];

    // Lấy thông tin store
    const storeSnapshot = await getDoc(doc(db, "stores", storeId));
    if (!storeSnapshot.exists()) {
      throw new Error("Store not found");
    }
    const storeData = storeSnapshot.data() as Store;
    
    // Lọc các đơn hàng có status là paid
    const paidOrders = ordersData.filter((order) => order.isPaid);

    // Tính tổng doanh thu từ các đơn hàng đã thanh toán
    const totalRevenue = paidOrders.reduce((total, order) => {
      const orderTotal = order.orderItems.reduce((orderSum, item) => {
        return orderSum + item.price * (item.qty ?? 1);
      }, 0);
      return total + orderTotal;
    }, 0);

    const revenue = totalRevenue - storeData.withdraw; // Bạn có thể dùng `revenue` nếu muốn

    // Trả về giá trị revenue thay vì đối tượng
    return revenue;
  } catch (error) {
    console.error("Error fetching total revenue:", error);
    throw new Error("Failed to calculate total revenue");
  }
};
