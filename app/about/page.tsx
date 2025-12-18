// app/about/page.tsx
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      
      {/* 1. Phần mở đầu (Intro) */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Chào mừng đến với ToyStore! 🧸</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Nơi trí tưởng tượng bay xa và niềm vui không bao giờ kết thúc. 
          Chúng tôi tin rằng đồ chơi không chỉ là vật vô tri, mà là người bạn đồng hành 
          giúp nuôi dưỡng tâm hồn và trí tuệ của trẻ thơ.
        </p>
      </div>

      {/* 2. Hình ảnh và Câu chuyện */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="rounded-2xl overflow-hidden shadow-lg h-96 relative">
          <img 
            src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=2070&auto=format&fit=crop" 
            alt="Trẻ em chơi đùa" 
            className="w-full h-full object-cover hover:scale-105 transition duration-500"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Câu Chuyện Của Chúng Tôi</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Khởi đầu từ một cửa hàng nhỏ với niềm đam mê cháy bỏng về những món đồ chơi an toàn và trí tuệ, 
            ToyStore đã phát triển thành điểm đến tin cậy của hàng ngàn bậc phụ huynh.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Chúng tôi kỹ tính trong việc chọn lọc từng sản phẩm. Mỗi món đồ chơi trên kệ đều phải đạt 3 tiêu chí: 
            <strong> An toàn tuyệt đối - Mang tính giáo dục - Kích thích sáng tạo.</strong>
          </p>
          
          <div className="flex gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-xl flex-1">
              <div className="text-2xl font-bold text-blue-600">5+</div>
              <div className="text-xs text-gray-500">Năm kinh nghiệm</div>
            </div>
            <div className="text-center p-4 bg-indigo-50 rounded-xl flex-1">
              <div className="text-2xl font-bold text-indigo-600">10k+</div>
              <div className="text-xs text-gray-500">Khách hàng vui vẻ</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-xl flex-1">
              <div className="text-2xl font-bold text-yellow-600">100%</div>
              <div className="text-xs text-gray-500">Chính hãng</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Giá trị cốt lõi */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Tại Sao Chọn ToyStore?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
              🛡️
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">An Toàn Là Số 1</h3>
            <p className="text-gray-500 text-sm">
              100% sản phẩm được kiểm định chất lượng, không nhựa độc hại, an toàn cho sức khỏe của bé.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
              🚚
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Giao Hàng Thần Tốc</h3>
            <p className="text-gray-500 text-sm">
              Đóng gói cẩn thận, giao hàng nhanh chóng trên toàn quốc. Miễn phí vận chuyển đơn từ 500k.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
              🎁
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Gói Quà Miễn Phí</h3>
            <p className="text-gray-500 text-sm">
              Dịch vụ gói quà đẹp mắt và viết thiệp tay miễn phí để bạn trao gửi yêu thương trọn vẹn.
            </p>
          </div>

        </div>
      </div>

      {/* 4. Lời kêu gọi hành động */}
      <div className="bg-linear-to-r from-indigo-600 to-blue-600 rounded-3xl p-10 md:p-16 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Sẵn sàng mang niềm vui về nhà?</h2>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
          Khám phá bộ sưu tập đồ chơi mới nhất của chúng tôi và nhận ngay ưu đãi đặc biệt cho đơn hàng đầu tiên.
        </p>
        <Link 
          href="/products" 
          className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg inline-block"
        >
          Mua Sắm Ngay
        </Link>
      </div>

    </div>
  );
}