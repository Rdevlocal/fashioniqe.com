import React from 'react';
import SEO from '@/components/seo';
import Footer from '@/layout/footers/footer';
import Wrapper from '@/layout/wrapper';
import WishlistArea from '@/components/wishlist/wishlist-area';
import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';

const WishlistPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Wishlist" />
      <CommonBreadcrumb title="Wishlist" subtitle="Wishlist" />
      <WishlistArea/>
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default WishlistPage;