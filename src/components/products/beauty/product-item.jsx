import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// internal
import { QuickView, Wishlist } from "@/svg";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";

const ProductItem = ({ product, prdCenter = false, primary_style = false }) => {
  const { _id, img, title, discount, price, tags, status } = product || {};
  const { wishlist = [] } = useSelector((state) => state.wishlist || {});
  const isAddedToWishlist = wishlist.some((prd) => prd._id === _id);
  const dispatch = useDispatch();

  // handle wishlist product
  const handleWishlistProduct = (prd) => {
    dispatch(add_to_wishlist(prd));
  };

  return (
    <div
      className={`tp-product-item-3 mb-50 ${primary_style ? "tp-product-style-primary" : ""} ${prdCenter ? "text-center" : ""}`}
    >
      <div className="tp-product-thumb-3 mb-15 fix p-relative z-index-1">
        <Link href={`/product-details/${_id}`}>
          <Image src={img} alt="product image" width={282} height={320} />
        </Link>

        <div className="tp-product-badge">
          {status === 'out-of-stock' && <span className="product-hot">out-stock</span>}
        </div>

        {/* product action */}
        <div className="tp-product-action-3 tp-product-action-blackStyle">
          <div className="tp-product-action-item-3 d-flex flex-column">
            <button
              onClick={() => dispatch(handleProductModal(product))}
              className="tp-product-action-btn-3 tp-product-quick-view-btn"
            >
              <QuickView />
              <span className="tp-product-tooltip">Quick View</span>
            </button>

            <button disabled={status === 'out-of-stock'} onClick={() => handleWishlistProduct(product)} className={`tp-product-action-btn-3 
            ${isAddedToWishlist ? 'active' : ''} tp-product-add-to-wishlist-btn`}>
              <Wishlist />
              <span className="tp-product-tooltip">Add To Wishlist</span>
            </button>

          </div>
        </div>
      </div>
      <div className="tp-product-content-3">
        <div className="tp-product-tag-3">
          <span>{tags[1]}</span>
        </div>
        <h3 className="tp-product-title-3">
          <Link href={`/product-details/${_id}`}>{title}</Link>
        </h3>
        <div className="tp-product-price-wrapper-3">
          <span className="tp-product-price-3">${price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
