// HomePage.tsx
"use client";
import { useEffect, useState } from "react";
import getProducts from "@/actions/get-products"; // Assuming you have this function elsewhere
import Container from "@/components/container";
import Popularcontent from "@/components/popular-content";
import SlideBanner from "@/components/slide-banner";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/firebase";
import { Billboards, Products } from "@/type-db"; // Adjust the imports based on your structure
import { collection, doc, getDocs } from "firebase/firestore";
import { FileHeart, Salad, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HomePage = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [billboards, setBillboards] = useState<Billboards[]>([]);
  const [bestSellingProducts, setBestSellingProducts] = useState<Products[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productSnapshot = await getDocs(
          collection(doc(db, "stores", "GsGFvwku3vPwlUyXKUnn"), "products")
        );
        const productData = productSnapshot.docs.map((doc) =>
          doc.data()
        ) as Products[];

        // Set featured products for display
        setProducts(productData.filter((pro) => pro.isFeatured === true));

        // Sort products by 'sold_out' for the "Best Seller" section
        const sortedProducts = [...productData].sort(
          (a, b) => b.sold_out - a.sold_out
        );
        setBestSellingProducts(sortedProducts.slice(0, 10)); // Top 10 best-sellers

        const billboardSnapshot = await getDocs(
          collection(doc(db, "stores", "GsGFvwku3vPwlUyXKUnn"), "billboards")
        );
        const billboardData = billboardSnapshot.docs.map((doc) =>
          doc.data()
        ) as Billboards[];
        setBillboards(billboardData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Handlers for pagination
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <Container className="px-4 lg:px-12">
      {/* Slide Banner */}
      <section className="mt-24 mb-8">
        <SlideBanner billboards={billboards} />
      </section>

      {/* All Products Section */}
      <h2 className="font-bold text-3xl capitalize">All products</h2>
      <Separator className="mt-2" />
      <section className="grid grid-cols-2 md:grid-cols-5 gap-6 gap-y-10 md:gap-12 my-4 py-8 mt-16">
        {currentProducts.map((item) => (
          <Popularcontent key={item.id} data={item} />
        ))}
      </section>

      {/* Pagination Controls */}
      <div className="flex justify-between my-4">
        <Button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>

      {/* Best Seller Section */}
      <section className="my-12">
        <h2 className="text-4xl font-bold mb-4">Best Sellers</h2>
        <Separator className="mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 gap-y-10 md:gap-12 pt-20">
          {bestSellingProducts.map((item) => (
            <Popularcontent key={item.id} data={item} />
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="my-4 py-12 flex flex-col items-center justify-center">
        <h2 className="text-5xl md:text-5xl font-bold tracking-wider uppercase text-neutral-700 my-4">
          Why choose us?
        </h2>
        <Separator className="my-4" />
        <div className="grid md:grid-cols-3 gap-8 mt-8 w-full px-2">
          <Card className="h-full text-center py-8 px-2">
            <FileHeart className="mx-auto text-primary w-12 h-12 mb-4" />
            <CardTitle>Top Quality Products</CardTitle>
            <CardDescription>
              We offer a range of high-quality products that meet your needs and
              preferences.
            </CardDescription>
          </Card>
          <Card className="h-full text-center py-8 px-2">
            <Salad className="mx-auto text-primary w-12 h-12 mb-4" />
            <CardTitle>Freshness Guaranteed</CardTitle>
            <CardDescription>
              All products are fresh and sourced from reliable suppliers.
            </CardDescription>
          </Card>
          <Card className="h-full text-center py-8 px-2">
            <Truck className="mx-auto text-primary w-12 h-12 mb-4" />
            <CardTitle>Fast & Reliable Delivery</CardTitle>
            <CardDescription>
              Enjoy quick delivery services, ensuring your products arrive on
              time.
            </CardDescription>
          </Card>
        </div>
      </section>
      <section className="my-4 py-12 flex flex-col items-center justify-center">
        <h2 className="text-5xl md:text-5xl font-bold tracking-wider uppercase text-neutral-700 my-4">
          Our Special Products
        </h2>
        <p className="w-full text-center md:w-[560px] text-base text-neutral-500 my-2">
          Discover the best quality products from our store, carefully selected
          just for you.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full my-6 mt-20">
          {/* Product Card 1 */}
          <Card className="shadow-lg relative rounded-2xl border-none flex flex-col items-center justify-end h-96 md:h-[520px] bg-white">
            <Image
              src="/fruits.png" // Replace with a grocery product image
              alt="Fresh Vegetables"
              className="w-full h-full object-cover rounded-2xl"
              fill
            />
            <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-gray-900 to-transparent text-white text-center">
              <h3 className="text-xl font-semibold">Amazing Organic fruits</h3>
              <p className="text-sm">
                Healthy and delicous produce sourced locally.
              </p>
            </div>
          </Card>

          {/* Product Card 2 */}
          <Card className="shadow-lg rounded-2xl relative border-none flex flex-col items-center justify-end h-96 md:h-[520px] mt-20 bg-white">
            <Image
              src="/fruit.png" // Replace with another grocery product image
              alt=""
              className="w-full h-full object-cover rounded-2xl"
              fill
            />
            <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-gray-900 to-transparent text-white text-center">
              <h3 className="text-xl font-semibold">Fruits</h3>
              <p className="text-sm">Delicous food for you</p>
            </div>
          </Card>

          {/* Product Card 3 */}
          <Card className="shadow-lg relative rounded-2xl border-none flex flex-col items-center justify-end h-96 md:h-[520px] bg-white">
            <Image
              src="/fresh.png" // Replace with another grocery product image
              alt=""
              className="w-full h-full object-cover rounded-2xl"
              fill
            />
            <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-gray-900 to-transparent text-white text-center">
              <h3 className="text-xl font-semibold">Vegetable</h3>
              <p className="text-sm">High-quality dairy for a nutritious.</p>
            </div>
          </Card>
        </div>
      </section>
    </Container>
  );
};

export default HomePage;
