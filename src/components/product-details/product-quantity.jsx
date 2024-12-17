import React from 'react';

const ProductQuantity = () => {
  return (
    <div className="tp-product-details-quantity">
      <div className="tp-product-quantity mb-15 mr-15">
        <input className="tp-cart-input" type="text" readOnly value={1} />
      </div>
    </div>
  );
};

export default ProductQuantity;
