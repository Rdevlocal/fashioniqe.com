import React from 'react';
import Link from 'next/link';
// internal
import { ArrowRightLong } from '@/svg';
import banner_bg_1 from '@assets/img/banner/4/banner-1.png';
import banner_bg_2 from '@assets/img/banner/4/banner-2.png';
import banner_bg_3 from '@assets/img/banner/4/banner-3.png';
import banner_bg_4 from '@assets/img/banner/4/banner-4.png';

// BannerItem
function BannerItem({ cls, bg_clr, bg, content, title, isBtn = false }) {
  return (
    <div className={`tp-banner-item-4 tp-banner-height-4 fix p-relative z-index-1 ${cls}`} 
    data-bg-color={`#${bg_clr}`}>
      <div className="tp-banner-thumb-4 include-bg black-bg transition-3" 
      style={{ backgroundImage: `url(${bg.src})` }}></div>
      <div className="tp-banner-content-4" style={{ color: '#FFFFFF' }}>
        <span style={{ color: '#FFFFFF' }}>{content}</span>
        <h3 className="tp-banner-title-4">
          <Link href="/shop" style={{ color: '#FFFFFF' }}>{title}</Link>
        </h3>
        {isBtn && <div className="tp-banner-btn-4">
          <Link href="/shop" className="tp-btn tp-btn-border" style={{ color: '#FFFFFF' }}>
            Start now {' '} <ArrowRightLong />
          </Link>
        </div>}
      </div>
    </div>
  )
}

const JewelryShopBanner = () => {
  return (
    <>
      <section className="tp-banner-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-7">
              <div className="row">
                <div className="col-xl-12">
                  <BannerItem cls="mb-25" bg_clr="F3F7FF" bg={banner_bg_1} content="Wishlist" 
                  title={<>Create your Wishlist</>} isBtn={true} />
                </div>
                <div className="col-md-6 col-sm-6">
                  <BannerItem cls="has-green sm-banner" bg_clr="F0F6EF" bg={banner_bg_2} content="new" title="Shop new in" />
                </div>
                <div className="col-md-6 col-sm-6">
                  <BannerItem cls="has-brown sm-banner" bg_clr="F8F1E6" bg={banner_bg_3} content="Find new" title="Accessoires" />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-5">
              <div className="tp-banner-full tp-banner-full-height fix p-relative z-index-1">
                <div className="tp-banner-full-thumb include-bg black-bg transition-3" 
                style={{ backgroundImage: `url(${banner_bg_4.src})` }}></div>
                <div className="tp-banner-full-content" style={{ color: '#FFFFFF' }}>
                  <span style={{ color: '#FFFFFF' }}>Collection</span>
                  <h3 className="tp-banner-full-title">
                    <Link href="/shop" style={{ color: '#FFFFFF' }}>Shop the winter <br /> Collection</Link>
                  </h3>
                  <div className="tp-banner-full-btn">
                    <Link href="/shop" className="tp-btn tp-btn-border" style={{ color: '#FFFFFF' }}>
                      Shop Now {' '}<ArrowRightLong />
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

export default JewelryShopBanner;
