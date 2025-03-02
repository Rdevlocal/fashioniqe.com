import React from "react";
import ShopWithSidebar from "@/components/Bestsellers";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Shop | Fashioniqe Never Overpay for Style Again",
  description: "This is Shop Page for Fashioniqe",
  // other metadata
};

const ShopWithSidebarPage = () => {
  return (
    <main>
      <ShopWithSidebar />
    </main>
  );
};

export default ShopWithSidebarPage;
