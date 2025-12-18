// components/Providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/context/CartContext"; // Import mới

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider> {/* Bọc thêm cái này */}
        {children}
      </CartProvider>
    </SessionProvider>
  );
}