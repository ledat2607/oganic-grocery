"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // Import Select components from shadcn/ui

const MainNav = (props: React.HtmlHTMLAttributes<HTMLElement>) => {
  const pathName = usePathname();
  const params = useParams();

  const routes = [
    { href: `/${params.storeId}`, label: "Overview" },
    { href: `/${params.storeId}/products`, label: "Products" },
    { href: `/${params.storeId}/orders`, label: "Orders" },
    { href: `/${params.storeId}/billboards`, label: "Billboards" },
    { href: `/${params.storeId}/categories`, label: "Categories" },
    { href: `/${params.storeId}/sizes`, label: "Weight / Unit" },
    { href: `/${params.storeId}/cuisines`, label: "Cuisines" },
    { href: `/${params.storeId}/settings`, label: "Settings" },
  ];

  // Map chuyển sang tiếng Việt
  const vietnameseLabels: Record<string, string> = {
    Overview: "Tổng Quan",
    Products: "Sản Phẩm",
    Orders: "Đơn Hàng",
    Billboards: "Banner",
    Categories: "Danh Mục",
    "Weight / Unit": "Trọng Lượng / Đơn Vị",
    Cuisines: "Nguồn gốc",
    Settings: "Cài Đặt",
  };

  return (
    <nav className={cn("flex items-center justify-between lg:space-x-6 pl-6")}>
      {/* Select Menu for Small Screens */}
      <div className="lg:hidden ml-12">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Menu" />
          </SelectTrigger>
          <SelectContent>
            {routes.map((route) => (
              <SelectItem key={route.href} value={route.href}>
                <Link
                  href={route.href}
                  className={cn(
                    pathName === route.href ? "text-red-500" : "text-black"
                  )}
                >
                  {vietnameseLabels[route.label] || route.label}
                </Link>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Navigation Links for Large Screens */}
      <div className="hidden lg:flex items-center space-x-4 lg:space-x-6">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathName === route.href
                ? "text-red-500 dark:text-white bg-gray-200 px-2 py-2 rounded-md"
                : "text-muted-foreground"
            )}
          >
            {vietnameseLabels[route.label] || route.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MainNav;
