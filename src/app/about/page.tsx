// src/app/about/page.tsx
import React from 'react';
import { Metadata } from 'next';

// Define metadata for SEO
export const metadata: Metadata = {
  title: 'About Us | Fashioniqe',
  description: 'Learn more about Fashioniqe, our story, mission, and the team behind our fashion platform.',
};

const AboutPage = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Fashioniqe</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Bringing intelligence to fashion shopping with personalized recommendations and smart price tracking
        </p>
      </div>

      {/* Our Story Section */}
      <div className="flex flex-col md:flex-row gap-12 mb-24 items-center">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-300">
            <p>
              Fashioniqe was founded in 2020 with a simple mission: to make online fashion shopping smarter, more personalized, and more transparent.
            </p>
            <p>
              Our founder experienced firsthand the frustration of tracking prices manually across multiple sites, missing sales on items she loved, and receiving generic recommendations that didn't match her style.
            </p>
            <p>
              What began as a small startup has evolved into a comprehensive fashion platform that combines AI-powered recommendations, price history analytics, and trend forecasting to provide a truly intelligent shopping experience.
            </p>
            <p>
              Today, we partner with hundreds of brands and retailers to bring our users the best selection of fashion items, complete with the tools and insights they need to make confident purchasing decisions.
            </p>
          </div>
        </div>
        <div className="md:w-1/2 relative h-96 rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
          <div className="text-2xl font-light text-gray-400">Fashioniqe Team</div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Innovation */}
          <div className="bg-[#0A0A0A] border border-gray-800 rounded-lg p-6 flex flex-col items-center text-center">
            <div className="text-blue-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Innovation</h3>
            <p className="text-gray-400">We push boundaries and embrace new technologies to revolutionize the fashion shopping experience.</p>
          </div>
          
          {/* Sustainability */}
          <div className="bg-[#0A0A0A] border border-gray-800 rounded-lg p-6 flex flex-col items-center text-center">
            <div className="text-blue-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Sustainability</h3>
            <p className="text-gray-400">We're committed to promoting sustainable fashion and reducing environmental impact across our platform.</p>
          </div>
          
          {/* Inclusivity */}
          <div className="bg-[#0A0A0A] border border-gray-800 rounded-lg p-6 flex flex-col items-center text-center">
            <div className="text-blue-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Inclusivity</h3>
            <p className="text-gray-400">We believe that fashion is for everyone, and we strive to create a platform that celebrates diversity.</p>
          </div>
          
          {/* Quality */}
          <div className="bg-[#0A0A0A] border border-gray-800 rounded-lg p-6 flex flex-col items-center text-center">
            <div className="text-blue-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Quality</h3>
            <p className="text-gray-400">We curate products with attention to craftsmanship, materials, and durability to ensure customer satisfaction.</p>
          </div>
        </div>
      </div>

      {/* Team Section - Simplified */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold mb-12 text-center">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Team Member 1 */}
          <div className="flex flex-col sm:flex-row bg-[#0A0A0A] border border-gray-800 rounded-lg overflow-hidden">
            <div className="sm:w-1/3 relative h-60 sm:h-auto bg-gray-700 flex items-center justify-center">
              <div className="text-gray-500">CEO Image</div>
            </div>
            <div className="sm:w-2/3 p-6">
              <h3 className="text-xl font-bold">Sarah Johnson</h3>
              <p className="text-blue-400 mb-3">CEO & Founder</p>
              <p className="text-gray-300">Sarah founded Fashioniqe with a vision to create a more intelligent shopping experience. With over 15 years in the fashion industry and a background in tech, she combines style expertise with cutting-edge innovation.</p>
            </div>
          </div>
          
          {/* Team Member 2 */}
          <div className="flex flex-col sm:flex-row bg-[#0A0A0A] border border-gray-800 rounded-lg overflow-hidden">
            <div className="sm:w-1/3 relative h-60 sm:h-auto bg-gray-700 flex items-center justify-center">
              <div className="text-gray-500">CTO Image</div>
            </div>
            <div className="sm:w-2/3 p-6">
              <h3 className="text-xl font-bold">David Chen</h3>
              <p className="text-blue-400 mb-3">CTO</p>
              <p className="text-gray-300">With a PhD in Computer Science and previous experience at major tech companies, David leads our technology team, focusing on creating intelligent algorithms that power our personalized shopping experience.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Join Us CTA */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl p-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Journey</h2>
        <p className="text-lg text-gray-200 mb-6 max-w-2xl mx-auto">
          We're always looking for passionate individuals to join our team and help shape the future of fashion technology.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/contact" 
            className="bg-white text-blue-900 hover:bg-gray-200 px-6 py-3 rounded-md font-medium transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;