// app/products/page.tsx
import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";

// Hàm lấy TẤT CẢ sản phẩm (Không giới hạn)
async function getAllProducts(searchQuery?: string) {
  await connectToDatabase();
  
  const filter: any = {};
  if (searchQuery) {
    filter.name = { $regex: searchQuery, $options: "i" };
  }

  const products = await Product.find(filter).sort({ createdAt: -1 }).lean();
  
  return products.map((product: any) => ({
    ...product,
    _id: product._id.toString(),
  }));
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function AllProductsPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const products = await getAllProducts(q);

  return (
    <div className="container mx-auto px-4 py-10">
      
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-blue-600 transition">Trang chủ</Link> 
        <span>/</span>
        <span className="text-gray-800 font-medium">Tất cả sản phẩm</span>
      </div>

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Kho Đồ Chơi Của Bé</h1>
        <p className="text-gray-500">Khám phá hàng trăm món đồ chơi thú vị và bổ ích</p>
      </div>

      <SearchBar />

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
            {q ? `Kết quả tìm kiếm: "${q}"` : "Danh sách sản phẩm"}
            <span className="text-sm font-normal text-gray-500 ml-2">({products.length} sản phẩm)</span>
        </h2>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-xl">
            <p className="text-xl text-gray-500">Chưa có sản phẩm nào.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}