// app/cart/page.tsx
"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart, addToCart, clearCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Tính tổng tiền
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Hàm xử lý thanh toán
  const handleCheckout = async () => {
    if (!session) {
      alert("Vui lòng đăng nhập để thanh toán!");
      router.push("/login");
      return;
    }

    setIsCheckingOut(true);

    try {
      // Gửi đơn hàng lên Server
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          total: totalPrice,
        }),
      });

      if (res.ok) {
        setIsSuccess(true);
        clearCart(); // Xóa giỏ hàng local
      } else {
        alert("Có lỗi xảy ra khi đặt hàng.");
      }
    } catch (error) {
      console.error("Lỗi thanh toán:", error);
      alert("Lỗi kết nối.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  // 1. Trường hợp giỏ hàng trống và chưa mua hàng
  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="flex justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 h-32 text-gray-300">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Giỏ hàng của bạn đang trống</h2>
        <p className="text-gray-500 mb-8">Hãy dạo một vòng và chọn những món đồ chơi thú vị nhé!</p>
        <Link href="/" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition">
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  // 2. Trường hợp Mua hàng THÀNH CÔNG
  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-6 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-20 h-20 text-green-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Đặt hàng thành công! 🎉</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Cảm ơn bạn đã mua hàng tại ToyStore. Đơn hàng của bạn đang được xử lý và sẽ sớm được giao.
        </p>
        <Link href="/" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition">
          Quay về trang chủ
        </Link>
      </div>
    );
  }

  // 3. Giao diện Giỏ hàng chính
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Giỏ Hàng Của Bạn</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* CỘT TRÁI: Danh sách sản phẩm */}
        <div className="grow">
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            {/* Header bảng (Ẩn trên mobile) */}
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b text-sm font-semibold text-gray-500">
              <div className="col-span-6">Sản phẩm</div>
              <div className="col-span-2 text-center">Đơn giá</div>
              <div className="col-span-2 text-center">Số lượng</div>
              <div className="col-span-2 text-center">Thành tiền</div>
            </div>

            {/* Các dòng sản phẩm */}
            {cart.map((item) => (
              <div key={item._id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center border-b last:border-0">
                
                {/* Ảnh và Tên */}
                <div className="col-span-12 md:col-span-6 flex items-center gap-4">
                  <div className="w-20 h-20 shrink-0 bg-gray-100 rounded-lg overflow-hidden border">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 text-sm hover:underline mt-1"
                    >
                      Xóa
                    </button>
                  </div>
                </div>

                {/* Đơn giá */}
                <div className="col-span-12 md:col-span-2 md:text-center text-gray-600 font-medium">
                  <span className="md:hidden text-sm text-gray-400 mr-2">Đơn giá:</span>
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                </div>

                {/* Bộ chỉnh số lượng */}
                <div className="col-span-12 md:col-span-2 flex justify-center md:justify-center">
                   <div className="flex items-center border rounded-lg">
                      <button 
                        onClick={() => item.quantity > 1 ? addToCart(item, -1) : removeFromCart(item._id)}
                        className="px-3 py-1 hover:bg-gray-100 border-r"
                      >-</button>
                      <span className="w-10 text-center font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => addToCart(item, 1)}
                        className="px-3 py-1 hover:bg-gray-100 border-l"
                      >+</button>
                   </div>
                </div>

                {/* Thành tiền */}
                <div className="col-span-12 md:col-span-2 md:text-center font-bold text-blue-600 text-lg">
                  <span className="md:hidden text-sm text-gray-400 mr-2">Tổng:</span>
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CỘT PHẢI: Tổng tiền & Thanh toán */}
        <div className="lg:w-96 shrink-0">
          <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-24">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Cộng Giỏ Hàng</h3>
            
            <div className="flex justify-between items-center mb-4 text-gray-600">
              <span>Tạm tính:</span>
              <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}</span>
            </div>
            
            <div className="flex justify-between items-center mb-6 text-gray-600">
              <span>Phí vận chuyển:</span>
              <span className="text-green-600 font-medium">Miễn phí</span>
            </div>

            <div className="border-t pt-4 mb-6 flex justify-between items-center">
              <span className="text-lg font-bold text-gray-800">Tổng cộng:</span>
              <span className="text-2xl font-bold text-red-600">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}
              </span>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className={`w-full py-4 rounded-xl font-bold text-lg text-white transition shadow-lg flex justify-center items-center gap-2 ${
                isCheckingOut ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
              }`}
            >
              {isCheckingOut ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang xử lý...
                </>
              ) : (
                "Tiến hành thanh toán"
              )}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              Chấp nhận thanh toán khi nhận hàng (COD) hoặc chuyển khoản.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}