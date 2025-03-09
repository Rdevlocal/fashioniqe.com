import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import Providers from "./Providers";
import { Navbar } from "../components/common/Navbar";
import { Footer } from "../components/common/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { getTotalWishlist } from "./(carts)/wishlist/action";

import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Fashioniqe",
  description: "Fashion Deals at the Right Price",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: Session | null = await getServerSession(authOptions);
  const totalItemsWishlists = await getTotalWishlist();

  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <Providers>
          <Navbar session={session} wishlistCount={totalItemsWishlists} />
          <main>{children}</main>
          <Footer />
        </Providers>
        <Analytics />
        <SpeedInsights />
        <Toaster />
      </body>
    </html>
  );
}
