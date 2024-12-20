import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
// internal
import about_img from '@assets/img/about/about-1.jpg';
import { ArrowRightLong } from '@/svg';

const productpage = () => {
  return (
    <>
      <section className="tp-about-area pt-125 pb-180">
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-lg-6">
              <div className="tp-about-thumb-wrapper p-relative mr-35">
                <div className="tp-about-thumb m-img">
                  <Image src={about_img} alt="about_img" />
                </div>
              </div>
            </div>
            <div className="col-xl-7 col-lg-6">
              <div className="tp-about-wrapper pl-80 pt-75 pr-60">
                <div className="tp-section-title-wrapper-4 mb-50">
                <span className="tp-section-title-pre-4">Exclusive Deals</span>
<h3 className="tp-section-title-4 fz-50">Track Prices on Limited Edition Collections</h3>
</div>
<div className="tp-about-content pl-120">
  <p>Stay ahead of the trends and never miss a price drop. <br /> Our pricewatcher keeps you informed about the best deals on limited edition clothing collections. Shop smart, save big, and stay stylish with real-time price updates and exclusive offers.</p>

  <div className="tp-about-btn">
    <Link href="/price-alerts" className="tp-btn">
      Set Price Alerts {" "}<ArrowRightLong />
    </Link>
  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default productpage;