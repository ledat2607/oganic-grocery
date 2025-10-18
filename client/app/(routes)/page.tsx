// HomePage.tsx
"use client";
import { useEffect, useState } from "react";
import getProducts from "@/actions/get-products";
import Container from "@/components/container";
import Popularcontent from "@/components/popular-content";
import SlideBanner from "@/components/slide-banner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/firebase";
import { Billboards, Products } from "@/type-db";
import { collection, doc, getDocs } from "firebase/firestore";
import {
  FileHeart,
  Salad,
  Truck,
  Leaf,
  ShieldCheck,
  Smile,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

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
          collection(doc(db, "stores", "VFiQXRkIfcT3ZdhUuhQB"), "products")
        );
        const productData = productSnapshot.docs.map((doc) => doc.data()) as Products[];

        setProducts(productData.filter((pro) => pro.isFeatured === true));
        const bestProduct = productData.filter((pro) => pro.isFeatured === true);
        const sortedProducts = [...bestProduct].sort((a, b) => b.sold_out - a.sold_out);
        setBestSellingProducts(sortedProducts.slice(0, 10));

        const billboardSnapshot = await getDocs(
          collection(doc(db, "stores", "VFiQXRkIfcT3ZdhUuhQB"), "billboards")
        );
        const billboardData = billboardSnapshot.docs.map((doc) => doc.data()) as Billboards[];
        setBillboards(billboardData);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      }
    };

    fetchProducts();
  }, []);

  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

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
      {/* Phần giới thiệu đầu trang */}
      <section className="relative mt-32 mb-12 flex flex-col items-center justify-center text-center px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-white to-emerald-50 -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto backdrop-blur-2xl bg-white/20 border border-white/30 shadow-2xl rounded-3xl p-10 md:p-16 text-neutral-800"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-emerald-600 via-teal-500 to-green-400 bg-clip-text text-transparent"
          >
            Cảm Nhận Sự Tươi Mới
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-neutral-600 mt-6"
          >
            Khám phá sự tươi mát hữu cơ được tạo nên từ thiên nhiên. Mỗi sản phẩm là lời hứa về sự tinh khiết, sức khỏe và bền vững.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex justify-center mt-10 gap-4"
          >
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-emerald-300/40 transition-all duration-300">
              Mua Ngay
            </Button>
            <Button
              variant="outline"
              className="border-emerald-400 text-emerald-700 hover:bg-emerald-100 px-8 py-6 text-lg rounded-full"
            >
              Tìm Hiểu Thêm
            </Button>
          </motion.div>
        </motion.div>

        <div className="absolute -top-32 -right-20 w-[400px] h-[400px] bg-emerald-300/40 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute -bottom-32 -left-20 w-[400px] h-[400px] bg-green-300/40 rounded-full blur-3xl -z-10 animate-pulse" />
      </section>

      {/* Slide Banner */}
      <section className="mt-24 mb-8">
        <SlideBanner billboards={billboards} />
      </section>

      {/* Tất cả sản phẩm */}
      <h2 className="font-bold text-3xl capitalize">Tất cả sản phẩm</h2>
      <Separator className="mt-2" />
      <section className="grid grid-cols-1 p-8 md:p-0 md:grid-cols-5 gap-6 gap-y-10 md:gap-12 my-4 mt-16">
        {currentProducts.map((item) => (
          <Popularcontent key={item.id} data={item} />
        ))}
      </section>

      {/* Phân trang */}
      <div className="flex justify-between my-4">
        <Button onClick={prevPage} disabled={currentPage === 1}>
          Trước
        </Button>
        <span>
          Trang {currentPage} / {totalPages}
        </span>
        <Button onClick={nextPage} disabled={currentPage === totalPages}>
          Sau
        </Button>
      </div>

      {/* Sản phẩm bán chạy */}
      <section className="my-12">
        <h2 className="text-4xl font-bold mb-4">Sản Phẩm Bán Chạy</h2>
        <Separator className="mb-4" />
        <div className="grid grid-cols-1 p-8 md:p-0 md:grid-cols-5 gap-6 gap-y-10 md:gap-12 my-4 mt-16">
          {bestSellingProducts.map((item) => (
            <Popularcontent key={item.id} data={item} />
          ))}
        </div>
      </section>

      {/* Tại sao chọn chúng tôi */}
      <section className="relative my-24 py-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-emerald-50 to-white -z-10" />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-extrabold uppercase tracking-widest text-emerald-700 mb-4"
        >
          Vì Sao Chọn Chúng Tôi
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-neutral-600 max-w-2xl mx-auto mb-16"
        >
          Chúng tôi không chỉ là cửa hàng — mà là đối tác đáng tin cậy mang đến chất lượng, tươi mới và sự tận tâm trong từng sản phẩm.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-10 px-4 md:px-20">
          {[
            {
              icon: FileHeart,
              title: "Sản Phẩm Chất Lượng Cao",
              desc: "Mỗi sản phẩm đều được chọn lọc kỹ lưỡng để đảm bảo tiêu chuẩn tốt nhất.",
            },
            {
              icon: Salad,
              title: "Tươi Mới Mỗi Ngày",
              desc: "Nguồn gốc từ nông trại đến bàn ăn — tươi ngon từng phút giây.",
            },
            {
              icon: Truck,
              title: "Giao Hàng Nhanh Chóng",
              desc: "Đảm bảo giao hàng đúng hẹn, tiết kiệm thời gian của bạn.",
            },
            {
              icon: Leaf,
              title: "Thân Thiện Môi Trường",
              desc: "Chúng tôi hướng đến phát triển bền vững và giảm thiểu rác thải.",
            },
            {
              icon: ShieldCheck,
              title: "Mua Sắm An Toàn",
              desc: "Bảo mật thông tin và thanh toán với công nghệ hiện đại nhất.",
            },
            {
              icon: Smile,
              title: "Hài Lòng Khách Hàng",
              desc: "Chúng tôi chỉ dừng lại khi bạn thật sự hài lòng.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative p-[2px] rounded-3xl bg-gradient-to-r from-emerald-400 via-teal-500 to-green-400 animate-gradient-x">
                <div className="rounded-3xl bg-white p-10 h-full flex flex-col items-center justify-center hover:shadow-2xl transition-all duration-300">
                  <item.icon className="w-14 h-14 text-emerald-600 mb-6 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-bold text-neutral-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-neutral-500 text-sm">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sản phẩm đặc biệt */}
      <section className="relative py-24 mt-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-emerald-50 to-white -z-10" />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-extrabold uppercase tracking-widest text-emerald-700 mb-4"
        >
          Sản Phẩm Đặc Biệt
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-neutral-600 max-w-2xl mx-auto mb-16"
        >
          Khám phá bộ sưu tập sản phẩm hữu cơ được chọn lọc kỹ càng — tinh khiết và ngon miệng.
        </motion.p>

        <div className="grid md:grid-cols-4 grid-cols-2 gap-6 px-4 md:px-16 auto-rows-[280px] md:auto-rows-[360px]">
          {[
            {
              img: "/fruits.png",
              title: "Trái Cây Hữu Cơ",
              desc: "Nguồn gốc địa phương, vị ngọt tự nhiên.",
              size: "col-span-2 row-span-2",
            },
            {
              img: "/fruit.png",
              title: "Trái Cây Ngoại Nhập",
              desc: "Độc đáo, nhiều màu sắc và quý hiếm.",
              size: "row-span-1",
            },
            {
              img: "/fresh.png",
              title: "Rau Xanh Tươi",
              desc: "Giòn ngon và đầy dinh dưỡng.",
              size: "row-span-1",
            },
            {
              img: "/juice.png",
              title: "Nước Ép Tươi",
              desc: "Ép lạnh, bổ dưỡng và mát lạnh.",
              size: "row-span-2",
            },
            {
              img: "/herbs.png",
              title: "Thảo Mộc Hữu Cơ",
              desc: "Hương thơm tự nhiên, tốt cho sức khỏe.",
              size: "row-span-1",
            },
            {
              img: "/grains.png",
              title: "Ngũ Cốc Tự Nhiên",
              desc: "Nguyên chất, tốt cho tim mạch.",
              size: "row-span-1",
            },
            {
              img: "/salad.png",
              title: "Salad Dinh Dưỡng",
              desc: "Tươi ngon, tràn đầy năng lượng.",
              size: "col-span-2 row-span-1",
            },
            {
              img: "/bread.png",
              title: "Bánh Mì Tự Làm",
              desc: "Mềm, vàng ruộm và tự nhiên.",
              size: "row-span-1",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative overflow-hidden rounded-3xl p-[2px] bg-gradient-to-r from-emerald-400 via-teal-500 to-green-400 animate-gradient-x ${item.size}`}
            >
              <div className="relative h-full w-full rounded-3xl overflow-hidden group">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-content rounded-3xl transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent rounded-3xl" />
                <div className="absolute bottom-4 left-0 w-full px-4 text-center text-white">
                  <h3 className="text-lg md:text-xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm opacity-90">{item.desc}</p>
                </div>
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-emerald-400/40 via-teal-400/30 to-green-400/40 blur-xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </Container>
  );
};

export default HomePage;
