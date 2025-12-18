// app/products/[id]/page.tsx
import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";

// Hàm lấy dữ liệu sản phẩm từ DB
async function getProduct(id: string) {
  try {
    await connectToDatabase();
    const product = await Product.findById(id).lean();
    if (!product) return null;
    
    return {
      ...product,
      _id: product._id.toString(),
      createdAt: product.createdAt?.toString(),
      updatedAt: product.updatedAt?.toString(),
    };
  } catch (error) {
    console.error("Lỗi lấy sản phẩm:", error);
    return null;
  }
}

// --- SỬA ĐỔI QUAN TRỌNG Ở ĐÂY ---
// Định nghĩa lại kiểu dữ liệu của params là Promise
interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  // 1. Thêm 'await' để giải nén params
  const { id } = await params;
  
  // Gọi hàm lấy dữ liệu với ID đã lấy được
  const product: any = await getProduct(id);

  if (!product) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-10">
      
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-blue-600 transition">Trang chủ</Link> 
        <span>/</span>
        <Link href="/products" className="hover:text-blue-600 transition">Sản phẩm</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium truncate max-w-50">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        {/* Cột Trái: Ảnh sản phẩm */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto max-h-125 object-contain rounded-xl hover:scale-105 transition duration-500"
          />
        </div>

        {/* Cột Phải: Thông tin & Nút mua */}
        <div className="flex flex-col gap-6">
          <div>
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              {product.name}
            </h1>
          </div>

          <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
             <span className="text-3xl font-bold text-red-600">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
            </span>
            {product.inStock ? (
              <span className="flex items-center gap-1 text-green-600 font-medium text-sm bg-green-50 px-2 py-1 rounded">
                <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span> Còn hàng
              </span>
            ) : (
              <span className="text-red-500 font-medium text-sm bg-red-50 px-2 py-1 rounded">Hết hàng</span>
            )}
          </div>

          <div className="py-2">
            <h3 className="font-bold text-gray-800 mb-3 text-lg">Mô tả sản phẩm</h3>
            <p className="text-gray-600 leading-relaxed text-base">
              {product.description}
            </p>
          </div>

          <AddToCartButton product={product} />

          <div className="grid grid-cols-2 gap-4 mt-4 text-xs text-gray-500 bg-gray-50 p-4 rounded-xl">
             <div className="flex items-center gap-2">✅ Hàng chính hãng 100%</div>
             <div className="flex items-center gap-2">🚚 Giao hàng toàn quốc</div>
             <div className="flex items-center gap-2">🛡️ Bảo hành 12 tháng</div>
             <div className="flex items-center gap-2">🔄 Đổi trả trong 7 ngày</div>
          </div>
        </div>
      </div>
    </div>
  );
}