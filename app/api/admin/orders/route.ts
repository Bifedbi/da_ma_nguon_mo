// app/api/admin/orders/route.ts
import User from "@/models/User";
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

// 1. Lấy toàn bộ danh sách đơn hàng
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    // Kiểm tra quyền Admin
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ message: "Không có quyền truy cập" }, { status: 403 });
    }

    await connectToDatabase();

    // Lấy đơn hàng, sắp xếp mới nhất lên đầu
    // .populate("user", "name email") nghĩa là: Thay vì chỉ lấy User ID, hãy lấy luôn Tên và Email của họ
    const orders = await Order.find({})
      .populate("user", "name email address")
      .sort({ createdAt: -1 });

    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ message: "Lỗi lấy đơn hàng", error: error.message }, { status: 500 });
  }
}

// 2. Cập nhật trạng thái đơn hàng (Ví dụ: Từ "Đang xử lý" -> "Đang giao")
export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { orderId, status } = await request.json();
    await connectToDatabase();

    await Order.findByIdAndUpdate(orderId, { status });

    return NextResponse.json({ message: "Cập nhật thành công" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}