import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderFour from '@/layout/headers/header-4';
import JewelryShopBanner from '@/components/shop-banner/jewelry-shop-banner';
import PopularProducts from '@/components/products/jewelry/popular-products';
import ProductArea from '@/components/products/jewelry/product-area';
import JewelryCollectionBanner from '@/components/shop-banner/jewelry-collection-banner';
import BestSellerPrd from '@/components/products/jewelry/best-seller-prd';
import InstagramAreaFour from '@/components/instagram/instagram-area-4';
import FeatureAreaThree from '@/components/features/feature-area-3';
import FooterTwo from '@/layout/footers/footer-2';

export default function Home() {
  return (
    <Wrapper>
      <SEO pageTitle='Home'/>
      <HeaderFour/>
      <FeatureAreaThree />
      <JewelryShopBanner/>
      <PopularProducts/>
      <ProductArea/>
      <JewelryCollectionBanner/>
      <BestSellerPrd/>
      <InstagramAreaFour/>
      <FooterTwo/>
    </Wrapper>
  )
}
