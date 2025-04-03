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

      {/* USP Section */}
      <section className="container mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#0A0A0A] border border-gray-800 rounded-lg p-6 transform transition-all hover:-translate-y-2 hover:shadow-xl">
            <div className="w-14 h-14 bg-blue-600 bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-400">
                <path d="M12 6V18M12 6L7 11M12 6L17 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Price Prediction</h3>
            <p className="text-gray-400">Our AI analyzes historical data to predict when prices will drop, helping you make smarter purchasing decisions.</p>
          </div>
          
          <div className="bg-[#0A0A0A] border border-gray-800 rounded-lg p-6 transform transition-all hover:-translate-y-2 hover:shadow-xl">
            <div className="w-14 h-14 bg-purple-600 bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-400">
                <path d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Price Alerts</h3>
            <p className="text-gray-400">Set alerts for your favorite items and get notified when prices drop to your desired level.</p>
          </div>
          
          <div className="bg-[#0A0A0A] border border-gray-800 rounded-lg p-6 transform transition-all hover:-translate-y-2 hover:shadow-xl">
            <div className="w-14 h-14 bg-green-600 bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-400">
                <path d="M4.5 12.75L10.5 18.75L19.5 5.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Smart Recommendations</h3>
            <p className="text-gray-400">Discover personalized style recommendations based on your preferences and shopping history.</p>
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
      
      {/* Testimonials */}
      <section className="container mx-auto px-6 mb-24">
        <div className="text-center mb-12">
          <h6 className="text-blue-500 font-medium mb-1">WHAT OUR CUSTOMERS SAY</h6>
          <h2 className="text-3xl md:text-4xl font-bold">Customer Testimonials</h2>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`bg-[#0A0A0A] border border-gray-800 rounded-lg p-8 transition-opacity duration-500 ${
                  index === activeTestimonial ? 'opacity-100' : 'opacity-0 absolute inset-0'
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-500 mb-6">
                    <path d="M9.13456 9.24004C9.52233 7.94004 9.75939 7.00002 9.75939 6.50002C9.75939 4.90002 8.72144 4 7.37042 4C6.01939 4 5 5.20002 5 6.50002C5 7.80002 5.9752 9 7.41125 9C7.63657 9 7.84351 8.94 8.0369 8.89997C7.86018 9.34997 7.43159 9.95001 6.83585 10.2C6.4327 10.35 6.0006 10.3 6.0006 10.3V11C6.0006 11 7.09399 10.9 8.00645 10.2C8.91891 9.50001 8.93937 9.94004 9.13456 9.24004ZM13.5427 6.50002C13.5427 4.90002 14.5806 4 15.9317 4C17.2827 4 18.3021 5.20002 18.3021 6.50002C18.3021 7.80002 17.3269 9 15.8908 9C15.6655 9 15.4586 8.94 15.2652 8.89997C15.4419 9.34997 15.8705 9.95001 16.4662 10.2C16.8694 10.35 17.3015 10.3 17.3015 10.3V11C17.3015 11 16.2081 10.9 15.2957 10.2C14.3832 9.50001 14.3627 9.94004 14.1676 9.24004C13.7798 7.94004 13.5427 7.00002 13.5427 6.50002Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  
                  <p className="text-xl mb-6 italic text-gray-300">"{testimonial.text}"</p>
                  
                  <div>
                    <h4 className="font-bold">{testimonial.author}</h4>
                    <p className="text-gray-400">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 mx-1 rounded-full transition-colors ${
                  index === activeTestimonial ? 'bg-blue-500' : 'bg-gray-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
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

      {/* Newsletter */}
      <section className="container mx-auto px-6 mb-24">
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-2xl p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Stay Updated on Price Drops</h2>
            <p className="text-white/80 mb-8">Subscribe to our newsletter for the latest trends, smart shopping tips, and personalized price alerts.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
              <button className="px-6 py-3 bg-white text-blue-900 rounded-md font-medium hover:bg-gray-100 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}