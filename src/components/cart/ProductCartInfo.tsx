"use client";

import { useCallback } from "react";
import { EnrichedProducts } from "@/types/types";

const ProductCartInfo = ({ product }: { product: EnrichedProducts }) => {
  const {
    productId,
    size,
    variantId,
    category,
    price,
    quantity,
    purchased,
    color,
  } = product;

  const quantityButtons = useCallback(() => {
    if (purchased) {
      return (
        <div className="text-sm">
          {quantity ? (price * quantity).toFixed(2) : price}€
        </div>
      );
    } 
  }, [purchased, quantity, price]);

  return (
    <>
      <div className="flex sm:hidden">
        <div className="text-sm pr-2.5 border-r">{size}</div>
        <div className="text-sm pl-2.5">{color}</div>
      </div>
      <div className="flex items-center justify-between sm:hidden">
        {quantityButtons()}
      </div>
      <div className="items-center justify-between hidden sm:flex">
        {quantityButtons()}
        <div className="flex">
          <div className="text-sm pr-2.5 border-r">{size}</div>
          <div className="text-sm pl-2.5">{color}</div>
        </div>
      </div>
    </>
  );
};

export default ProductCartInfo;
