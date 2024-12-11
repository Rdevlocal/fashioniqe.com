import React from 'react';
import Link from 'next/link';

// Internal Imports
import social_data from '@/data/social-data';

const FooterTwo = () => {
  return (
    <footer>
      <div 
        className="tp-footer-area tp-footer-style-2" 
        data-bg-color="F5F5F5" 
        style={{ backgroundColor: `rgb(245, 245, 245)` }}
      >
        {/* Footer Top */}
        <div className="tp-footer-top pt-95 pb-40">
          <div className="container">
            <div className="row justify-content-between">
              
              {/* Company Section */}
              <div className="col-xl-2 col-lg-2 col-md-3 col-sm-6">
                <div className="tp-footer-widget footer-col-2 mb-50">
                  <h4 className="tp-footer-widget-title">Company</h4>
                  <ul className="tp-footer-links">
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/faq">FAQ</Link></li>
                    <li><Link href="/become-a-seller">Become a Seller</Link></li>
                  </ul>
                </div>
              </div>

              {/* Account Section */}
              <div className="col-xl-2 col-lg-2 col-md-3 col-sm-6">
                <div className="tp-footer-widget footer-col-3 mb-50">
                  <h4 className="tp-footer-widget-title">Account</h4>
                  <ul className="tp-footer-links">
                    <li><Link href="/login">Login</Link></li>
                    <li><Link href="/settings">Settings</Link></li>
                    <li><Link href="/wishlist">Wishlist</Link></li>
                    <li><Link href="/compare">Compare</Link></li>
                  </ul>
                </div>
              </div>

              {/* Shop Section */}
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                <div className="tp-footer-widget footer-col-4 mb-50">
                  <h4 className="tp-footer-widget-title">Shop</h4>
                  <ul className="tp-footer-links">
                    <li><Link href="/man">Man</Link></li>
                    <li><Link href="/woman">Woman</Link></li>
                    <li><Link href="/kids">Kids</Link></li>
                    <li><Link href="/sale">Sale</Link></li>
                    <li><Link href="/brandlist">Brandlist</Link></li>
                    <li><Link href="/fast-movers">Fast Movers</Link></li>
                    <li><Link href="/vouchers">Vouchers</Link></li>
                  </ul>
                </div>
              </div>

              {/* Legal Section */}
              <div className="col-xl-2 col-lg-2 col-md-3 col-sm-6">
                <div className="tp-footer-widget footer-col-5 mb-50">
                  <h4 className="tp-footer-widget-title">Legal</h4>
                  <ul className="tp-footer-links">
                    <li><Link href="/terms">Terms</Link></li>
                    <li><Link href="/privacy">Privacy</Link></li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="tp-footer-bottom">
          <div className="container">
            <div className="tp-footer-bottom-wrapper">
              <div className="row justify-content-between align-items-center">
                
                {/* Copyright Section */}
                <div className="col-md-6">
                  <div className="tp-footer-copyright text-center text-md-start">
                    <p>
                      © {new Date().getFullYear()} All Rights Reserved  |  Powered by 
                      <Link href="/"> ❤ </Link>.
                    </p>
                  </div>
                </div>
                
                {/* Social Icons */}
                <div className="col-md-6 d-flex justify-content-md-end justify-content-center">
                  <div className="tp-footer-social-4 tp-footer-social">
                    <h4 className="tp-footer-social-title-4">Follow Us On</h4>
                    {social_data.map(s => (
                      <a href={s.link} key={s.id} target="_blank" rel="noopener noreferrer">
                        <i className={s.icon}></i>
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        .tp-footer-widget-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .tp-footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .tp-footer-links li {
          margin-bottom: 10px;
          position: relative;
        }

        .tp-footer-links li::after {
          content: '';
          display: block;
          width: 0;
          height: 2px;
          background-color: #ff6347;
          transition: width 0.3s ease;
          position: absolute;
          bottom: 0;
          left: 0;
        }

        .tp-footer-links li:hover::after {
          width: 100%;
        }

        .tp-footer-links a {
          color: #333;
          text-decoration: none;
          display: inline-block;
          width: 100%;
        }

        .tp-footer-copyright {
          font-size: 14px;
          color: #666;
        }

        .tp-footer-social-title-4 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .tp-footer-social-4 a {
          display: inline-block;
          margin-right: 10px;
          color: #333;
          font-size: 18px;
        }

        .tp-footer-social-4 a:hover {
          color: #ff6347;
        }

        @media (max-width: 768px) {
          .tp-footer-top .row {
            justify-content: center;
          }

          .tp-footer-bottom .row {
            flex-direction: column;
            align-items: center;
          }

          .tp-footer-bottom .col-md-6 {
            margin-bottom: 20px;
          }

          .tp-footer-bottom-wrapper {
            text-align: center;
          }
        }
      `}</style>

    </footer>
  );
};

export default FooterTwo;
