import React from 'react';

const Privacy = () => {
  return (
    <div className="privacy-page">
      <div className="container">
        <h1 className="privacy-title">Privacy Policy</h1>

        <section className="privacy-section">
          <h2>1. Introduction</h2>
          <p>We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.</p>
        </section>

        <section className="privacy-section">
          <h2>2. Information We Collect</h2>
          <p>We may collect personal information that you voluntarily provide, such as your name, email address, and payment details. We also collect non-personal information, such as browser type and device information.</p>
        </section>

        <section className="privacy-section">
          <h2>3. How We Use Your Information</h2>
          <p>We use your information to provide and improve our services, process transactions, and communicate with you regarding updates and promotions.</p>
        </section>

        <section className="privacy-section">
          <h2>4. Sharing of Information</h2>
          <p>We do not sell your personal information. However, we may share your information with third parties to facilitate services, comply with the law, or protect our rights.</p>
        </section>

        <section className="privacy-section">
          <h2>5. Cookies and Tracking Technologies</h2>
          <p>We use cookies to improve your experience on our website. You can control cookie preferences through your browser settings.</p>
        </section>

        <section className="privacy-section">
          <h2>6. Data Retention</h2>
          <p>We retain your personal information for as long as necessary to provide our services, comply with legal obligations, or resolve disputes.</p>
        </section>

        <section className="privacy-section">
          <h2>7. Your Rights</h2>
          <p>You have the right to access, update, or delete your personal data. To make a request, please contact us at <a href="mailto:privacy@example.com">privacy@example.com</a>.</p>
        </section>

        <section className="privacy-section">
          <h2>8. Changes to This Privacy Policy</h2>
          <p>We may update this policy from time to time. We encourage you to review this page periodically to stay informed about how we protect your data.</p>
        </section>

        <section className="privacy-section">
          <h2>9. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@example.com">privacy@example.com</a>.</p>
        </section>
      </div>

      <style jsx>{`
        .privacy-page {
          padding: 50px 20px;
          background-color: #f9f9f9;
        }

        .container {
          max-width: 900px;
          margin: 0 auto;
          background: #fff;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .privacy-title {
          font-size: 36px;
          font-weight: bold;
          margin-bottom: 20px;
          text-align: center;
        }

        .privacy-section h2 {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 15px;
        }

        .privacy-section p {
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        a {
          color: #007bff;
        }

        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Privacy;
