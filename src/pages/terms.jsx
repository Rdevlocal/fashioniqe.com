import React from 'react';

const Terms = () => {
  return (
    <div className="terms-page">
      <div className="container">
        <h1 className="terms-title">Terms and Conditions</h1>

        <section className="terms-section">
          <h2>1. Introduction</h2>
          <p>Welcome to our website. By accessing or using our site, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.</p>
        </section>

        <section className="terms-section">
          <h2>2. Use of the Website</h2>
          <p>You are granted a non-exclusive, non-transferable, revocable license to access and use our website in accordance with these terms. You agree not to use the website for any illegal or unauthorized purpose.</p>
        </section>

        <section className="terms-section">
          <h2>3. User Obligations</h2>
          <p>Users must provide accurate information and comply with applicable laws. You are responsible for maintaining the confidentiality of your account and password.</p>
        </section>

        <section className="terms-section">
          <h2>4. Intellectual Property</h2>
          <p>All content on this website, including text, images, logos, and designs, is the intellectual property of our company. Unauthorized use of this content is prohibited.</p>
        </section>

        <section className="terms-section">
          <h2>5. Limitation of Liability</h2>
          <p>We will not be liable for any damages arising from the use or inability to use the website, including direct, indirect, or consequential damages.</p>
        </section>

        <section className="terms-section">
          <h2>6. Changes to the Terms</h2>
          <p>We reserve the right to modify or replace these terms at any time. It is your responsibility to check for updates periodically.</p>
        </section>

        <section className="terms-section">
          <h2>7. Contact Us</h2>
          <p>If you have any questions about these terms, please contact us at <a href="mailto:support@example.com">support@example.com</a>.</p>
        </section>
      </div>

      <style jsx>{`
        .terms-page {
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

        .terms-title {
          font-size: 36px;
          font-weight: bold;
          margin-bottom: 20px;
          text-align: center;
        }

        .terms-section h2 {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 15px;
        }

        .terms-section p {
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

export default Terms;
