import { connectDB } from "@/libs/mongodb";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
  try {
    await connectDB();
    
    // Get MongoDB connection
    const db = mongoose.connection.db;
    
    // Try to find a categories collection
    const collections = await db.listCollections({ name: "categories" }).toArray();
    
    // Define our fallback data in case we can't find categories in the database
    let categories = {
      men: [
        { name: "T-shirts", slug: "men/t-shirts", image: "/placeholder.jpg" },
        { name: "Pants", slug: "men/pants", image: "/placeholder.jpg" },
        { name: "Shirts", slug: "men/shirts", image: "/placeholder.jpg" },
        { name: "Jackets", slug: "men/jackets", image: "/placeholder.jpg" },
        { name: "Shoes", slug: "men/shoes", image: "/placeholder.jpg" },
        { name: "Accessories", slug: "men/accessories", image: "/placeholder.jpg" }
      ],
      women: [
        { name: "T-shirts", slug: "women/t-shirts", image: "/placeholder.jpg" },
        { name: "Pants", slug: "women/pants", image: "/placeholder.jpg" },
        { name: "Dresses", slug: "women/dresses", image: "/placeholder.jpg" },
        { name: "Skirts", slug: "women/skirts", image: "/placeholder.jpg" },
        { name: "Shoes", slug: "women/shoes", image: "/placeholder.jpg" },
        { name: "Accessories", slug: "women/accessories", image: "/placeholder.jpg" }
      ]
    };
    
    // If we have a categories collection, try to retrieve the data
    if (collections.length > 0) {
      const categoriesCollection = db.collection("categories");
      const dbCategories = await categoriesCollection.findOne({ _id: new mongoose.Types.ObjectId("000000000000000000000001") });
      
      if (dbCategories) {
        categories = dbCategories.data;
      } else {
        // If we don't have categories yet, let's create them with our fallback data
        await categoriesCollection.insertOne({
          _id: new mongoose.Types.ObjectId("000000000000000000000001"),
          data: categories
        });
      }
    } else {
      // Create the categories collection and insert our fallback data
      await db.createCollection("categories");
      const categoriesCollection = db.collection("categories");
      await categoriesCollection.insertOne({
        _id: new mongoose.Types.ObjectId("000000000000000000000002"),
        data: categories
      });
    }
    
    // Get all products to analyze which categories actually have products
    const productsCollection = db.collection("products");
    const products = await productsCollection.find({}).toArray();
    
    // Count products in each category to add count to our response
    if (products.length > 0) {
      // Process men's categories
      categories.men = categories.men.map(category => {
        const count = products.filter(p => 
          p.categoryName === category.slug.replace('men/', '') && 
          p.gender === 'men'
        ).length;
        
        return { ...category, count };
      });
      
      // Process women's categories
      categories.women = categories.women.map(category => {
        const count = products.filter(p => 
          p.categoryName === category.slug.replace('women/', '') && 
          p.gender === 'women'
        ).length;
        
        return { ...category, count };
      });
    }
    
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}