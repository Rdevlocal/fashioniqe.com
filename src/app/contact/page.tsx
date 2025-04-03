// src/app/contact/page.tsx
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | FashionIQe',
  description: 'Get in touch with the FashionIQe team for questions, feedback, or support.',
};

const ContactPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Have questions, feedback, or need support? We're here to help you with anything related to your FashionIQe experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-[#0A0A0A] border border-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 bg-[#0F0F0F] border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 bg-[#0F0F0F] border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full p-3 bg-[#0F0F0F] border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="How can we help you?"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full p-3 bg-[#0F0F0F] border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your message here..."
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
        
        {/* Contact Information */}
        <div className="space-y-8">
          <div className="bg-[#0A0A0A] border border-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-500 p-2 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Phone Support</h3>
                  <p className="mt-1 text-gray-400">Mon-Fri, 9am-5pm CET</p>
                  <p className="mt-2 text-blue-400 font-medium">+31 (0) 20 123 4567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-500 p-2 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Email</h3>
                  <p className="mt-1 text-gray-400">We'll respond within 24 hours</p>
                  <p className="mt-2 text-blue-400 font-medium">support@fashioniqe.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-500 p-2 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Office</h3>
                  <p className="mt-1 text-gray-400">Amsterdam, Netherlands</p>
                  <p className="mt-2 text-gray-400">
                    Herengracht 595<br />
                    1017 CE Amsterdam<br />
                    The Netherlands
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#0A0A0A] border border-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">FAQ</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-white">What payment methods do you accept?</h3>
                <p className="mt-1 text-gray-400">We accept all major credit cards, PayPal, Apple Pay, and Google Pay.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white">How long does shipping take?</h3>
                <p className="mt-1 text-gray-400">Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days delivery.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white">What is your return policy?</h3>
                <p className="mt-1 text-gray-400">We offer a 30-day return policy for all unworn items with original tags attached.</p>
              </div>
              
              <a href="/faq" className="block mt-6 text-blue-400 hover:underline">
                View all FAQs →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;