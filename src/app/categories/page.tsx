// src/app/categories/page.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { connectDB } from "@/libs/mongodb";
import mongoose from "mongoose";

// Types for better type safety
interface Category {
  name: string;
  slug: string;
  image?: string;
  count?: number;
}

interface CategoriesData {
  men: Category[];
  women: Category[];
}

// Metadata for the page
export const metadata = {
  title: "All Categories | Fashioniqe",
  description: "Browse all fashion categories in our collection",
};

// Category Card Component
const CategoryCard: React.FC<{ category: Category }> = ({ category }) => {
  const { name, slug, image, count = 0 } = category;
  
  return (
    <Link href={`/${slug}`} className="group">
      <div className="border border-[#2E2E2E] rounded-lg overflow-hidden transition-all duration-300 hover:border-[#454545] hover:shadow-md">
        <div className="relative h-60 bg-gray-900">
          <Image
            src={image || "/placeholder.jpg"}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-4">
              <h3 className="text-xl font-medium text-white">{name}</h3>
              <p className="text-sm text-gray-300 mt-1">
                {count > 0 ? `${count} products` : "Browse collection"}
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-[#0A0A0A]">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">View collection</span>
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all"
            >
              <path 
                d="M1 8H15M15 8L8 1M15 8L8 15" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Fetch categories from database
async function fetchCategoriesFromDB(): Promise<CategoriesData> {
  try {
    await connectDB();
    
    // Get MongoDB connection
    const db = mongoose.connection.db;
    
    // Initialize default categories
    let categories: CategoriesData = { men: [], women: [] };
    
    // Try to find the categories collection
    const collections = await db.listCollections({ name: "categories" }).toArray();
    
    if (collections.length > 0) {
      const categoriesCollection = db.collection("categories");
      
      // Possible document IDs to check
      const possibleIds = [
        new mongoose.Types.ObjectId("000000000000000000000001"),
        new mongoose.Types.ObjectId("000000000000000000000002"),
        new mongoose.Types.ObjectId("64b8f3f2f2f2f2f2f2f2f2f2"),
        "main"
      ];
      
      let dbCategories = null;
      
      // Try each possible ID until we find categories
      for (const id of possibleIds) {
        const query = typeof id === 'string' 
          ? { _id: id } 
          : { _id: id };
        
        dbCategories = await categoriesCollection.findOne(query);
        if (dbCategories?.data) {
          categories = dbCategories.data;
          break;
        }
      }
      
      // If nothing found with specific IDs, try to get the first document
      if (!dbCategories?.data) {
        dbCategories = await categoriesCollection.findOne({});
        if (dbCategories?.data) {
          categories = dbCategories.data;
        }
      }
      
      // Get product counts for categories
      if ((categories.men.length > 0 || categories.women.length > 0)) {
        const productsCollection = db.collection("products");
        const products = await productsCollection.find({}).toArray();
        
        if (products.length > 0) {
          // Add counts to men's categories
          categories.men = categories.men.map(category => {
            const categoryName = category.slug.replace('men/', '');
            const count = products.filter(p => 
              (p.categoryName === categoryName || p.category === categoryName) && 
              (p.gender === 'men' || p.gender === 'male' || !p.gender)
            ).length;
            
            return { ...category, count };
          });
          
          // Add counts to women's categories
          categories.women = categories.women.map(category => {
            const categoryName = category.slug.replace('women/', '');
            const count = products.filter(p => 
              (p.categoryName === categoryName || p.category === categoryName) && 
              (p.gender === 'women' || p.gender === 'female' || !p.gender)
            ).length;
            
            return { ...category, count };
          });
        }
      }
    }
    
    return categories;
  } catch (error) {
    console.error("Error fetching categories from database:", error);
    return { men: [], women: [] };
  }
}

// Category Overview Component (data fetching)
const CategoryOverview = async () => {
  const categories = await fetchCategoriesFromDB();
  
  return (
    <div className="space-y-16">
      {/* Men's Categories */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <span className="mr-2">Men's Collections</span>
          <span className="text-sm font-normal text-gray-400">
            ({categories.men?.length || 0} categories)
          </span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.men?.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </div>
      
      {/* Women's Categories */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <span className="mr-2">Women's Collections</span>
          <span className="text-sm font-normal text-gray-400">
            ({categories.women?.length || 0} categories)
          </span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.women?.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Categories Page Component
const CategoriesPage = async () => {
  return (
    <section className="pt-14">
      <h1 className="text-3xl font-bold mb-8">All Categories</h1>
      
      <Suspense fallback={
        <div className="h-screen flex items-center justify-center">
          Loading categories...
        </div>
      }>
        <CategoryOverview />
      </Suspense>
    </section>
  );
};

export default CategoriesPage;