import React from "react";
import Image from "next/image";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="overflow-hidden">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
        {/* <!-- footer menu start --> */}
        <div className="flex flex-wrap xl:flex-nowrap gap-10 xl:gap-19 xl:justify-between pt-17.5 xl:pt-22.5 pb-10 xl:pb-15">
          
          {/* Men Section */}
          <div className="w-full sm:w-auto">
            <h2 className="mb-7.5 text-custom-1 font-medium text-dark">Men</h2>
            <ul className="flex flex-col gap-3.5">
              <li><a className="ease-out duration-200 hover:text-blue" href="#">Clothing</a></li>
              <li><a className="ease-out duration-200 hover:text-blue" href="#">Shoes</a></li>
              <li><a className="ease-out duration-200 hover:text-blue" href="#">Accessories</a></li>
              <li><a className="ease-out duration-200 hover:text-blue" href="#">New Arrivals</a></li>
              <li><a className="ease-out duration-200 hover:text-blue" href="#">Sale</a></li>
            </ul>
          </div>

          {/* Women Section */}
          <div className="w-full sm:w-auto">
            <h2 className="mb-7.5 text-custom-1 font-medium text-dark">Women</h2>
            <ul className="flex flex-col gap-3.5">
              <li><a className="ease-out duration-200 hover:text-blue" href="#">Clothing</a></li>
              <li><a className="ease-out duration-200 hover:text-blue" href="#">Shoes</a></li>
              <li><a className="ease-out duration-200 hover:text-blue" href="#">Accessories</a></li>
              <li><a className="ease-out duration-200 hover:text-blue" href="#">New Arrivals</a></li>
              <li><a className="ease-out duration-200 hover:text-blue" href="#">Sale</a></li>
            </ul>
          </div>

          {/* Account Section */}
          <div className="w-full sm:w-auto">
            <h2 className="mb-7.5 text-custom-1 font-medium text-dark">Account</h2>
            <ul className="flex flex-col gap-3.5">
              <li><a className="ease-out duration-200 hover:text-blue" href="#">My Account</a></li>
              <li><a className="ease-out duration-200 hover:text-blue" href="#">Login / Register</a></li>
              <li><a className="ease-out duration-200 hover:text-blue" href="#">Cart</a></li>
              <li><a className="ease-out duration-200 hover:text-blue" href="#">Wishlist</a></li>
              <li><a className="ease-out duration-200 hover:text-blue" href="#">Shop</a></li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="w-full sm:w-auto">
            <h2 className="mb-7.5 text-custom-1 font-medium text-dark">Quick Links</h2>
            <ul className="flex flex-col gap-3">
              <li><a className="ease-out duration-200 hover:text-blue" href="#">Privacy Policy</a></li>
              <li><a className="ease-out duration-200 hover:text-blue" href="#">Refund Policy</a></li>
              <li><a className="ease-out duration-200 hover:text-blue" href="#">Terms of Use</a></li>
              <li><a className="ease-out duration-200 hover:text-blue" href="#">FAQ’s</a></li>
              <li><a className="ease-out duration-200 hover:text-blue" href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        {/* <!-- footer menu end --> */}
      </div>

      {/* <!-- footer bottom start --> */}
      <div className="py-5 xl:py-7.5 bg-gray-1">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex gap-5 flex-wrap items-center justify-between">
            <p className="text-dark font-medium">&copy; {year}. All rights reserved by Fashioniqe.</p>
          </div>
        </div>
      </div>
      {/* <!-- footer bottom end --> */}
    </footer>
  );
};

export default Footer;
