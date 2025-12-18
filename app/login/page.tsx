"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email, password, redirect: false,
    });

    if (res?.error) alert(res.error);
    else router.push("/"); // Đăng nhập xong về trang chủ
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">ĐĂNG NHẬP TÀI KHOẢN</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" className="w-full border p-2 rounded" 
            value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Mật khẩu" className="w-full border p-2 rounded" 
            value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">Đăng nhập</button>
        </form>
        <div className="mt-4 text-sm text-center">
          <p>Khách hàng mới? <Link href="/register" className="font-bold">Tạo tài khoản</Link></p>
          <p className="mt-2">Quên mật khẩu? <Link href="/forgot-password" className="font-bold">Khôi phục mật khẩu</Link></p>
        </div>
      </div>
    </div>
  );
}