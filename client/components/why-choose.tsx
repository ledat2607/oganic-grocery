'use client';

import { motion } from "framer-motion";
import {
  FileHeart,
  Salad,
  Truck,
  Leaf,
  ShieldCheck,
  Smile,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

const WhyChooseUs = () => {
  const points = Array.from({ length: 30 }).map((_, i) => ({
    x: Math.random() * 800 - 400, // vị trí ngẫu nhiên theo trục x
    y: Math.random() * 800 - 400, // vị trí ngẫu nhiên theo trục y
    size: Math.random() * 6 + 2, // radius ngẫu nhiên
    delay: Math.random() * 2, // delay xoay
  }));

  return (
    <section className="relative my-24 py-20 text-center overflow-hidden">
      {/* Vòng tròn background */}
      <div className="absolute inset-0 flex justify-center items-center -z-10">
        <motion.div
          className="relative w-[600px] h-[600px] rounded-full border-2 border-green-200"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
        >
          {points.map((point, idx) => (
            <motion.div
              key={idx}
              className="absolute rounded-full bg-green-300"
              style={{
                width: point.size,
                height: point.size,
                left: "50%",
                top: "50%",
                x: point.x,
                y: point.y,
              }}
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 30 + Math.random() * 30,
                ease: "linear",
                delay: point.delay,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Chữ trên */}
      <motion.h2
        initial={fadeUp.initial}
        whileInView={fadeUp.animate}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-6xl font-extrabold uppercase tracking-widest text-[#3DA06A] mb-4 relative z-10"
      >
        Vì Sao Chọn Chúng Tôi
      </motion.h2>

      <motion.p
        initial={fadeUp.initial}
        whileInView={fadeUp.animate}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="text-neutral-600 max-w-2xl mx-auto mb-16 relative z-10"
      >
        Chúng tôi mang đến trải nghiệm mua sắm organic tốt nhất – an toàn, chất
        lượng & tận tâm.
      </motion.p>

      {/* Grid icon */}
      <div className="grid md:grid-cols-3 gap-10 px-4 md:px-20 relative z-10 cursor-pointer ">
        {[
          {
            icon: FileHeart,
            title: "Chất Lượng Cao",
            desc: "Sản phẩm được chọn lọc kỹ lưỡng.",
          },
          {
            icon: Salad,
            title: "Tươi Mới Hằng Ngày",
            desc: "Từ nông trại – tới bàn ăn.",
          },
          {
            icon: Truck,
            title: "Giao Nhanh",
            desc: "Nhanh chóng, đúng giờ.",
          },
          {
            icon: Leaf,
            title: "Thân Thiện Môi Trường",
            desc: "Bao bì & quy trình xanh.",
          },
          {
            icon: ShieldCheck,
            title: "An Toàn",
            desc: "Thanh toán & dữ liệu được bảo mật.",
          },
          {
            icon: Smile,
            title: "Khách Hàng Hài Lòng",
            desc: "Hỗ trợ tận tình 24/7.",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div
              className="p-[2px]  rounded-3xl bg-gradient-to-r 
              from-[#65C18C] via-[#3DA06A] to-[#F9D162] shadow-xl"
            >
              <div className="rounded-3xl hover:bg-green-300 bg-white p-10 h-full flex flex-col items-center gap-4">
                <item.icon className="w-14 h-14 text-[#3DA06A]" />
                <h3 className="text-2xl font-bold text-neutral-800">
                  {item.title}
                </h3>
                <p className="text-neutral-500 text-sm">{item.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
