// app/api/products/route.ts
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Product from '@/models/Product';

// 1. Hàm xử lý khi thêm sản phẩm mới (POST)
export async function POST(request: Request) {
  try {
    const body = await request.json(); // Lấy dữ liệu từ Client gửi lên
    
    await connectToDatabase();
    
    // Tạo sản phẩm mới
    const newProduct = await Product.create(body);
    
    return NextResponse.json(
      { message: "Thêm sản phẩm thành công", product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi khi tạo sản phẩm", error },
      { status: 500 }
    );
  }
}

// 2. Hàm lấy danh sách sản phẩm (GET) - Tiện thể làm luôn để dùng sau này
export async function GET() {
  await connectToDatabase();
  const products = await Product.find({}).sort({ createdAt: -1 });
  return NextResponse.json(products);
}