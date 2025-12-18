// components/Navbar.tsx
'use client'; // Dòng này bắt buộc để dùng được useSession

import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { data: session } = useSession();
  const { cartCount } = useCart();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* 1. Logo bên trái */}
        <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition">
          🧸 ToyStore
        </Link>

        {/* 2. Menu ở giữa (Ẩn trên mobile) */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">
            Trang chủ
          </Link>
          <Link href="/products" className="text-gray-600 hover:text-blue-600 font-medium">
            Sản phẩm
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-blue-600 font-medium">
            Về chúng tôi
          </Link>
        </nav>

        {/* 3. Khu vực bên phải (Giỏ hàng + Tài khoản) */}
        <div className="flex items-center space-x-6">
          
          {/* --- NÚT GIỎ HÀNG (Đã khôi phục lại) --- */}
          <Link 
            href="/cart" 
            className="flex items-center space-x-1 bg-blue-100 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-200 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <span className="font-semibold">Giỏ ({cartCount})</span>
          </Link>

          {/* --- KHU VỰC TÀI KHOẢN --- */}
          {session ? (
            // Nếu ĐÃ đăng nhập
            <div className="flex items-center gap-3 border-l pl-4 ml-2">
              <div className="flex flex-col text-right">
                <span className="text-xs text-gray-500">Xin chào,</span>
                <Link href="/orders" className="text-sm font-bold text-gray-800 hover:text-blue-600 hover:underline">
                  {session.user?.name}
                </Link>
              </div>
              
              {/* Nếu là Admin thì hiện nút vào trang Admin */}
              {(session.user as any).role === 'admin' && (
                <Link href="/admin" className="bg-red-500 text-white text-xs px-2 py-1 rounded font-bold hover:bg-red-600">
                  ADMIN
                </Link>
              )}

              <button 
                onClick={() => signOut()} 
                className="text-gray-500 hover:text-red-500 transition text-sm underline"
              >
                Thoát
              </button>
            </div>
          ) : (
            // Nếu CHƯA đăng nhập
            <div className="flex items-center gap-3 border-l pl-4 ml-2">
              <Link href="/login" className="text-gray-600 font-medium hover:text-blue-600 text-sm">
                Đăng nhập
              </Link>
              <Link href="/register" className="bg-black text-white px-3 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition">
                Đăng ký
              </Link>
            </div>
          )}

        </div>
      </div>
    </header>
  );
}