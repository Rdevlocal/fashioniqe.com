"use server";

import { connectDB } from "@/libs/mongodb";
import mongoose from "mongoose";

// This function retrieves all products from your database as they are
export const getAllProducts = async () => {
  try {
    await connectDB();
    
    // Use the MongoDB collection directly
    const db = mongoose.connection.db;
    const productsCollection = db.collection('products');
    
    // Retrieve all products
    const products = await productsCollection.find({}).toArray();
    
    console.log(`${products.length} products retrieved`);
    return products;
  } catch (error) {
    console.error("Error getting products:", error);
    return [];
  }
};

export const getCategoryProducts = async (category: string) => {
  try {
    await connectDB();
    
    const db = mongoose.connection.db;
    const productsCollection = db.collection('products');
    
    // Find products with the given category (if the field exists)
    // We try different possible field names for the category
    const products = await productsCollection.find({
      $or: [
        { categoryName: category },
        { category: category }, 
        { productCategory: category }
      ]
    }).toArray();
    
    return products;
  } catch (error) {
    console.error("Error getting category products:", error);
    return [];
  }
};

export const getRandomProducts = async (productId: string) => {
  try {
    await connectDB();
    
    const db = mongoose.connection.db;
    const productsCollection = db.collection('products');
    
    // Retrieve all products
    const allProducts = await productsCollection.find({}).toArray();
    
    // Shuffle and filter (remove the specified product)
    let randomProducts = [...allProducts];
    
    // Filter out the current product if possible
    if (productId) {
      try {
        // Try filtering by ObjectId first
        const objId = new mongoose.Types.ObjectId(productId);
        randomProducts = randomProducts.filter(p => 
          !p._id.equals(objId)
        );
      } catch (e) {
        // If it's not a valid ObjectId, filter by productId string
        randomProducts = randomProducts.filter(p => 
          p.productId !== productId
        );
      }
    }
    
    // Shuffle the products
    randomProducts.sort(() => 0.5 - Math.random());
    
    // Return the first 6 (or fewer if not enough are available)
    return randomProducts.slice(0, 6);
  } catch (error) {
    console.error("Error getting random products:", error);
    return [];
  }
};

export const getProduct = async (id: string) => {
  try {
    await connectDB();
    
    const db = mongoose.connection.db;
    const productsCollection = db.collection('products');
    
    // Probeer het product op verschillende manieren te vinden
    let product = null;
    
    // Eerst proberen als ObjectId
    try {
      const objId = new mongoose.Types.ObjectId(id);
      product = await productsCollection.findOne({ _id: objId });
    } catch (e) {
      // Geen geldige ObjectId, negeer de fout
    }
    
    // Als niet gevonden, probeer als productId
    if (!product) {
      product = await productsCollection.findOne({ productId: id });
    }
    
    // Als nog niet gevonden, probeer andere potentiële ID velden
    if (!product) {
      product = await productsCollection.findOne({ 
        $or: [
          { id: id },
          { SKU: id },
          { sku: id }
        ]
      });
    }
    
    return product;
  } catch (error) {
    console.error("Error getting product:", error);
    return null;
  }
};