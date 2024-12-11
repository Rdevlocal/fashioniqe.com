import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Internal Imports
import social_data from '@/data/social-data';
import { Email, Location } from '@/svg';
import logo from '@assets/img/logo/logo.svg';
import pay from '@assets/img/footer/footer-pay.png';

const FooterTwo = () => {
  return (
    <footer>
      <div
        className="tp-footer-area tp-footer-style-2"
        data-bg-color="F5F5F5"
        style={{ backgroundColor: 'rgb(245, 245, 245)' }}
      >
        {/* Footer Top */}
        <div className="tp-footer-top pt-95 pb-40">
          <div className="container">
            <div className="row justify-content-between gap-3">
              {/* Logo & Contact Section */}
              <div className="col-lg-3 col-md-6">
                <div className="tp-footer-widget footer-col-1 mb-50">
                  <div className="tp-footer-logo">
                    <Link href="/">
                      <Image src={logo} alt="logo" />
                    </Link>
                  </div>
                  <div className="tp-footer-widget-content">
                    <div className="tp-footer-contact">
                      <div className="tp-footer-contact-item d-flex align-items-start">
                        <div className="tp-footer-contact-icon">
                        </div>
                        <div className="tp-footer-contact-content">
                          <p>
                            <a >
                            Discover the latest trends and timeless essentials for men, women, and kids. Shop effortlessly and elevate your look with Fashioniqe!







                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Section */}
              <div className="col-lg-2 col-md-6">
                <div className="tp-footer-widget footer-col-2 mb-50">
                  <h4 className="tp-footer-widget-title">Company</h4>
                  <ul className="tp-footer-links">
                    <li>
                      <Link href="/about">About</Link>
                    </li>
                    <li>
                      <Link href="/contact">Contact</Link>
                    </li>
                    <li>
                      <Link href="/faq">FAQ</Link>
                    </li>
                    <li>
                      <Link href="/become-a-seller">Become a Seller</Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Account Section */}
              <div className="col-lg-2 col-md-6">
                <div className="tp-footer-widget footer-col-3 mb-50">
                  <h4 className="tp-footer-widget-title">Account</h4>
                  <ul className="tp-footer-links">
                    <li>
                      <Link href="/login">Login</Link>
                    </li>
                    <li>
                      <Link href="/settings">Settings</Link>
                    </li>
                    <li>
                      <Link href="/wishlist">Wishlist</Link>
                    </li>
                    <li>
                      <Link href="/compare">Compare</Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Shop Section */}
              <div className="col-lg-3 col-md-6">
                <div className="tp-footer-widget footer-col-4 mb-50">
                  <h4 className="tp-footer-widget-title">Shop</h4>
                  <ul className="tp-footer-links">
                    <li>
                      <Link href="/man">Man</Link>
                    </li>
                    <li>
                      <Link href="/woman">Woman</Link>
                    </li>
                    <li>
                      <Link href="/kids">Kids</Link>
                    </li>
                    <li>
                      <Link href="/sale">Sale</Link>
                    </li>
                    <li>
                      <Link href="/brandlist">Brandlist</Link>
                    </li>
                    <li>
                      <Link href="/fast-movers">Fast Movers</Link>
                    </li>
                    <li>
                      <Link href="/vouchers">Vouchers</Link>
                    </li>
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
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="tp-footer-copyright">
                    <p>
                      © {new Date().getFullYear()} All Rights Reserved | Fashioniqe <Link href="/">Terms</Link> | <Link href="/">Privacy</Link>
                    </p>
                  </div>
                </div>
                <div className="col-md-6">

                  <div className="tp-footer-social-4 tp-footer-social">
                    <h4 className="tp-footer-social-title-4">Follow Us On</h4>
                    {social_data.map((s) => (
                      <a
                        href={s.link}
                        key={s.id}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
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
    </footer>
  );
};

export default FooterTwo;
