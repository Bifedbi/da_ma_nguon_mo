// app/api/orders/history/route.ts
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions"; // Import file cấu hình Auth

export async function GET() {
  try {
    // 1. Kiểm tra xem ai đang đăng nhập
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ message: "Chưa đăng nhập" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    // 2. Kết nối DB
    await connectToDatabase();

    // 3. Tìm đơn hàng của user đó (Sắp xếp mới nhất lên đầu)
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ message: "Lỗi hệ thống", error: error.message }, { status: 500 });
  }
}