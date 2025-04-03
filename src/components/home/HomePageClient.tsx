"use client";

import Link from "next/link";
import Image from "next/image";
import { Products } from "@/components/products/Products";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import { useState, useEffect } from "react";

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
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Testimonials data
  const testimonials = [
    {
      text: "Fashioniqe helped me find the perfect outfit at the best price. The price prediction feature saved me over €50!",
      author: "Emma S.",
      location: "Amsterdam"
    },
    {
      text: "I love the price alerts feature. Got notified when my favorite jacket went on sale and purchased it immediately.",
      author: "Michael L.",
      location: "Berlin"
    },
    {
      text: "The style recommendations are spot on. It's like having a personal stylist without the extra cost.",
      author: "Sophie T.",
      location: "Paris"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen">
      {/* Hero Section with parallax effect */}
      <section className="relative h-[90vh] mb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
        <div className="absolute inset-0">
          <Image
            src="/hero-image.jpg" 
            alt="Fashion Collection"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        
        <div className="relative h-full flex items-center z-20">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
                Discover <span className="text-blue-400">Your Style</span> at the Right Price
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Intelligent shopping with AI-powered price prediction and personalized recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/men"
                  className="px-8 py-4 bg-white text-black font-medium rounded-md hover:bg-gray-100 transition text-center transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Shop Men
                </Link>
                <Link 
                  href="/women"
                  className="px-8 py-4 bg-transparent border-2 border-white text-white font-medium rounded-md hover:bg-white hover:text-black transition text-center transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Shop Women
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Trending strip at bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-blue-900 to-purple-900 py-3 z-20">
          <div className="container mx-auto px-6">
            <div className="flex items-center overflow-hidden">
              <span className="text-white font-bold whitespace-nowrap mr-4">TRENDING NOW:</span>
              <div className="flex animate-marquee whitespace-nowrap">
                {["Summer Collection", "Sustainable Fashion", "Price Drop Alert", "Smart Shopping", "Style Predictions"].map((item, index) => (
                  <span key={index} className="text-white mx-4">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

     
      {/* Featured Products Section */}
      <section className="container mx-auto px-6 mb-24">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h6 className="text-blue-500 font-medium mb-1">HANDPICKED FOR YOU</h6>
            <h2 className="text-3xl md:text-4xl font-bold">Featured Products</h2>
          </div>
          <Link href="/featured" className="text-blue-500 hover:text-blue-600 flex items-center">
            View All
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
              <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
        
        {loading ? (
          <ProductSkeleton extraClassname="" numberProducts={4} />
        ) : (
          <Products products={featuredProducts} extraClassname="" />
        )}
      </section>
      
      {/* Categories Showcase */}
      <section className="container mx-auto px-6 mb-24">
        <div className="text-center mb-12">
          <h6 className="text-blue-500 font-medium mb-1">EXPLORE OUR COLLECTIONS</h6>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop By Category</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Discover the latest trends and styles across our extensive collections, curated for every occasion and preference.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Men Categories */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/men" className="block relative rounded-lg overflow-hidden h-96 group">
              <Image
                src="/men-category.jpg"
                alt="Men's Collection"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end">
                <div className="p-8">
                  <h3 className="text-3xl font-bold text-white">Men's Collection</h3>
                  <p className="text-gray-200 mt-2 mb-4">Explore the latest styles</p>
                  <div className="flex items-center text-sm text-white font-medium opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Shop Now 
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          
          {/* Women Categories */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/women" className="block relative rounded-lg overflow-hidden h-96 group">
              <Image
                src="/women-category.jpg"
                alt="Women's Collection"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end">
                <div className="p-8">
                  <h3 className="text-3xl font-bold text-white">Women's Collection</h3>
                  <p className="text-gray-200 mt-2 mb-4">Discover new arrivals</p>
                  <div className="flex items-center text-sm text-white font-medium opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Shop Now 
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
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
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end">
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-white">{category.name}</h3>
                    {category.count !== undefined && (
                      <p className="text-gray-200 mt-1">{category.count} products</p>
                    )}
                    <div className="flex items-center mt-2 text-sm text-white font-medium opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      Explore
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Banner with Parallax Effect */}
      <section className="relative py-32 mb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90 z-10"></div>
        <div className="absolute inset-0">
          <Image
            src="/promo-banner.jpg" 
            alt="Special Offer"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        
        <div className="relative container mx-auto px-6 flex flex-col md:flex-row items-center z-20">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Special Summer <span className="text-yellow-300">Offer</span>
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-lg">
              Get 20% off on all new summer arrivals. Use code: <span className="font-bold text-yellow-300">SUMMER24</span>
            </p>
            <Link 
              href="/sale"
              className="inline-block px-8 py-4 bg-white text-black font-medium rounded-md hover:bg-gray-100 transition transform hover:-translate-y-1 hover:shadow-lg"
            >
              Shop Now
            </Link>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20 max-w-sm">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">Limited Time Offer</h3>
                <p className="text-white/80 mb-6">Sale ends in:</p>
                
                <div className="flex justify-center gap-4 text-center">
                  {[
                    {value: 7, label: "Days"},
                    {value: 18, label: "Hours"},
                    {value: 45, label: "Minutes"},
                    {value: 22, label: "Seconds"}
                  ].map((item, index) => (
                    <div key={index} className="flex-1">
                      <div className="bg-white/15 rounded-lg px-2 py-3 backdrop-blur-md border border-white/10">
                        <div className="text-2xl font-bold text-white">{item.value}</div>
                        <div className="text-xs text-white/70">{item.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
  
      {/* New Arrivals */}
      <section className="container mx-auto px-6 mb-24">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h6 className="text-blue-500 font-medium mb-1">JUST LANDED</h6>
            <h2 className="text-3xl md:text-4xl font-bold">New Arrivals</h2>
          </div>
          <Link href="/new-arrivals" className="text-blue-500 hover:text-blue-600 flex items-center">
            View All
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
              <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
        
        {loading ? (
          <ProductSkeleton extraClassname="" numberProducts={6} />
        ) : (
          <Products products={newArrivals} extraClassname="" />
        )}
      </section>

    
    </div>
  );
}