import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { mobile_menu } from "@/data/menu-data";
import ErrorMsg from "./error-msg";
import { HomeNewArrivalPrdLoader } from "../loader";
import { useGetProductTypeQuery } from "@/redux/features/productApi";

const MobileMenus = () => {
  const [isActiveMenu, setIsActiveMenu] = useState("");

  const { data: products, isError, isLoading } = useGetProductTypeQuery({
    type: "jewelry",
    query: "new=true",
  });

  // Handle submenu toggle
  const handleOpenSubMenu = (title) => {
    setIsActiveMenu((prev) => (prev === title ? "" : title));
  };

  // Determine content to display
  let content;

  if (isLoading) {
    content = <HomeNewArrivalPrdLoader loading={isLoading} />;
  } else if (isError) {
    content = <ErrorMsg msg="There was an error" />;
  } else if (products?.data?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  }

  return (
    <nav className="tp-main-menu-content">
      {mobile_menu.map((menu, i) => (
        <ul key={i}>
          {menu.homes ? (
            <li
              className={`has-dropdown has-mega-menu ${isActiveMenu === menu.title ? "dropdown-opened" : ""}`}
            >
              <a className={isActiveMenu === menu.title ? "expanded" : ""}>
                Home
                <button
                  onClick={() => handleOpenSubMenu(menu.title)}
                  className={`dropdown-toggle-btn ${isActiveMenu === menu.title ? "dropdown-opened" : ""}`}
                >
                  <i className="fa-regular fa-angle-right"></i>
                </button>
              </a>
              <div
                className={`home-menu tp-submenu tp-mega-menu ${isActiveMenu === menu.title ? "active" : ""}`}
              >

              </div>
            </li>
          ) : menu.sub_menu ? (
            <li className={`has-dropdown ${isActiveMenu === menu.title ? "dropdown-opened" : ""}`}>
              <a className={isActiveMenu === menu.title ? "expanded" : ""}>
                {menu.title}
                <button
                  onClick={() => handleOpenSubMenu(menu.title)}
                  className={`dropdown-toggle-btn ${isActiveMenu === menu.title ? "dropdown-opened" : ""}`}
                >
                  <i className="fa-regular fa-angle-right"></i>
                </button>
              </a>
              <ul className={`tp-submenu ${isActiveMenu === menu.title ? "active" : ""}`}>
                {menu.sub_menus.map((sub, index) => (
                  <li key={index}>
                    <Link href={sub.link}>{sub.title}</Link>
                  </li>
                ))}
              </ul>
            </li>
          ) : (
            <li>
              <Link href={menu.link}>{menu.title}</Link>
            </li>
          )}
        </ul>
      ))}
    </nav>
  );
};

export default MobileMenus;
