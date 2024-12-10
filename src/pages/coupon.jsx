import React from 'react';
import SEO from '@/components/seo';
import Footer from '@/layout/footers/footer';
import Wrapper from '@/layout/wrapper';
import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import CouponArea from '@/components/coupon/coupon-area';

const CouponPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Coupon" />
      <CommonBreadcrumb title="Grab Best Offer" subtitle="Coupon" />
      <CouponArea/>
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default CouponPage;