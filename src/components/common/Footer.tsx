"use client";

import React from "react";
import Link from "next/link";

export const Footer = () => {
  const linkStyles = "text-sm transition duration-150 ease hover:text-white";
  const liStyles = "text-[#A1A1A1] my-1.5";

  return (
    <footer className="px-6 py-24 border-t border-solid pointer-events-auto bg-[#0A0A0A] border-[#242424]">
      <nav className="flex flex-wrap justify-around gap-5 mx-auto max-w-screen-2xl">
        <div className="flex flex-col items-center justify-center w-full max-w-xs gap-5">
          <div className="flex gap-3.5">
            <Link href="https://portfoliomarcos.com/" target="_blank" title="Portfolio of Marcos">
              <svg
                data-testid="geist-icon"
                height="24"
                strokeLinejoin="round"
                viewBox="0 0 16 16"
                width="24"
                style={{ color: "currentColor" }}
              >
                <path fillRule="evenodd" clipRule="evenodd" d="M8 1L16 15H0L8 1Z" fill="currentColor"></path>
              </svg>
            </Link>
            <span className="flex items-center text-sm text-[#A1A1A1]">© 2025</span>
          </div>
          <div className="flex gap-3.5">
            <Link href="https://www.linkedin.com/in/marcospenelascamara/" target="_blank" title="LinkedIn of Marcos">
              <svg
                data-testid="geist-icon"
                height="24"
                strokeLinejoin="round"
                viewBox="0 0 16 16"
                width="24"
                style={{ color: "currentColor" }}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 0C0.895431 0 0 0.895431 0 2V14C0 15.1046 0.895431 16 2 16H14C15.1046 16 16 15.1046 16 14V2C16 0.895431 15.1046 0 14 0H2ZM5 6.75V13H3V6.75H5ZM5 4.50008C5 5.05554 4.61409 5.5 3.99408 5.5H3.98249C3.38582 5.5 3 5.05554 3 4.50008C3 3.93213 3.39765 3.5 4.00584 3.5C4.61409 3.5 4.98845 3.93213 5 4.50008ZM8.5 13H6.5C6.5 13 6.53178 7.43224 6.50007 6.75H8.5V7.78371C8.5 7.78371 9 6.75 10.5 6.75C12 6.75 13 7.59782 13 9.83107V13H11V10.1103C11 10.1103 11 8.46616 9.7361 8.46616C8.4722 8.46616 8.5 9.93972 8.5 9.93972V13Z"
                  fill="currentColor"
                ></path>
              </svg>
            </Link>
          </div>
        </div>

        <div className="w-full max-w-xs">
          <h2 className="my-3 text-sm font-medium">Products</h2>
          <ul className="grid grid-cols-2">
            <li className={liStyles}><Link href="/t-shirts" className={linkStyles}>T-shirts</Link></li>
            <li className={liStyles}><Link href="/pants" className={linkStyles}>Pants</Link></li>
            <li className={liStyles}><Link href="/sweatshirts" className={linkStyles}>Sweatshirts</Link></li>
          </ul>
        </div>

        <div className="w-full max-w-xs">
          <h2 className="my-3 text-sm font-medium">Assistance</h2>
          <ul className="grid grid-cols-2">
            <li className={liStyles}><Link href="#" className={linkStyles}>Size guide</Link></li>
            <li className={liStyles}><Link href="#" className={linkStyles}>Delivery</Link></li>
          </ul>
        </div>
      </nav>
    </footer>
  );
};
