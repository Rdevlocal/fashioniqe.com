import React from "react";
import Error from "@/components/404";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Error | Fashioniqe Never Overpay for Style Again",
  description: "This is Error Page for Fashioniqe",
  // other metadata
};

const ErrorPage = () => {
  return (
    <main>
      <Error />
    </main>
  );
};

export default ErrorPage;
