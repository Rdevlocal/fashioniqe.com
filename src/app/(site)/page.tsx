import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fashioniqe | Never Overpay for Style Again",
  // other metadata
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
