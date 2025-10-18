"use client";

import Container from "./container";
import { Button } from "./ui/button";
import { Facebook, Instagram, Twitter, Youtube, Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-emerald-50 via-white to-emerald-100 border-t border-emerald-200 overflow-hidden">
      {/* Hiệu ứng nền sáng nhẹ */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-200/30 via-transparent to-transparent blur-2xl animate-pulse"></div>

      <Container>
        {/* Lưới nội dung chính */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 py-16">
          {/* Menu */}
          <div className="flex flex-col items-start gap-3">
            <h2 className="text-xl md:text-2xl font-semibold text-emerald-700 mb-2">
              Menu
            </h2>
            {[
              "Trang chủ",
              "Vì sao chọn chúng tôi",
              "Món đặc biệt",
              "Thực đơn thường ngày",
              "Đầu bếp nổi bật",
            ].map((item) => (
              <p
                key={item}
                className="text-neutral-600 text-sm hover:text-emerald-600 transition-all cursor-pointer"
              >
                {item}
              </p>
            ))}
          </div>

          {/* Hỗ trợ */}
          <div className="flex flex-col items-start gap-3">
            <h2 className="text-xl md:text-2xl font-semibold text-emerald-700 mb-2">
              Hỗ trợ
            </h2>
            {[
              "Chính sách bảo mật",
              "Điều khoản & điều kiện",
              "Chính sách đổi trả",
            ].map((item) => (
              <p
                key={item}
                className="text-neutral-600 text-sm hover:text-emerald-600 transition-all cursor-pointer"
              >
                {item}
              </p>
            ))}
          </div>

          {/* Liên hệ */}
          <div className="flex flex-col items-start gap-3">
            <h2 className="text-xl md:text-2xl font-semibold text-emerald-700 mb-2">
              Liên hệ
            </h2>
            <p className="text-neutral-600 text-sm">📞 +84 000 000 000</p>
            <p className="text-neutral-600 text-sm">✉️ lienhe@foodied.vn</p>
            <p className="text-neutral-600 text-sm">
              🏠 1234 Đường Mới, Quận Trung Tâm, TP.HCM
            </p>

            {/* Mạng xã hội */}
            <div className="flex gap-3 mt-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-full bg-white border border-emerald-200 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all cursor-pointer shadow-sm"
                >
                  <Icon size={18} />
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col items-start gap-4">
            <h2 className="text-xl md:text-2xl font-semibold text-emerald-700 mb-2">
              Đăng ký nhận tin mới
            </h2>
            <p className="text-sm text-neutral-500">
              Nhận các ưu đãi độc quyền, công thức nấu ăn và tin tức mới nhất từ chúng tôi.
            </p>
            <div className="flex w-full items-center rounded-full border border-emerald-300 overflow-hidden">
              <input
                type="text"
                placeholder="Nhập email của bạn"
                className="h-10 flex-1 px-4 bg-transparent text-sm text-neutral-600 focus:outline-none"
              />
              <Button className="rounded-none bg-emerald-500 hover:bg-emerald-600 flex items-center gap-2 px-4">
                <Send size={16} />
                Đăng ký
              </Button>
            </div>
          </div>
        </div>

        {/* Dòng bản quyền */}
        <div className="border-t border-emerald-200 mt-8 pt-6 text-center text-sm text-neutral-500">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold text-emerald-600">Foodied</span>. Mọi
          quyền được bảo lưu.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
