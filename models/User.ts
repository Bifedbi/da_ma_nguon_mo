import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Mật khẩu đã mã hóa
  phone: { type: String },
  address: { type: String },
  role: { type: String, default: "user" }, // "user" hoặc "admin"
}, { timestamps: true });

const User = models.User || model("User", UserSchema);
export default User;