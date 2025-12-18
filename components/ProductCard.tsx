// components/ProductCard.tsx
import Link from 'next/link';

interface ProductProps {
  product: {
    _id: string;
    name: string;
    price: number;
    image: string; // Giữ nguyên tên biến image như code cũ của bạn
    category: string;
  }
}

export default function ProductCard({ product }: ProductProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-lg transition flex flex-col h-full group">
      
      {/* 1. Biến ảnh thành Link dẫn tới chi tiết */}
      <Link href={`/products/${product._id}`} className="relative h-64 w-full bg-gray-100 block overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
      </Link>

      <div className="p-4 flex flex-col grow">
        <span className="text-xs text-blue-500 font-bold uppercase tracking-wider mb-1">
          {product.category}
        </span>
        
        {/* 2. Biến tên sản phẩm thành Link */}
        <Link href={`/products/${product._id}`}>
          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3">
          <span className="text-xl font-bold text-red-600">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
          </span>
          
          {/* --- THAY ĐỔI Ở ĐÂY: Xóa nút Button, thay bằng Link xem chi tiết --- */}
          <Link 
            href={`/products/${product._id}`}
            className="text-sm text-gray-400 hover:text-blue-600 transition flex items-center gap-1"
          >
            Chi tiết &rarr;
          </Link>
          {/* ------------------------------------------------------------------ */}
          
        </div>
      </div>
    </div>
  );
}