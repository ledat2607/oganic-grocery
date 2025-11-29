"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  scolled: boolean;
}

const MainNav = ({ className, scolled, ...props }: MainNavProps) => {
  const pathname = usePathname();

  const routes = [
    { href: "/", label: "Trang chủ" },
    { href: "/menu", label: "Menu" },
    { href: "/orders", label: "Đơn hàng" },
    { href: "/about", label: "Giới thiệu" },
    { href: "/contacts", label: "Liên hệ" },
  ];

  return (
    <nav className="ml-auto" {...props}>
      <div
        className={cn("flex items-center space-x-6 lg:space-x-10 pl-6", className)}
      >
        {routes.map((route) => {
          const isActive = pathname === route.href;

          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-base font-semibold transition-colors hover:text-primary",

                // Màu khi ACTIVE
                isActive &&
                  (scolled
                    ? "text-green-500 font-bold"
                    : "text-blue-700  dark:text-white"),

                // Màu khi KHÔNG active
                !isActive &&
                  (scolled ? "text-black" : "text-green-600 dark:text-gray-300")
              )}
            >
              {route.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MainNav;
