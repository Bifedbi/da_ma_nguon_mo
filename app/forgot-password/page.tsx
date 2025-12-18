import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96 text-center">
        <h2 className="text-xl font-bold mb-2">KHÔI PHỤC MẬT KHẨU</h2>
        <p className="text-sm text-gray-500 mb-6">Nhập email của bạn:</p>
        <input type="email" placeholder="Email" className="w-full border p-2 rounded mb-4" />
        <button className="w-full bg-black text-white py-2 rounded mb-4">Lấy mật khẩu</button>
        <Link href="/login" className="text-sm font-bold">Trở về đăng nhập</Link>
      </div>
    </div>
  );
}