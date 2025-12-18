// app/page.tsx
import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";

// --- CẬP NHẬT 1: Sửa hàm này để nhận tham số 'limit' ---
async function getProducts(searchQuery?: string, limit?: number) {
  await connectToDatabase();
  
  const filter: any = {};

  // Nếu có từ khóa tìm kiếm
  if (searchQuery) {
    filter.name = { $regex: searchQuery, $options: "i" };
  }

  // Tạo câu lệnh query cơ bản
  let query = Product.find(filter).sort({ createdAt: -1 });

  // Nếu có yêu cầu limit (và KHÔNG đang tìm kiếm) thì giới hạn số lượng
  // (Lý do: Khi tìm kiếm thì nên hiện hết kết quả, không nên giới hạn)
  if (limit && !searchQuery) {
    query = query.limit(limit);
  }

  const products = await query.lean();
  
  return products.map((product: any) => ({
    ...product,
    _id: product._id.toString(),
  }));
}

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { q } = await searchParams;

  // --- CẬP NHẬT 2: Chỉ lấy 8 sản phẩm nếu không tìm kiếm ---
  const products = await getProducts(q, 8);

  return (
    <div className="flex flex-col gap-10 pb-10">
      
      {/* Hero Banner */}
      {!q && (
        <section className="bg-linear-to-r from-blue-600 to-indigo-700 text-white py-20 text-center rounded-b-[3rem] shadow-xl mx-2 md:mx-0">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-md">
            Thế Giới Đồ Chơi 🚀
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Mang niềm vui và trí tuệ đến cho bé yêu qua từng món quà nhỏ.
          </p>
          <Link 
            href="/products" 
            className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-300 transition shadow-lg inline-block"
          >
            Khám phá ngay
          </Link>
        </section>
      )}

      <section className="container mx-auto px-4 mt-8">
        <SearchBar />

        <div className="flex justify-between items-end mb-6">
          <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-blue-500 pl-4">
            {q ? `Kết quả tìm kiếm: "${q}"` : "Sản phẩm mới về"}
          </h2>
          
          {/* --- CẬP NHẬT 3: Hiện nút "Xem tất cả" dẫn sang trang /products --- */}
          {q ? (
            <Link href="/" className="text-red-600 hover:underline font-medium">
              Xóa lọc &times;
            </Link>
          ) : (
            <Link href="/products" className="text-blue-600 hover:underline font-medium flex items-center gap-1">
              Xem tất cả <span className="text-xl">&rarr;</span>
            </Link>
          )}
        </div>
        
        {/* Lưới sản phẩm */}
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 mb-4">😔 Không tìm thấy sản phẩm nào.</p>
            {q && <Link href="/" className="text-blue-600 hover:underline">Xem tất cả sản phẩm</Link>}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
        
        {/* --- CẬP NHẬT 4: Nút Xem toàn bộ to ở dưới cùng --- */}
        {!q && products.length >= 8 && (
             <div className="mt-10 text-center">
                <Link href="/products" className="inline-block border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-600 hover:text-white transition">
                    Xem toàn bộ sản phẩm
                </Link>
             </div>
        )}

      </section>
    </div>
  );
}