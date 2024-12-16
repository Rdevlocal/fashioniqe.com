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
          
          <div className="content-block">
            <div className="image-block-left">
              <img src="'@assets/img/about/about-1.jpg" alt="About Us Image 1" />
            </div>
            <div className="text-block-right">
              <p>Welcome to our clothing webshop! We are passionate about providing our customers with the latest fashion trends and timeless classics. Our mission is to offer high-quality, stylish, and affordable clothing for everyone. From casual wear to formal attire, we have something for every occasion. We believe fashion should be accessible, inspiring, and empowering for all.</p>
            </div>
          </div>

          <div className="content-block">
            <div className="text-block-left">
              <p>Our journey began with a simple idea: to create a shopping destination that combines fashion-forward thinking with uncompromising quality. Over the years, we have grown from a small team of dreamers into a full-fledged brand known for our commitment to style, elegance, and customer satisfaction. We remain true to our roots, continually inspired by our customers&#39; desire for fresh, modern, and versatile fashion choices.</p>
            </div>
            <div className="image-block-right">
              <img src="'@assets/img/about/about-1.jpg" alt="About Us Image 2" />
            </div>
          </div>

          <div className="content-block">
            <div className="image-block-left">
              <img src="'@assets/img/about/about-1.jpg" alt="About Us Image 3" />
            </div>
            <div className="text-block-right">
              <p>Our team is dedicated to curating a collection that reflects both modern style and timeless elegance. We work closely with trusted suppliers and designers to ensure that every piece in our store meets our high standards of quality and design. This dedication allows us to consistently introduce fresh styles, ensuring that our customers always have access to the latest fashion must-haves.</p>
            </div>
          </div>

          <div className="content-block">
            <div className="text-block-left">
              <p>Customer satisfaction is at the heart of everything we do. We strive to create a seamless shopping experience, from browsing our collections to receiving your order at your doorstep. Our friendly customer support team is always ready to assist you with any questions or concerns. We believe in fostering a community of fashion enthusiasts and take pride in listening to our customers&#39; feedback to continuously improve our offerings.</p>
            </div>
            <div className="image-block-right">
              <img src="'@assets/img/about/about-1.jpg" alt="About Us Image 4" />
            </div>
          </div>

          <div className="content-block">
            <div className="image-block-left">
              <img src="'@assets/img/about/about-1.jpg" alt="About Us Image 5" />
            </div>
            <div className="text-block-right">
              <p>Our store goes beyond just offering clothing. We aim to inspire confidence, self-expression, and individuality through our carefully curated collections. Each item is selected with our customers&#39; diverse tastes and lifestyles in mind. Whether you&#39;re looking for something bold and trendy or classic and refined, you&#39;ll find pieces that empower you to express your unique sense of style.</p>
            </div>
          </div>

          <div className="content-block">
            <div className="text-block-left">
              <p>Our team is made up of fashion enthusiasts, creative minds, and dedicated professionals who share a passion for style and quality. Each member of our team plays an integral role in ensuring that every part of your shopping experience is smooth, enjoyable, and memorable. From our in-house stylists to our customer care agents, every individual is focused on making you feel valued.</p>
            </div>
            <div className="image-block-right">
              <img src="'@assets/img/about/about-1.jpg" alt="About Us Image 6" />
            </div>
          </div>

          <div className="content-block">
            <div className="image-block-left">
              <img src="'@assets/img/about/about-1.jpg" alt="About Us Image 7" />
            </div>
            <div className="text-block-right">
              <p>Thank you for choosing us as your go-to destination for fashion. We look forward to helping you look and feel your best every day. Our promise is to continue bringing you the most sought-after styles, unparalleled customer service, and a shopping experience that is as enjoyable as it is inspiring.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default AboutPage;