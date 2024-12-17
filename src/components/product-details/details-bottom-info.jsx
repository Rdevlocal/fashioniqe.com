import React from "react";
import Image from "next/image";
import payment_option_img from '@assets/img/product/icons/payment-option.png';

const DetailsBottomInfo = ({ 
  sku, 
  category, 
  tag, 
  brand, 
  season, 
  year, 
  color, 
  deliveryTime, 
  material, 
  size 
}) => {
  return (
    <>
      {/* product-details-query */}
      <div className="tp-product-details-query">
        <div className="tp-product-details-query-item d-flex align-items-center">
          <span>SKU: </span>
          <p>{sku}</p>
        </div>
        <div className="tp-product-details-query-item d-flex align-items-center">
          <span>Category: </span>
          <p>{category}</p>
        </div>

        <div className="tp-product-details-query-item d-flex align-items-center">
          <span>Brand: </span>
          <p>{brand}</p>
        </div>
        <div className="tp-product-details-query-item d-flex align-items-center">
          <span>Season: </span>
          <p>{season}</p>
        </div>
        <div className="tp-product-details-query-item d-flex align-items-center">
          <span>Year: </span>
          <p>{year}</p>
        </div>
        <div className="tp-product-details-query-item d-flex align-items-center">
          <span>Color: </span>
          <p>{color}</p>
        </div>

        <div className="tp-product-details-query-item d-flex align-items-center">
          <span>Material: </span>
          <p>{material}</p>
        </div>
        <div className="tp-product-details-query-item d-flex align-items-center">
          <span>Size: </span>
          <p>{size}</p>
        </div>
        <div className="tp-product-details-query-item d-flex align-items-center">
          <span>Barcode: </span>
          <p>{size}</p>
        </div>
      </div>
    </>
  );
};

export default DetailsBottomInfo;
