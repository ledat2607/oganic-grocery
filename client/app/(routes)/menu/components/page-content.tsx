"use client";

import Box from "@/components/box";
import Popularcontent from "@/components/popular-content";
import { Products } from "@/type-db";
import { ChevronRight, Home, X } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface PageContentProps {
  product: Products[];
}

const PageContent = ({ product }: PageContentProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentParams = Object.fromEntries(searchParams.entries());

  const handleClick = (param: string) => {
    if (currentParams.hasOwnProperty(param)) {
      const newParams = { ...currentParams };
      delete newParams[param];
      const href = qs.stringifyUrl({
        url: "/menu",
        query: newParams,
      });
      router.push(href);
    }
  };

  return (
    <>
      {/* Breadcrumb + Selected Filters */}
      <Box className="pt-4 pb-10 flex flex-col gap-6">
        {/* Breadcrumb */}
        <Box className="text-sm flex items-center gap-2 text-neutral-600">
          <Link
            href="/"
            className="flex items-center gap-2 hover:text-black transition"
          >
            <Home className="w-5 h-5" />
            Main page
          </Link>

          <ChevronRight className="w-4 h-4 text-neutral-400" />

          <Link href="/menu" className="hover:text-black transition">
            Menu
          </Link>

          {searchParams.get("category") && (
            <>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
              <span className="capitalize text-black font-medium">
                {searchParams.get("category")}
              </span>
            </>
          )}
        </Box>

        {/* Title */}
        {searchParams.get("category") && (
          <h1 className="text-3xl font-bold text-neutral-800 capitalize">
            {searchParams.get("category")}
          </h1>
        )}

        {/* Selected Filters */}
        <Box className="flex flex-wrap gap-3">
          {Object.entries(currentParams).map(([key, value]) => (
            <div
              key={key}
              className="
                px-4 py-1
                rounded-full
                bg-emerald-500/10
                text-emerald-700
                flex items-center gap-2
                text-sm
                cursor-pointer
                border border-emerald-200
                hover:bg-emerald-500/20
                transition
              "
            >
              {value}

              <X
                onClick={() => handleClick(key)}
                className="w-4 h-4 hover:text-red-500 transition"
              />
            </div>
          ))}
        </Box>
      </Box>

      {/* Product Grid */}
      <div
        className="
          grid 
          grid-cols-2 
          sm:grid-cols-3 
          lg:grid-cols-4 
          xl:grid-cols-5 
          gap-6
          mt-6
        "
      >
        {product.length > 0 ? (
          product.map((item) => <Popularcontent key={item.id} data={item} />)
        ) : (
          <div className="col-span-full flex items-center justify-center h-40 text-neutral-500">
            No products found
          </div>
        )}
      </div>
    </>
  );
};

export default PageContent;
