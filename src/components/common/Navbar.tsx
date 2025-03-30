"use client";

import Link from "next/link";
import { Session } from "next-auth";
import { UserMenu } from "./UserMenu";
import SearchInput from "./SearchInput";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { connectDB } from "@/libs/mongodb";
import mongoose from "mongoose";

interface NavbarProps {
  session: Session | null;
  wishlistCount?: number;
}

interface Category {
  name: string;
  slug: string;
  image: string;
}

interface Categories {
  men: Category[];
  women: Category[];
}

export const Navbar = ({ session, wishlistCount = 0 }: NavbarProps) => {
  const [menDropdownOpen, setMenDropdownOpen] = useState(false);
  const [womenDropdownOpen, setWomenDropdownOpen] = useState(false);
  const [categories, setCategories] = useState<Categories>({
    men: [],
    women: []
  });

  // Fetch categories from the database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // In a real implementation, you'd make an API call to your backend
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        // Fallback data if API fails
        setCategories({
          men: [
            { name: "T-shirts", slug: "men/t-shirts", image: "/men-tshirts.jpg" },
            { name: "Pants", slug: "men/pants", image: "/men-pants.jpg" },
            { name: "Shirts", slug: "men/shirts", image: "/men-shirts.jpg" },
            { name: "Jackets", slug: "men/jackets", image: "/men-jackets.jpg" },
            { name: "Shoes", slug: "men/shoes", image: "/men-shoes.jpg" },
            { name: "Accessories", slug: "men/accessories", image: "/men-accessories.jpg" }
          ],
          women: [
            { name: "T-shirts", slug: "women/t-shirts", image: "/women-tshirts.jpg" },
            { name: "Pants", slug: "women/pants", image: "/women-pants.jpg" },
            { name: "Dresses", slug: "women/dresses", image: "/women-dresses.jpg" },
            { name: "Skirts", slug: "women/skirts", image: "/women-skirts.jpg" },
            { name: "Shoes", slug: "women/shoes", image: "/women-shoes.jpg" },
            { name: "Accessories", slug: "women/accessories", image: "/women-accessories.jpg" }
          ]
        });
      }
    };

    fetchCategories();
  }, []);

  return (
    <header className="w-full px-6 py-4 bg-background-secondary border-b border-border-primary">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Left Side: Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image src="/logo.svg" alt="Brand Logo" width={140} height={40} className="h-auto" />
          </Link>
        </div>

        {/* Center: Navigation Menu */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          {/* Men's dropdown */}
          <div className="relative" onMouseEnter={() => setMenDropdownOpen(true)} onMouseLeave={() => setMenDropdownOpen(false)}>
            <Link href="/men" className="hover:text-gray-300 transition px-2 py-4">
              Men
            </Link>
            
            {menDropdownOpen && (
              <div className="absolute z-10 left-0 mt-2 w-64 bg-[#0A0A0A] border border-[#2E2E2E] rounded shadow-lg py-2">
                {categories.men.map((category) => (
                  <Link 
                    key={category.slug} 
                    href={`/${category.slug}`}
                    className="flex items-center px-4 py-2 hover:bg-[#1F1F1F]"
                  >
                    <div className="w-8 h-8 mr-2 overflow-hidden rounded">
                      <Image 
                        src={category.image || "/placeholder.jpg"} 
                        alt={category.name}
                        width={32}
                        height={32}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <span className="text-sm">{category.name}</span>
                  </Link>
                ))}
                <div className="border-t border-[#2E2E2E] my-1"></div>
                <Link 
                  href="/men"
                  className="block px-4 py-2 text-sm font-semibold hover:bg-[#1F1F1F]"
                >
                  View All Men's Collection
                </Link>
              </div>
            )}
          </div>

          {/* Women's dropdown */}
          <div className="relative" onMouseEnter={() => setWomenDropdownOpen(true)} onMouseLeave={() => setWomenDropdownOpen(false)}>
            <Link href="/women" className="hover:text-gray-300 transition px-2 py-4">
              Women
            </Link>
            
            {womenDropdownOpen && (
              <div className="absolute z-10 left-0 mt-2 w-64 bg-[#0A0A0A] border border-[#2E2E2E] rounded shadow-lg py-2">
                {categories.women.map((category) => (
                  <Link 
                    key={category.slug} 
                    href={`/${category.slug}`}
                    className="flex items-center px-4 py-2 hover:bg-[#1F1F1F]"
                  >
                    <div className="w-8 h-8 mr-2 overflow-hidden rounded">
                      <Image 
                        src={category.image || "/placeholder.jpg"} 
                        alt={category.name}
                        width={32}
                        height={32}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <span className="text-sm">{category.name}</span>
                  </Link>
                ))}
                <div className="border-t border-[#2E2E2E] my-1"></div>
                <Link 
                  href="/women"
                  className="block px-4 py-2 text-sm font-semibold hover:bg-[#1F1F1F]"
                >
                  View All Women's Collection
                </Link>
              </div>
            )}
          </div>
          
          {/* Other categories */}
          <Link href="/sale" className="hover:text-gray-300 transition">
            Sale
          </Link>
        </nav>

        {/* Right Side: Search, Wishlist & Login */}
        <div className="flex items-center space-x-4">
          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:block w-64">
            <SearchInput />
          </div>

          {/* Wishlist Icon */}
          <Link href="/wishlist" aria-label="Wishlist" className="relative">
            <svg width="22" height="22" fill="currentColor">
              <path d="M1.39408 2.14408C3.21165 0.326509 6.13348 0.286219 8 2.02321C9.86652 0.286221 12.7884 0.326509 14.6059 2.14408C16.4647 4.00286 16.4647 7.01653 14.6059 8.87531L8 15.4812L1.39408 8.87531C-0.464691 7.01653 -0.464694 4.00286 1.39408 2.14408Z"></path>
            </svg>
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Login / User Menu */}
          {session?.user ? (
            <UserMenu fastSession={session} />
          ) : (
            <Link href="/login">
              <Button variant="default" className="px-5 py-2">Login</Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Search - Only visible on small screens */}
      <div className="mt-4 md:hidden">
        <SearchInput />
      </div>
    </header>
  );
};