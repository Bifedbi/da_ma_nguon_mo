"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", phone: "", address: "" });
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST", body: JSON.stringify(formData),
    });
    if (res.ok) {
      alert("Đăng ký thành công! Hãy đăng nhập.");
      router.push("/login");
    } else {
      alert("Đăng ký thất bại.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Tạo tài khoản</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Họ và tên" className="w-full border p-2 rounded"
             onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          <input type="text" placeholder="Địa chỉ giao hàng" className="w-full border p-2 rounded"
             onChange={(e) => setFormData({...formData, address: e.target.value})} required />
          <input type="email" placeholder="Email" className="w-full border p-2 rounded"
             onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          <input type="text" placeholder="Số điện thoại" className="w-full border p-2 rounded"
             onChange={(e) => setFormData({...formData, phone: e.target.value})} />
          <input type="password" placeholder="Mật khẩu" className="w-full border p-2 rounded"
             onChange={(e) => setFormData({...formData, password: e.target.value})} required />
          <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">Đăng ký</button>
        </form>
        <div className="mt-4 text-center text-sm">
           <Link href="/login" className="font-bold"> Quay lại đăng nhập</Link>
        </div>
      </div>
    </div>
  );
}