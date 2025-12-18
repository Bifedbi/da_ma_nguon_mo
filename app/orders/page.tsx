// app/orders/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MyOrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // Dữ liệu đơn hàng
  const [orders, setOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);

  // Dữ liệu cá nhân (Form)
  const [profile, setProfile] = useState({ phone: "", address: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState(""); // Thông báo "Đã cập nhật!"

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }

    if (status === "authenticated") {
      // 1. Gọi API lấy danh sách đơn hàng
      fetch("/api/orders/history")
        .then((res) => res.json())
        .then((data) => {
          setOrders(data);
          setIsLoadingOrders(false);
        });

      // 2. Gọi API lấy thông tin cá nhân (SĐT, Địa chỉ cũ)
      fetch("/api/profile")
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setProfile({ 
                phone: data.phone || "", 
                address: data.address || "" 
            });
          }
        });
    }
  }, [status, router]);

  // Hàm xử lý khi bấm nút LƯU
  const handleUpdateProfile = async (e: any) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage("");

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (res.ok) {
        setSaveMessage("✅ Đã cập nhật!");
        // Tắt thông báo sau 3 giây
        setTimeout(() => setSaveMessage(""), 3000);
      } else {
        alert("Lỗi khi lưu thông tin");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoadingOrders) return <div className="p-10 text-center">Đang tải dữ liệu...</div>;

  return (
    <div className="container mx-auto px-4 py-10">
      
      {/* --- PHẦN MỚI: FORM SỬA THÔNG TIN (Ở vị trí bạn khoanh đỏ) --- */}
      <div className="bg-white border rounded-xl shadow-sm p-6 mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Đơn hàng của tôi</h1>
                <p className="text-gray-500 text-sm mt-1">Sửa thông tin cá nhân nếu bạn muốn thay đổi!</p>
            </div>
            
            {/* Thông báo thành công hiện ở đây */}
            {saveMessage && (
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold animate-pulse">
                    {saveMessage}
                </span>
            )}
        </div>

        <form onSubmit={handleUpdateProfile} className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Địa chỉ giao hàng</label>
                <input 
                    type="text" 
                    value={profile.address}
                    onChange={(e) => setProfile({...profile, address: e.target.value})}
                    placeholder="Nhập địa chỉ của bạn..."
                    className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 focus:bg-white transition"
                />
            </div>
            
            <div className="w-full md:w-64">
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Số điện thoại</label>
                <input 
                    type="text" 
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    placeholder="Số điện thoại..."
                    className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 focus:bg-white transition"
                />
            </div>

            <button 
                type="submit" 
                disabled={isSaving}
                className="bg-black text-white px-6 py-2.5 rounded-lg font-bold hover:bg-gray-800 transition disabled:bg-gray-400 min-w-25"
            >
                {isSaving ? "..." : "Lưu"}
            </button>
        </form>
      </div>
      {/* ----------------------------------------------------------- */}


      {/* Phần danh sách đơn hàng (Giữ nguyên logic cũ) */}
      {orders.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed">
          <p className="text-gray-500 mb-4">Bạn chưa mua đơn hàng nào.</p>
          <Link href="/" className="text-blue-600 font-bold hover:underline">
            Dạo một vòng mua sắm ngay!
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order: any) => (
            <div key={order._id} className="bg-white border rounded-xl shadow-sm overflow-hidden">
              <div className="bg-gray-50 p-4 flex flex-col md:flex-row justify-between md:items-center gap-4 border-b">
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Mã đơn hàng</span>
                  <p className="font-bold font-mono text-gray-800">
                    #{order._id.substring(order._id.length - 6).toUpperCase()}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Ngày đặt</span>
                  <p className="text-sm text-gray-800">
                    {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Tổng tiền</span>
                  <p className="font-bold text-red-600">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}
                  </p>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold inline-block
                    ${order.status === 'Đã giao' ? 'bg-green-100 text-green-700' : 
                      order.status === 'Đang giao' ? 'bg-blue-100 text-blue-700' : 
                      'bg-yellow-100 text-yellow-700'}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="p-4">
                {order.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-4 py-2 last:border-0 border-b border-gray-100">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded border" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{item.name}</h4>
                      <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                    </div>
                    <div className="text-gray-600 font-medium">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}