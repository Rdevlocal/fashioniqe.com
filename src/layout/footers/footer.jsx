import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Internal Imports
import social_data from '@/data/social-data';
import { Email, Location } from '@/svg';
import menu_data from '@/data/menu-data'; // Assuming this is the location of menu_data

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

              {/* Dynamic Categories Section */}
              {menu_data.map((menu) => (
                <div className="col-lg-2 col-md-6" key={menu.id}>
                  <div className="tp-footer-widget footer-col-5 mb-50">
                    <h4 className="tp-footer-widget-title">{menu.title}</h4>
                    <ul className="tp-footer-links">
                      <li>
                        <Link href={menu.link}>{menu.title}</Link>
                      </li>
                      {menu.sub_menu && menu.sub_menus?.map((subMenu, index) => (
                        <li key={index}>
                          <Link href={subMenu.link}>{subMenu.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
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
                      © {new Date().getFullYear()} All Rights Reserved | Fashioniqe <Link href="/terms">Terms</Link> | <Link href="/privacy">Privacy</Link>
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
