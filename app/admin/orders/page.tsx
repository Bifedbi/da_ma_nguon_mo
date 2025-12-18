// app/admin/orders/page.tsx
"use client";

import { useEffect, useState } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Hàm lấy dữ liệu
  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Lỗi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm đổi trạng thái
  const updateStatus = async (orderId: string, newStatus: string) => {
    // Cập nhật giao diện ngay lập tức cho mượt (Optimistic UI)
    const oldOrders = [...orders];
    setOrders((prev: any) => 
      prev.map((o: any) => o._id === orderId ? { ...o, status: newStatus } : o)
    );

    // Gọi API cập nhật ngầm
    try {
      await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
    } catch (error) {
      alert("Lỗi cập nhật!");
      setOrders(oldOrders); // Hoàn tác nếu lỗi
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (isLoading) return <div className="p-10 text-center">Đang tải đơn hàng...</div>;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Quản Lý Đơn Hàng</h1>
      
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b text-sm text-gray-600 uppercase">
              <th className="p-4">Mã đơn</th>
              <th className="p-4">Khách hàng</th>
              <th className="p-4">Ngày đặt</th>
              <th className="p-4">Sản phẩm</th>
              <th className="p-4">Tổng tiền</th>
              <th className="p-4">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders.map((order: any) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="p-4 font-mono text-xs text-gray-500">
                  {order._id.substring(order._id.length - 6).toUpperCase()}
                </td>
                <td className="p-4">
                  <div className="font-bold text-gray-800">{order.user?.name || "Khách lạ"}</div>
                  <div className="text-xs text-gray-500">{order.user?.email}</div>
                  <div className="text-xs text-blue-600 mt-1 italic">
    📍              {order.user?.address || "Chưa có địa chỉ"}
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                </td>
                <td className="p-4 text-sm">
                  {order.items.map((item: any, index: number) => (
                    <div key={index} className="mb-1">
                      {item.quantity}x {item.name}
                    </div>
                  ))}
                </td>
                <td className="p-4 font-bold text-gray-800">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}
                </td>
                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className={`px-3 py-1 rounded-full text-xs font-bold border-0 cursor-pointer outline-none ${
                      order.status === "Đã giao" ? "bg-green-100 text-green-700" :
                      order.status === "Đang giao" ? "bg-blue-100 text-blue-700" :
                      order.status === "Đang xử lý" ? "bg-yellow-100 text-yellow-700" :
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <option value="Đang xử lý">Đang xử lý</option>
                    <option value="Đang giao">Đang giao</option>
                    <option value="Đã giao">Đã giao</option>
                    <option value="Hủy đơn">Hủy đơn</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="p-10 text-center text-gray-500">Chưa có đơn hàng nào.</div>
        )}
      </div>
    </div>
  );
}