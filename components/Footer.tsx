// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Cột 1: Thông tin chung */}
        <div>
          <h3 className="text-white text-xl font-bold mb-4">🧸 ToyStore</h3>
          <p className="text-sm leading-relaxed">
            Nơi mang đến niềm vui, thoả mãn cho trẻ em và người lớn qua từng món đồ chơi chất lượng cao, an toàn và bổ ích.
          </p>
        </div>

        {/* Cột 2: Về Chúng Tôi (Đã xóa Câu chuyện thương hiệu & Tuyển dụng) */}
        <div>
          <h4 className="text-white font-bold mb-4">Về chúng tôi</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-blue-400">Trang chủ</Link></li>
            <li><Link href="/products" className="hover:text-blue-400">Sản phẩm</Link></li>
          </ul>
        </div>

        {/* Cột 3: Hỗ Trợ (Đã xóa Hướng dẫn, Chính sách, Bảo mật - Chỉ giữ lại Tra cứu đơn hàng) */}
        <div>
          <h4 className="text-white font-bold mb-4">Hỗ trợ khách hàng</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/orders" className="hover:text-blue-400">Tra cứu đơn hàng</Link></li>
          </ul>
        </div>

        {/* Cột 4: Liên hệ */}
        <div>
          <h4 className="text-white font-bold mb-4">Liên hệ</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span>📍</span> 77 Nguyễn Huệ, Thuận Hoá, Thành phố Huế
            </li>
            <li className="flex items-center gap-2">
              <span>📞</span> 0123 456 789
            </li>
            <li className="flex items-center gap-2">
              <span>✉️</span> 22T1020655@husc.edu.vn
            </li>
            <li className="flex items-center gap-2">
              <span>✉️</span> 22T1020150@husc.edu.vn
            </li>
            <li className="flex items-center gap-2">
              <span>✉️</span> 22T1020186@husc.edu.vn
            </li>
            <li className="flex items-center gap-2">
              <span>✉️</span> 22T1020273@husc.edu.vn
            </li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
        © 2025 ToyStore. All rights reserved. Designed by Đào Văn Lợi, Trần Duy Hưng, Trương Văn Kiệt, Nguyễn Đình Nhân.
      </div>
    </footer>
  );
}