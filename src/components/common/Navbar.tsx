"use client";

import Link from "next/link";
import { Session } from "next-auth";
import { UserMenu } from "./UserMenu";
import SearchInput from "./SearchInput";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface NavbarProps {
  session: Session | null;
  wishlistItems?: any;
}

export const Navbar = ({ session, wishlistItems }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get wishlist item count
  const wishlistCount = wishlistItems?.items?.length || 0;

  return (
    <header className="w-full px-6 py-4 bg-black border-b border-[#2E2E2E] sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Left Side: Logo and Nav Links */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <Link href="/">
            <div className="text-xl font-bold text-white">Fashioniqe</div>
          </Link>
          
          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/men" className="text-white hover:text-gray-300 transition">
              Men
            </Link>
            <Link href="/women" className="text-white hover:text-gray-300 transition">
              Women
            </Link>
            <Link href="/sale" className="text-white hover:text-gray-300 transition">
              Sale
            </Link>
          </nav>
        </div>
        
        {/* Center: Search Bar (visible on desktop) */}
        <div className="hidden md:block w-full max-w-md mx-8">
          <SearchInput />
        </div>

        {/* Right Side: Wishlist & Login */}
        <div className="flex items-center space-x-6">
          {/* Wishlist Icon */}
          <Link href="/wishlist" aria-label="Wishlist" className="relative text-white hover:text-gray-300">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Login / User Menu */}
          {session?.user ? (
            <UserMenu fastSession={session} />
          ) : (
            <Link href="/login">
              <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2">
                Login
              </Button>
            </Link>
          )}
          
          {/* Mobile menu toggle */}
          <button 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pb-2 border-t border-[#2E2E2E] pt-3">
          <nav className="flex flex-col space-y-3">
            {/* Mobile Search Bar */}
            <div className="py-2 px-4">
              <SearchInput />
            </div>
            <Link href="/men" className="text-white py-2 px-4 hover:bg-gray-900">Men</Link>
            <Link href="/women" className="text-white py-2 px-4 hover:bg-gray-900">Women</Link>
            <Link href="/sale" className="text-white py-2 px-4 hover:bg-gray-900">Sale</Link>
          </nav>
        </div>
      )}
    </header>
  );
};