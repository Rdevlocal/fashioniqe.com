import React,{useEffect} from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
// internal
import SEO from '@/components/seo';
import Wrapper from '@/layout/wrapper';
import Footer from '@/layout/footers/footer';
import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';


const CheckoutPage = () => {
  const router = useRouter();
  useEffect(() => {
    const isAuthenticate = Cookies.get("userInfo");
    if(!isAuthenticate){
      router.push("/login")
    }
  },[router])
  return (
    <Wrapper>
      <SEO pageTitle="Checkout" />
      <CommonBreadcrumb title="Checkout" subtitle="Checkout" bg_clr={true} />
      <CheckoutArea/>
      <Footer style_2={true} />
    </Wrapper>
  );
};

export default CheckoutPage;