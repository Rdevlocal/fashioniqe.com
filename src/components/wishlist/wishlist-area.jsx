import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import WishlistItem from './wishlist-item';

const WishlistArea = () => {
  const { wishlist } = useSelector((state) => state.wishlist);
  return (
    <>
      <section className="tp-wishlist-area pb-120">
        <div className="container">
          {wishlist.length === 0 &&
            <div className='text-center pt-50'>
              <h3>No Wishlist Items Found</h3>
              <Link href="/shop" className="tp-wishlist-checkout-btn mt-20">Continue Shipping</Link>
            </div>
          }
          {wishlist.length > 0 &&
            <div className="row">
              <div className="col-xl-12">
                <div className="tp-wishlist-list mb-45 mr-30">
                  <table className="table">
                    <thead>
                      <tr>
                      <th colSpan="2" className="tp-wishlist-header-product">Product</th>
                        <th className="tp-wishlist-header-price">Price</th>
                        <th className="tp-wishlist-header-quantity">Highest price</th>
                        <th className="tp-wishlist-header-quantity">Lowest price</th>
                        <th>Action</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {wishlist.map((item, i) => (
                        <WishlistItem key={i} product={item} />
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="tp-wishlist-bottom">
                  <div className="row align-items-end">
                    <div className="col-xl-6 col-md-4">
                      <div className="tp-wishlist-update">
                        <Link href="/wishlist" className="tp-wishlist-update-btn">Go To wishlist</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </section>
    </>
  );
};

export default WishlistArea;