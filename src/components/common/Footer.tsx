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
            <Link href="/home" target="_blank" title="Fashioniqe">
              <img
                src="/logo.svg"
                alt="Fashioniqe Logo"
                height="140"
                width="140"
                style={{ color: "currentColor" }}
              />
            </Link>
            <span className="flex items-center text-sm text-[#A1A1A1]">© 2025</span>
          </div>
        </div>

        <div className="w-full max-w-xs">
          <h2 className="my-3 text-sm font-medium">Men</h2>
          <ul className="grid grid-cols-2">
            <li className={liStyles}><Link href="/men/t-shirts" className={linkStyles}>T-shirts</Link></li>
            <li className={liStyles}><Link href="/men/pants" className={linkStyles}>Pants</Link></li>
            <li className={liStyles}><Link href="/men/sweatshirts" className={linkStyles}>Sweatshirts</Link></li>
            <li className={liStyles}><Link href="/men/jackets" className={linkStyles}>Jackets</Link></li>
            <li className={liStyles}><Link href="/men/shoes" className={linkStyles}>Shoes</Link></li>
            <li className={liStyles}><Link href="/men/accessories" className={linkStyles}>Accessories</Link></li>
          </ul>
        </div>

        <div className="w-full max-w-xs">
          <h2 className="my-3 text-sm font-medium">Women</h2>
          <ul className="grid grid-cols-2">
            <li className={liStyles}><Link href="/women/t-shirts" className={linkStyles}>T-shirts</Link></li>
            <li className={liStyles}><Link href="/women/pants" className={linkStyles}>Pants</Link></li>
            <li className={liStyles}><Link href="/women/sweatshirts" className={linkStyles}>Sweatshirts</Link></li>
            <li className={liStyles}><Link href="/women/dresses" className={linkStyles}>Dresses</Link></li>
            <li className={liStyles}><Link href="/women/shoes" className={linkStyles}>Shoes</Link></li>
            <li className={liStyles}><Link href="/women/accessories" className={linkStyles}>Accessories</Link></li>
          </ul>
        </div>
      </nav>
    </footer>
  );
};
