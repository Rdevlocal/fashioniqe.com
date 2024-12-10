import React from 'react';
import SEO from '@/components/seo';
import Footer from '@/layout/footers/footer';
import Wrapper from '@/layout/wrapper';
import CompareArea from '@/components/compare/compare-area';
import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';

const ComparePage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Shop" />
      <CommonBreadcrumb title="Compare" subtitle="Compare" />
      <CompareArea/>
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default ComparePage;