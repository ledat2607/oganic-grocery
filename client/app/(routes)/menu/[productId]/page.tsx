import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import Box from "@/components/box";
import Container from "@/components/container";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import Gallery from "./components/gallery/page";
import Info from "./components/Info";
import SuggestedList from "./components/suggested-list";

interface ProductDetailProps {
  params: {
    productId: string;
  };
}

const ProductDetail = async ({ params }: ProductDetailProps) => {
  const product = await getProduct(params.productId);
  const suggestedProduct = await getProducts({ category: product.category });

  return (
    <Container className="bg-white rounded-2xl shadow-sm my-6 p-6">

      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-neutral-600 mb-6">
        <Link href="/" className="flex items-center gap-2 hover:text-black transition">
          <Home className="w-5 h-5" />
          Main page
        </Link>

        <ChevronRight className="w-4 h-4 mx-2 text-neutral-400" />

        <Link href="/menu" className="hover:text-black transition">
          Menu
        </Link>

        <ChevronRight className="w-4 h-4 mx-2 text-neutral-400" />

        <span className="font-medium text-neutral-900 line-clamp-1">{product.name}</span>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

        {/* Image gallery */}
        <div>
          <Gallery image={product.images} />
        </div>

        {/* Product Info */}
        <div className="flex items-start justify-start">
          <Info product={product} />
        </div>
      </div>

      {/* Suggested Products */}
      <div className="mt-16">
        <SuggestedList products={suggestedProduct} />
      </div>
    </Container>
  );
};

export default ProductDetail;
