// app/admin/page.tsx
'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import Link from "next/link"; // Đã import Link đúng

export default function AdminPage() {
  // 1. SỬA LỖI: Lấy thêm biến 'status' từ useSession
  const { data: session, status } = useSession();
  const router = useRouter();

  // Biến lưu trữ thông tin form
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: 'Xếp hình',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Xử lý loading và bảo vệ trang
  if (status === "loading") return <p className="p-8">Đang tải...</p>;
  
  if (!session || (session.user as any).role !== 'admin') {
    router.push('/');
    return null;
  }

  // Hàm xử lý form
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage('✅ Thêm sản phẩm thành công!');
        setFormData({ name: '', description: '', price: '', image: '', category: 'Xếp hình' });
      } else {
        setMessage('❌ Có lỗi xảy ra. Vui lòng thử lại.');
      }
    } catch (error) {
      setMessage('❌ Lỗi kết nối server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-2xl mt-10 border mb-20">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Quản Trị Viên</h1>

      {/* --- 2. THÊM MỚI: Khu vực nút bấm điều hướng --- */}
      <div className="flex gap-4 mb-8">
        <Link 
            href="/admin/orders" 
            className="flex-1 bg-indigo-600 text-white p-4 rounded-xl shadow hover:bg-indigo-700 transition text-center font-bold flex flex-col items-center justify-center gap-2"
        >
            <span className="text-2xl">📦</span>
            <span>Quản Lý Đơn Hàng</span>
        </Link>
        <div className="flex-1 bg-gray-50 border p-4 rounded-xl text-center text-gray-400 flex items-center justify-center text-sm">
            (Tính năng khác đang phát triển...)
        </div>
      </div>
      <hr className="my-8 border-gray-200" />
      {/* ----------------------------------------------- */}

      <h2 className="text-xl font-bold mb-4 text-gray-700">Thêm Sản Phẩm Mới</h2>
      
      {/* Thông báo */}
      {message && (
        <div className={`p-4 mb-4 rounded-lg text-white ${message.includes('✅') ? 'bg-green-500' : 'bg-red-500'}`}>
          {message}
        </div>
      )}

      {/* Form nhập liệu (Giữ nguyên như cũ) */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Tên đồ chơi</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Ví dụ: Lego Cảnh Sát"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Giá tiền (VNĐ)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Ví dụ: 500000"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Danh mục</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
          >
            <option value="Xếp hình">Xếp hình</option>
            <option value="Gấu bông">Gấu bông</option>
            <option value="Xe cộ">Xe cộ</option>
            <option value="Búp bê">Búp bê</option>
            <option value="Giáo dục">Giáo dục</option>
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Link hình ảnh (URL)</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="https://example.com/anh-do-choi.jpg"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Mô tả chi tiết</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Mô tả về sản phẩm..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 rounded-xl font-bold text-lg text-white transition shadow-md ${
            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Đang lưu...' : 'Thêm Sản Phẩm Mới'}
        </button>
      </form>
    </div>
  );
}