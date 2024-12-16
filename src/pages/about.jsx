import React from "react";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from '@/layout/headers/header-2';
import Footer from "@/layout/footers/footer";

const AboutPage = () => {
  return (
    <Wrapper>
      <HeaderTwo/>
      <SEO pageTitle="About Us" />
      <section className="about-us">
        <div className="container">
          <h1>About Us</h1>
          <p>
            Welcome to our clothing webshop! We are passionate about providing our customers with the latest fashion trends and timeless classics. Our mission is to offer high-quality, stylish, and affordable clothing for everyone. From casual wear to formal attire, we have something for every occasion.
          </p>
          <p>
            Our team is dedicated to curating a collection that reflects both modern style and timeless elegance. We work closely with trusted suppliers and designers to ensure that every piece in our store meets our high standards of quality and design.
          </p>
          <p>
            Customer satisfaction is at the heart of everything we do. We strive to create a seamless shopping experience, from browsing our collections to receiving your order at your doorstep. Our friendly customer support team is always ready to assist you with any questions or concerns.
          </p>
          <p>
            Thank you for choosing us as your go-to destination for fashion. We look forward to helping you look and feel your best every day.
          </p>
        </div>
      </section>
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default AboutPage;
