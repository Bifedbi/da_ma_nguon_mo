import mongoose, { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Ai mua?
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        name: { type: String, required: true }, // Lưu tên phòng khi sản phẩm bị xóa
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }, // Lưu giá tại thời điểm mua
        image: { type: String },
      },
    ],
    total: { type: Number, required: true }, // Tổng tiền
    status: { type: String, default: "Đang xử lý" }, // Trạng thái đơn
  },
  { timestamps: true }
);

const Order = models.Order || model("Order", OrderSchema);
export default Order;