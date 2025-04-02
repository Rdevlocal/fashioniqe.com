// src/app/about/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

// Define metadata for SEO
export const metadata: Metadata = {
  title: 'About Us | FashionIQe',
  description: 'Learn more about FashionIQe, our story, mission, and the team behind our fashion platform.',
};

// Team member interface
interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

// Company value interface
interface CompanyValue {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const AboutPage = () => {
  // Team members data
  const teamMembers: TeamMember[] = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: '/team/sarah-johnson.jpg',
      bio: 'Sarah founded FashionIQe with a vision to create a more intelligent shopping experience. With over 15 years in the fashion industry and a background in tech, she combines style expertise with cutting-edge innovation.'
    },
    {
      name: 'David Chen',
      role: 'CTO',
      image: '/team/david-chen.jpg',
      bio: 'With a PhD in Computer Science and previous experience at major tech companies, David leads our technology team, focusing on creating intelligent algorithms that power our personalized shopping experience.'
    },
    {
      name: 'Maria Rodriguez',
      role: 'Creative Director',
      image: '/team/maria-rodriguez.jpg',
      bio: 'Maria brings 12 years of experience from luxury fashion brands. She oversees our creative vision, ensuring that innovation always meets aesthetics throughout the FashionIQe experience.'
    },
    {
      name: 'James Wilson',
      role: 'Head of Sustainability',
      image: '/team/james-wilson.jpg',
      bio: 'James leads our sustainability initiatives, working to reduce our environmental footprint and build partnerships with ethical manufacturers. He holds an MSc in Environmental Management.'
    }
  ];

  // Company values data
  const companyValues: CompanyValue[] = [
    {
      title: 'Innovation',
      description: 'We push boundaries and embrace new technologies to revolutionize the fashion shopping experience.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: 'Sustainability',
      description: 'We're committed to promoting sustainable fashion and reducing environmental impact across our platform.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Inclusivity',
      description: 'We believe that fashion is for everyone, and we strive to create a platform that celebrates diversity.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      title: 'Quality',
      description: 'We curate products with attention to craftsmanship, materials, and durability to ensure customer satisfaction.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About FashionIQe</h1>
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
              FashionIQe was founded in 2020 with a simple mission: to make online fashion shopping smarter, more personalized, and more transparent.
            </p>
            <p>
              Our founder, Sarah Johnson, experienced firsthand the frustration of tracking prices manually across multiple sites, missing sales on items she loved, and receiving generic recommendations that didn't match her style.
            </p>
            <p>
              What began as a small startup has evolved into a comprehensive fashion platform that combines AI-powered recommendations, price history analytics, and trend forecasting to provide a truly intelligent shopping experience.
            </p>
            <p>
              Today, we partner with hundreds of brands and retailers to bring our users the best selection of fashion items, complete with the tools and insights they need to make confident purchasing decisions.
            </p>
          </div>
        </div>
        <div className="md:w-1/2 relative h-96 rounded-lg overflow-hidden">
          <Image 
            src="/about/our-story.jpg" 
            alt="FashionIQe team working"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Our Values Section */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {companyValues.map((value, index) => (
            <div key={index} className="bg-[#0A0A0A] border border-gray-800 rounded-lg p-6 flex flex-col items-center text-center">
              <div className="text-blue-500 mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold mb-2">{value.title}</h3>
              <p className="text-gray-400">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Meet the Team Section */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold mb-12 text-center">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col sm:flex-row bg-[#0A0A0A] border border-gray-800 rounded-lg overflow-hidden">
              <div className="sm:w-1/3 relative h-60 sm:h-auto">
                <Image 
                  src={member.image} 
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="sm:w-2/3 p-6">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-blue-400 mb-3">{member.role}</p>
                <p className="text-gray-300">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones Section */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Journey</h2>
        <div className="space-y-12">
          <div className="flex">
            <div className="flex flex-col items-center mr-4">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <div className="w-0.5 h-full bg-gray-700"></div>
            </div>
            <div>
              <div className="bg-[#0A0A0A] border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-1">2020</h3>
                <p className="text-blue-400 mb-4">The Beginning</p>
                <p className="text-gray-300">FashionIQe was founded in Amsterdam with a team of just 5 people, focused on creating a price tracking tool for fashion items.</p>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col items-center mr-4">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <div className="w-0.5 h-full bg-gray-700"></div>
            </div>
            <div>
              <div className="bg-[#0A0A0A] border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-1">2021</h3>
                <p className="text-blue-400 mb-4">Growth & Development</p>
                <p className="text-gray-300">We expanded our team to 25 members and launched our AI-powered recommendation engine, connecting with over 100 retail partners.</p>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col items-center mr-4">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <div className="w-0.5 h-full bg-gray-700"></div>
            </div>
            <div>
              <div className="bg-[#0A0A0A] border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-1">2022</h3>
                <p className="text-blue-400 mb-4">International Expansion</p>
                <p className="text-gray-300">FashionIQe expanded to 5 European markets and launched our mobile app, reaching 500,000 monthly active users.</p>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col items-center mr-4">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            </div>
            <div>
              <div className="bg-[#0A0A0A] border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-1">2023 - Present</h3>
                <p className="text-blue-400 mb-4">Innovation & Growth</p>
                <p className="text-gray-300">Today, we continue to innovate with advanced price prediction models, sustainable fashion initiatives, and partnerships with over 500 global brands.</p>
              </div>
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
          <Link 
            href="/careers" 
            className="bg-white text-blue-900 hover:bg-gray-200 px-6 py-3 rounded-md font-medium transition-colors"
          >
            View Open Positions
          </Link>
          <Link 
            href="/contact" 
            className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-medium transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;