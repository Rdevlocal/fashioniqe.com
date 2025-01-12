import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// internal
import { Close, Minus, Plus } from "@/svg";
import {add_cart_product,quantityDecrement} from "@/redux/features/cartSlice";
import { remove_wishlist_product } from "@/redux/features/wishlist-slice";

const WishlistItem = ({ product }) => {
  const { _id, img, title, price } = product || {};
  const dispatch = useDispatch();
  // handle add product
  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };
  // handle decrement product
  const handleDecrement = (prd) => {
    dispatch(quantityDecrement(prd));
  };

  // handle remove product
  const handleRemovePrd = (prd) => {
    dispatch(remove_wishlist_product(prd));
  };
  return (
    <tr>
      <td className="tp-cart-img">
        <Link href={`/product-details/${_id}`}>
          <Image src={img} alt="product img" width={70} height={100} />
        </Link>
      </td>
      <td className="tp-cart-title">
        <Link href={`/product-details/${_id}`}>{title}</Link>
      </td>
      <td className="tp-cart-price">
        <span>${price.toFixed(2)}</span>
      </td>
      <td className="tp-cart-pricemin">
        <span>${price.toFixed(2)}</span>
      </td>
      <td className="tp-cart-pricemax">
        <span>${price.toFixed(2)}</span>
      </td>


      <td className="tp-cart-action">
        <button
          onClick={() => handleRemovePrd({ title, id: _id })}
          className="tp-cart-action-btn"
        >
          <Close />
          <span> Remove</span>
        </button>
      </td>
    </tr>
  );
};

export default WishlistItem;
