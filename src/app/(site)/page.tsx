import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fashioniqe | Never Overpay for Style Again",
  description: "This is Home for Fashioniqe",
  // other metadata
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
