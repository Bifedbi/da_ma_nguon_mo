// app/api/orders/route.ts
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Order from "@/models/Order";
import { getServerSession } from "next-auth"; 
import { authOptions } from "@/lib/authOptions";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions); 
    
    if (!session || !session.user) {
      return NextResponse.json({ message: "Chưa đăng nhập" }, { status: 401 });
    }

    const { items, total } = await request.json();
    
    const userId = (session.user as any).id;
    if (!userId) {
        return NextResponse.json({ message: "Không tìm thấy ID người dùng" }, { status: 400 });
    }

    await connectToDatabase();

    // --- ĐOẠN SỬA LỖI QUAN TRỌNG ---
    // Chuyển đổi dữ liệu: Lấy _id từ frontend gán vào trường product của backend
    const formattedItems = items.map((item: any) => ({
      product: item._id, // <--- MẤU CHỐT LÀ Ở ĐÂY (Map _id sang product)
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
    }));
    // --------------------------------

    const newOrder = await Order.create({
      user: userId,
      items: formattedItems, // Lưu danh sách đã format
      total,
      status: "Đang xử lý",
    });

    return NextResponse.json({ message: "Đặt hàng thành công", orderId: newOrder._id }, { status: 201 });

  } catch (error: any) {
    console.error("Lỗi chi tiết:", error);
    return NextResponse.json({ message: "Lỗi tạo đơn hàng", error: error.message }, { status: 500 });
  }
}