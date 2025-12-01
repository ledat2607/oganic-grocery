"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Processing", value: "processing" },
  { label: "Deliveried", value: "deliveried" },
];

export function OrderFilter() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const status = params.get("status") || "all";

  const setFilter = (value: string) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set("status", value);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <div className="flex gap-3 mt-4 mb-6 flex-wrap">
      {FILTERS.map((item) => (
        <Badge
          key={item.value}
          onClick={() => setFilter(item.value)}
          className={`cursor-pointer px-4 py-2 rounded-full text-sm ${
            status === item.value
              ? "bg-primary text-white"
              : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
          }`}
        >
          {item.label}
        </Badge>
      ))}
    </div>
  );
}
