"use client";

import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-10 max-w-3xl w-full text-center shadow-2xl"
      >
        <h1 className="text-5xl font-extrabold text-white mb-6">
          Về <span className="text-cyan-400">Chúng Tôi</span>
        </h1>

        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          Chúng tôi là một đội ngũ trẻ, năng động và sáng tạo – với niềm đam mê
          mang đến những giải pháp công nghệ hiện đại, giúp doanh nghiệp phát
          triển nhanh hơn trong kỷ nguyên số. 🚀
        </p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
        >
          <div className="bg-white/10 p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              🎯 Sứ mệnh
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Cung cấp những sản phẩm và dịch vụ kỹ thuật số chất lượng cao, giúp khách hàng đạt được hiệu quả tối đa trong kinh doanh.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              🌍 Tầm nhìn
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Trở thành công ty công nghệ hàng đầu khu vực, mang lại giá trị bền vững cho cộng đồng và môi trường.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              💡 Giá trị cốt lõi
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Sáng tạo – Trung thực – Hợp tác – Tận tâm. Mỗi thành viên đều nỗ lực mang lại trải nghiệm tốt nhất cho khách hàng.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10"
        >
          <p className="text-slate-400 text-sm italic">
            “Chúng tôi không chỉ tạo ra sản phẩm — chúng tôi tạo ra trải nghiệm.” ✨
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
