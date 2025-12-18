// models/Product.ts
import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Vui lòng nhập tên sản phẩm"], // Bắt buộc
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String, // Chúng ta sẽ lưu đường dẫn ảnh (URL)
      required: true,
    },
    category: {
      type: String, // Ví dụ: "Xe cộ", "Búp bê"
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Tự động tạo ngày tạo (createdAt) và ngày sửa (updatedAt)
  }
);

// Nếu model đã tồn tại thì dùng lại, nếu chưa thì tạo mới (quan trọng cho Next.js)
const Product = models.Product || model("Product", ProductSchema);

export default Product;