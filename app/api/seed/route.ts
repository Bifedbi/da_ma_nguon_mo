// app/api/seed/route.ts
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Product from '@/models/Product';
import bcrypt from "bcryptjs";
import User from "@/models/User";

export async function GET() {
  try {
    // 1. Kết nối DB
    await connectToDatabase();

    // 2. Xóa dữ liệu cũ (để tránh trùng lặp nếu chạy nhiều lần)
    await Product.deleteMany({});

    // 3. Danh sách đồ chơi mẫu
    const sampleProducts = [
      {
        name: "Bộ Lắp Ghép Lego City",
        description: "Bộ đồ chơi lắp ráp thành phố cảnh sát với 300 chi tiết nhựa an toàn.",
        price: 550000,
        image: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=500&auto=format&fit=crop",
        category: "Lắp ráp",
        inStock: true,
      },
      {
        name: "Gấu Bông Teddy Khổng Lồ",
        description: "Gấu bông cao 1m2, chất liệu vải nhung mềm mịn, ôm cực thích.",
        price: 320000,
        image: "https://images.unsplash.com/photo-1559454403-b8fb87521bc7?w=500&auto=format&fit=crop",
        category: "Gấu bông",
        inStock: true,
      },
      {
        name: "Xe Đua Điều Khiển Từ Xa",
        description: "Xe đua F1 tốc độ cao, pin sạc, điều khiển xa tới 50m.",
        price: 450000,
        image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=500&auto=format&fit=crop",
        category: "Xe cộ",
        inStock: true,
      },
      {
        name: "Bộ Đồ Chơi Bác Sĩ",
        description: "Vali đồ chơi nhập vai bác sĩ với ống nghe, kim tiêm, nhiệt kế.",
        price: 150000,
        image: "https://images.unsplash.com/photo-1629237622964-6725227c2f0f?w=500&auto=format&fit=crop",
        category: "Nhập vai",
        inStock: true,
      },
      {
        name: "Rubik 3x3 Tốc Độ Cao",
        description: "Khối Rubik xoay trơn, bền bỉ, giúp rèn luyện trí tuệ.",
        price: 90000,
        image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&auto=format&fit=crop",
        category: "Trí tuệ",
        inStock: true,
      }
    ];

    // Tạo tài khoản admin mặc định
    await User.deleteMany({});
    const hashedPassword = await bcrypt.hash("admin123", 10); // Mật khẩu là admin123

    await User.create({
      name: "Quản Trị Viên",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
      phone: "0909000111"
    });

    // 4. Lưu vào DB
    await Product.insertMany(sampleProducts);

    return NextResponse.json({ 
      message: "Đã tạo sản phẩm và tài khoản Admin (admin@gmail.com / admin123)", 
      products: sampleProducts 
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}