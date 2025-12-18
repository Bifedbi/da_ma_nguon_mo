// app/layout.tsx
import Providers from "@/components/Providers";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // 1. Import Navbar (Lưu ý đường dẫn @/)

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Toy Store - Thế giới đồ chơi",
  description: "Cửa hàng bán đồ chơi tốt nhất",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <Providers>
          <div> 
            <Navbar />
            <main className="flew-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}