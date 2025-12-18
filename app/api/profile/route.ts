// app/api/profile/route.ts
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

// 1. Lấy thông tin cá nhân (SĐT, Địa chỉ) để hiển thị lên Form
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return NextResponse.json({ message: "Chưa đăng nhập" }, { status: 401 });

    await connectToDatabase();
    const user = await User.findById((session.user as any).id).select("name email phone address");

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: "Lỗi lấy thông tin" }, { status: 500 });
  }
}

// 2. Cập nhật thông tin mới
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return NextResponse.json({ message: "Chưa đăng nhập" }, { status: 401 });

    const { phone, address } = await request.json(); // Lấy dữ liệu từ Client gửi lên
    
    await connectToDatabase();
    
    // Tìm user và cập nhật
    await User.findByIdAndUpdate((session.user as any).id, {
        phone,
        address
    });

    return NextResponse.json({ message: "Cập nhật thành công" });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi cập nhật" }, { status: 500 });
  }
}