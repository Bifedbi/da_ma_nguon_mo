// components/AddToCartButton.tsx
"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4 mt-auto">
      {/* Chọn số lượng */}
      <div className="flex items-center gap-4">
        <span className="font-medium text-gray-700">Số lượng:</span>
        <div className="flex items-center border border-gray-300 rounded-lg bg-white">
          <button 
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="px-4 py-2 hover:bg-gray-100 border-r text-gray-600"
          >-</button>
          <span className="px-4 py-2 font-bold w-12 text-center text-gray-800">{quantity}</span>
          <button 
             onClick={() => setQuantity(q => q + 1)}
             className="px-4 py-2 hover:bg-gray-100 border-l text-gray-600"
          >+</button>
        </div>
      </div>

      {/* Nút bấm */}
      <button 
        onClick={handleAddToCart}
        className={`w-full py-4 rounded-xl font-bold text-lg text-white transition shadow-lg flex justify-center items-center gap-2 transform active:scale-95 ${
            isSuccess ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isSuccess ? (
            <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Đã thêm vào giỏ!
            </>
        ) : (
            <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                Thêm vào giỏ hàng
            </>
        )}
      </button>
    </div>
  );
}