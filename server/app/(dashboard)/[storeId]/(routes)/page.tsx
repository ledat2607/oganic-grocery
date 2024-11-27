"use client";
import { useState, useEffect } from "react";
import { getTotalProducts } from "@/actions/get-total-product";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { getTotalSales } from "@/actions/get-total-sales";
import { getOrderStatusTotalRevenue } from "@/actions/getgrap-by-order-status";
import { getGraphTotalRevenue } from "@/actions/getgrap-total-revenue";
import { getOrderTotalRevenueByCategory } from "@/actions/getgrap-total-revenue-by-cat";
import { getOrderPaymentStatusTotalRevenue } from "@/actions/getgrap-total-revenue-by-payment-status";
import { Heading } from "@/components/heading";
import BankModal from "@/components/modal/bank-modal";
import Navbar from "@/components/navbar";
import Overview from "@/components/overview";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatter } from "@/lib/utils";
import { DollarSign, ShoppingBasket, Store as StoreIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bankData } from "@/bank";
import toast from "react-hot-toast";
import axios from "axios";

interface DashboardOverviewProps {
  params: { storeId: string };
}

const DashboardOverview = ({ params }: DashboardOverviewProps) => {
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [monthlyGraphRevenue, setMonthlyGraphRevenue] = useState<any[]>([]);
  const [paymentStatus, setPaymentStatus] = useState<any[]>([]);
  const [revenueByCat, setRevenueByCat] = useState<any[]>([]);
  const [revenueByOrderStatus, setRevenueByOrderStatus] = useState<any[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState<string>("");
  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const totalRevenueData = await getTotalRevenue(params.storeId);
      const totalSalesData = await getTotalSales(params.storeId);
      const totalProductsData = await getTotalProducts(params.storeId);
      const monthlyGraphRevenueData = await getGraphTotalRevenue(
        params.storeId
      );
      const paymentStatusData = await getOrderPaymentStatusTotalRevenue(
        params.storeId
      );
      const revenueByCatData = await getOrderTotalRevenueByCategory(
        params.storeId
      );
      const revenueByOrderStatusData = await getOrderStatusTotalRevenue(
        params.storeId
      );

      setTotalRevenue(totalRevenueData);
      setTotalSales(totalSalesData);
      setTotalProducts(totalProductsData);
      setMonthlyGraphRevenue(monthlyGraphRevenueData);
      setPaymentStatus(paymentStatusData);
      setRevenueByCat(revenueByCatData);
      setRevenueByOrderStatus(revenueByOrderStatusData);
    };

    fetchData();
  }, [params.storeId]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const [amount, setAmount] = useState("");
  const handleWithdraw = async (event: React.FormEvent) => {
  event.preventDefault();

  try {
    const response = await axios.patch(
      `/api/stores/${params.storeId}/withDrawRoute`,
      {
        withdraw: parseFloat(amount), // Số tiền cần rút
      }
    );
    console.log("Response:", response.data);
    toast.success("Withdrawal successful");
  } catch (error) {
    console.error("Error:", error);
    toast.error("Withdrawal failed");
  }
};


  const [accountNumber, setAccountNumber] = useState("");

  const formatAccountNumber = (value: string) => {
    // Xóa khoảng trắng cũ và thêm lại khoảng trắng sau mỗi 4 số
    return value.replace(/\s+/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const handleAccountNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const formattedValue = formatAccountNumber(e.target.value);
    setAccountNumber(formattedValue);
  };
  const [shake, setShake] = useState(false); // Trạng thái để kích hoạt hiệu ứng lắc
  const [error, setError] = useState<string>("");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (parseFloat(value) > totalRevenue) {
      setError("Amount cannot exceed total revenue");
      setShake(true); // Kích hoạt hiệu ứng lắc
      setTimeout(() => setShake(false), 500); // Tắt hiệu ứng sau 500ms
    } else {
      setError("");
      setShake(false);
    }
    setAmount(value);
  };
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview your store" />
        <Separator />
        <div className="grid gap-4 grid-cols-4">
          {/* Total Revenue Card */}
          <Card className="col-span-2">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-md font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <div className="text-2xl font-bold">
                {formatter.format(totalRevenue)}
              </div>
              <Button onClick={openModal}>Withdraw</Button>
            </CardContent>
          </Card>

          {/* Bank Modal */}
          <BankModal
            isOpen={isModalOpen}
            onClose={closeModal}
            title="Bank Information"
          >
            <form onSubmit={handleWithdraw}>
              <div className="space-y-4">
                <div className="space-y-4">
                  <label
                    htmlFor="bankName"
                    className="block text-sm font-medium"
                  >
                    Bank Name
                  </label>
                  <Select
                    value={selectedBank}
                    onValueChange={(value) => setSelectedBank(value)}
                    required
                  >
                    <SelectTrigger className="w-full border border-gray-300 rounded-md shadow-sm">
                      <SelectValue placeholder="Select a Bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {bankData.map((bank) => (
                        <SelectItem key={bank.id} value={bank.name}>
                          <div className="flex items-center gap-2">
                            <img
                              src={bank.image}
                              alt={bank.name}
                              className="w-6 h-6 rounded-full object-contain"
                            />
                            <span>{bank.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label
                    htmlFor="accountNumber"
                    className="block text-sm font-medium"
                  >
                    Account Number
                  </label>
                  <input
                    type="text"
                    id="accountNumber"
                    name="accountNumber"
                    value={accountNumber}
                    onChange={handleAccountNumberChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    maxLength={20} // Hạn chế độ dài (4 số x 4 cụm + 3 khoảng trắng)
                    required
                  />
                </div>

                <div>
                  <label htmlFor="amount" className="block text-sm font-medium">
                    Amount
                  </label>
                  <input
                    value={amount}
                    onChange={handleAmountChange}
                    type="number"
                    id="amount"
                    name="amount"
                    className={`mt-1 block w-full border  p-2 ${
                      error
                        ? "border-red-500 animate-bounce"
                        : "border-gray-300"
                    } rounded-md shadow-sm ${shake ? "shake-animation" : ""}`}
                    required
                  />
                  {error && (
                    <p className="text-red-500 text-sm mt-1">{error}</p>
                  )}
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button type="submit">Submit</Button>
                <Button
                  variant="secondary"
                  onClick={closeModal}
                  className="ml-2"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </BankModal>

          {/* Total Sales Card */}
          <Card className="col-span-1">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-md font-medium">Sales</CardTitle>
              <ShoppingBasket className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+ {totalSales}</div>
            </CardContent>
          </Card>

          {/* Total Products Card */}
          <Card className="col-span-1">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-md font-medium">Products</CardTitle>
              <StoreIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+ {totalProducts}</div>
            </CardContent>
          </Card>

          {/* Monthly Revenue Graph */}
          <Card className="col-span-3">
            <CardHeader className="flex items-center flex-row justify-between">
              <CardTitle className="text-md font-medium">
                Revenue By Month
              </CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Overview data={monthlyGraphRevenue} title="Revenue by Month" />
            </CardContent>
          </Card>

          {/* Placeholder for other cards */}
          <Card className="col-span-1">
            <CardHeader className="flex items-center flex-row justify-between">
              <CardTitle className="text-md font-medium">
                Revenue Payment Status
              </CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="w-full h-full">
              <Overview data={paymentStatus} title="Revenue by Order Status" />
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-md font-medium">
                Revenue By Category
              </CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Overview data={revenueByCat} title="Revenue by Category" />
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-md font-medium">
                Revenue By Order Status
              </CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Overview
                data={revenueByOrderStatus}
                title="Revenue by Order Status"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
