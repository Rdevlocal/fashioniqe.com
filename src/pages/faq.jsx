import React from "react";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from '@/layout/headers/header-2';
import Footer from "@/layout/footers/footer";

const FaqPage = () => {
  return (
    <Wrapper>
      <HeaderTwo/>
      <SEO pageTitle="FAQ" />
      <section className="faq">
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <div className="faq-item">
            <h2>1. How do I place an order?</h2>
            <p>
              Placing an order is simple! Browse our products, select the items you like, choose the appropriate size and color, and add them to your cart. Once you're ready, go to your cart and follow the checkout process.
            </p>
          </div>
          <div className="faq-item">
            <h2>2. What payment methods do you accept?</h2>
            <p>
              We accept major credit and debit cards, as well as PayPal, Apple Pay, and Google Pay for your convenience.
            </p>
          </div>
          <div className="faq-item">
            <h2>3. How long does shipping take?</h2>
            <p>
              Shipping times vary depending on your location. Typically, orders are processed within 1-2 business days and delivered within 3-7 business days.
            </p>
          </div>
          <div className="faq-item">
            <h2>4. Can I return or exchange an item?</h2>
            <p>
              Yes, we offer a hassle-free return and exchange policy. If you're not satisfied with your purchase, you can return or exchange it within 30 days of receipt. Please ensure the items are unworn, unwashed, and in their original condition.
            </p>
          </div>
          <div className="faq-item">
            <h2>5. How can I track my order?</h2>
            <p>
              Once your order is shipped, we will send you a tracking number via email. You can use this tracking number to check the status of your delivery on our website.
            </p>
          </div>
          <div className="faq-item">
            <h2>6. How do I contact customer support?</h2>
            <p>
              If you have any questions or need assistance, feel free to contact our customer support team via the contact form on our website or by emailing us directly. We aim to respond within 24 hours.
            </p>
          </div>
        </div>
      </section>
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default FaqPage;