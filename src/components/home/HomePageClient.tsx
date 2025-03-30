"use client";

import Link from "next/link";
import Image from "next/image";
import { Products } from "@/components/products/Products";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import { useState } from "react";

interface Category {
  name: string;
  slug: string;
  image: string;
  count?: number;
}

interface Categories {
  men: Category[];
  women: Category[];
}

interface HomePageClientProps {
  products: any[];
  featuredProducts: any[];
  newArrivals: any[];
  categories: Categories;
}

export default function HomePageClient({ 
  products, 
  featuredProducts, 
  newArrivals, 
  categories 
}: HomePageClientProps) {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] mb-12">
        <div className="absolute inset-0 bg-gray-900">
          {/* Hero Image - This would be your main hero image */}
          <Image
            src="/hero-image.jpg" 
            alt="Fashion Collection"
            fill
            className="object-cover opacity-70"
            priority
          />
        </div>
        
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Discover Your Style
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Explore our latest collections and find your perfect look
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/men"
                  className="px-8 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-100 transition text-center"
                >
                  Shop Men
                </Link>
                <Link 
                  href="/women"
                  className="px-8 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white hover:text-black transition text-center"
                >
                  Shop Women
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="container mx-auto px-6 mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Shop By Category</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Men Categories */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/men" className="block relative rounded-lg overflow-hidden h-80 group">
              <Image
                src="/men-category.jpg"
                alt="Men's Collection"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white">Men's Collection</h3>
                  <p className="text-gray-200 mt-2">Explore the latest styles</p>
                </div>
              </div>
            </Link>
          </div>
          
          {/* Women Categories */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/women" className="block relative rounded-lg overflow-hidden h-80 group">
              <Image
                src="/women-category.jpg"
                alt="Women's Collection"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white">Women's Collection</h3>
                  <p className="text-gray-200 mt-2">Discover new arrivals</p>
                </div>
              </div>
            </Link>
          </div>
          
          {/* Subcategories - We'll show 4 featured subcategories */}
          {[...categories.men.slice(0, 2), ...categories.women.slice(0, 2)].map((category, index) => (
            <div key={category.slug} className="col-span-1">
              <Link href={`/${category.slug}`} className="block relative rounded-lg overflow-hidden h-64 group">
                <Image
                  src={category.image || `/category-${index + 1}.jpg`}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-white">{category.name}</h3>
                    {category.count !== undefined && (
                      <p className="text-gray-200 mt-1">{category.count} products</p>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="container mx-auto px-6 mb-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
          <Link href="/featured" className="text-blue-500 hover:text-blue-600">
            View All
          </Link>
        </div>
        
        {loading ? (
          <ProductSkeleton extraClassname="" numberProducts={4} />
        ) : (
          <Products products={featuredProducts} extraClassname="" />
        )}
      </section>
      
      {/* Promotional Banner */}
      <section className="relative py-16 mb-20">
        <div className="absolute inset-0 bg-gray-900">
          <Image
            src="/promo-banner.jpg" 
            alt="Special Offer"
            fill
            className="object-cover opacity-60"
          />
        </div>
        
        <div className="relative container mx-auto px-6 flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Special Offer
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl">
            Get 20% off on all new arrivals this week. Use code: NEWSTYLE20
          </p>
          <Link 
            href="/sale"
            className="px-8 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-100 transition"
          >
            Shop Now
          </Link>
        </div>
      </section>
      
      {/* New Arrivals */}
      <section className="container mx-auto px-6 mb-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">New Arrivals</h2>
          <Link href="/new-arrivals" className="text-blue-500 hover:text-blue-600">
            View All
          </Link>
        </div>
        
        {loading ? (
          <ProductSkeleton extraClassname="" numberProducts={6} />
        ) : (
          <Products products={newArrivals} extraClassname="" />
        )}
      </section>
      
      {/* Brand Features */}
      <section className="container mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 border border-gray-800 rounded-lg bg-[#0C0C0C]">
            <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
            <p className="text-gray-400">Carefully selected high-quality fashion items from trusted brands.</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 border border-gray-800 rounded-lg bg-[#0C0C0C]">
            <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
            <p className="text-gray-400">Quick delivery with order tracking available for all purchases.</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 border border-gray-800 rounded-lg bg-[#0C0C0C]">
            <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
            <p className="text-gray-400">Multiple secure payment options available for your convenience.</p>
          </div>
        </div>
      </section>
    </div>
  );
}