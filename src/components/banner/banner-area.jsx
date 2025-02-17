import React from "react";
import Link from "next/link";
// internal
import { ArrowRight } from "@/svg";
import banner_1 from "@assets/img/product/banner/clothing-banner-1.jpg";
import banner_2 from "@assets/img/product/banner/clothing-banner-2.jpg";

// Banner item
function BannerItem({ sm = false, bg, title, discount }) {
  return (
    <div
      className={`tp-banner-item ${
        sm ? "tp-banner-item-sm" : ""
      } tp-banner-height p-relative mb-30 z-index-1 fix`}
    >
      <div
        className="tp-banner-thumb include-bg transition-3"
        style={{ backgroundImage: `url(${bg.src})` }}
      ></div>
      <div className="tp-banner-content">
        {!sm && <span>{discount} off all collections</span>}
        <h3 className="tp-banner-title">
          <Link href="/shop">{title}</Link>
        </h3>
        {sm && <p>{discount} off selected items</p>}
        <div className="tp-banner-btn">
          <Link href="/shop" className="tp-link-btn">
            Shop Now
            <ArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}

const BannerArea = () => {
  return (
    <section className="tp-banner-area pb-70">
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-7">
            <BannerItem
              bg={banner_1}
              title={
                <>
                  New Season <br /> Fashion Collection
                </>
              }
              discount="Sale 30%"
            />
          </div>
          <div className="col-xl-4 col-lg-5">
            <BannerItem
              sm={true}
              bg={banner_2}
              title={
                <>
                  Exclusive Winter <br /> Jackets
                </>
              }
              discount="Sale 50%"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerArea;