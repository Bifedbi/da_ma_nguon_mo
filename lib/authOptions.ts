// lib/authOptions.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDatabase();
        const user = await User.findOne({ email: credentials?.email });

        if (!user) throw new Error("Email không tồn tại!");

        const isValid = await bcrypt.compare(credentials!.password, user.password);
        if (!isValid) throw new Error("Sai mật khẩu!");

        // Trả về object user bao gồm cả ID và Role
        return { 
          id: user._id.toString(), 
          name: user.name, 
          email: user.email, 
          role: user.role 
        };
      },
    }),
  ],
  callbacks: {
    // 1. Chuyển thông tin từ User vào Token
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
        token.id = user.id; // Lưu ID vào token
      }
      return token;
    },
    // 2. Chuyển thông tin từ Token ra Session (để Client và API dùng)
    async session({ session, token }: any) {
      if (session.user) {
        session.user.role = token.role;
        (session.user as any).id = token.id; // Gán ID vào session
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};