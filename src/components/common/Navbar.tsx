"use client";

import Link from "next/link";
import { Session } from "next-auth";
import { UserMenu } from "./UserMenu";
import SearchInput from "./SearchInput";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  session: Session | null;
  totalWishlists?: number;
}

export const Navbar = ({ session, totalWishlists = 0 }: NavbarProps) => {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between bg-background-secondary border-b border-border-primary">
      {/* Left Side: Logo & Category Tabs */}
      <div className="flex items-center space-x-6">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.svg" alt="Brand Logo" width={140} height={40} className="h-auto" />
        </Link>

        {/* Category Tabs */}
        <nav className="hidden lg:flex space-x-6 text-sm font-medium">
          <Link href="/men" className="hover:text-gray-300 transition">Men</Link>
          <Link href="/women" className="hover:text-gray-300 transition">Women</Link>
        </nav>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 max-w-2xl mx-auto">
        <SearchInput />
      </div>

      {/* Right Side: Wishlist & Login */}
      <div className="flex items-center space-x-4">
        {/* Wishlist Icon */}
        <Link href="/wishlist" aria-label="Wishlist" className="relative">
          <svg width="22" height="22" fill="currentColor">
            <path d="M1.39408 2.14408C3.21165 0.326509 6.13348 0.286219 8 2.02321C9.86652 0.286221 12.7884 0.326509 14.6059 2.14408C16.4647 4.00286 16.4647 7.01653 14.6059 8.87531L8 15.4812L1.39408 8.87531C-0.464691 7.01653 -0.464694 4.00286 1.39408 2.14408Z"></path>
          </svg>
          {totalWishlists > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalWishlists}
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
    </header>
  );
};
