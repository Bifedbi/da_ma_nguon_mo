"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Lấy giá trị tìm kiếm hiện tại từ URL (nếu có) để điền vào ô input
  const [keyword, setKeyword] = useState(searchParams.get("q") || "");

  const handleSearch = (e: any) => {
    e.preventDefault();
    
    // Nếu có từ khóa -> Đẩy lên URL (?q=...)
    if (keyword.trim()) {
      router.push(`/?q=${encodeURIComponent(keyword.trim())}`);
    } else {
      // Nếu xóa trắng -> Về trang chủ gốc
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          placeholder="Bạn tìm đồ chơi gì? (VD: Lego, Gấu...)"
          className="w-full py-3 pl-5 pr-12 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 shadow-sm"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button 
          type="submit" 
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
      </div>
    </form>
  );
}