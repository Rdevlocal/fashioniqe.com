"use server";

import { connectDB } from "@/libs/mongodb";
import mongoose from "mongoose";

/**
 * Converts MongoDB documents to plain JavaScript objects - simplified version
 */
function convertToPlainObject(data: any): any {
  // Handle null/undefined
  if (data == null) {
    return data;
  }
  
  // Handle arrays
  if (Array.isArray(data)) {
    return data.map(item => convertToPlainObject(item));
  }
  
  // Handle Date objects
  if (data instanceof Date) {
    return data.toISOString();
  }
  
  // Handle ObjectId directly
  if (data instanceof mongoose.Types.ObjectId) {
    return data.toString();
  }
  
  // Handle objects (including MongoDB documents)
  if (typeof data === 'object') {
    const result: Record<string, any> = {};
    
    for (const key in data) {
      // Skip functions
      if (typeof data[key] === 'function') continue;
      
      // Convert ObjectId fields
      if (data[key] instanceof mongoose.Types.ObjectId) {
        result[key] = data[key].toString();
      } 
      // For normal fields
      else {
        result[key] = convertToPlainObject(data[key]);
      }
    }
    
    return result;
  }
  
  // Return primitive values as is
  return data;
}

/**
 * Retrieves all products from the database
 */
export const getAllProducts = async () => {
  try {
    await connectDB();
    
    // Use the MongoDB collection directly
    const db = mongoose.connection.db;
    const productsCollection = db.collection('products');
    
    // Retrieve all products
    const products = await productsCollection.find({}).toArray();
    
    console.log(`${products.length} products retrieved`);
    
    // Convert MongoDB documents to plain objects using stringify/parse method
    // This is a simpler and more reliable way to ensure objects are plain
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Error getting products:", error);
    return [];
  }
};

/**
 * Retrieves products by category
 */
export const getCategoryProducts = async (category: string) => {
  try {
    await connectDB();
    
    const db = mongoose.connection.db;
    const productsCollection = db.collection('products');
    
    // Find products with the given category
    const products = await productsCollection.find({
      $or: [
        { categoryName: category },
        { category: category }, 
        { productCategory: category },
        { merchant_category: category }
      ]
    }).toArray();
    
    // Convert MongoDB documents to plain objects
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Error getting category products:", error);
    return [];
  }
};

/**
 * Retrieves random products, excluding the current product
 */
export const getRandomProducts = async (productId: string) => {
  try {
    await connectDB();
    
    const db = mongoose.connection.db;
    const productsCollection = db.collection('products');
    
    // Retrieve all products
    const allProducts = await productsCollection.find({}).toArray();
    
    // Filter current product
    let randomProducts = [...allProducts];
    
    // Filter out the current product
    if (productId) {
      try {
        // Try filtering by ObjectId
        const objId = new mongoose.Types.ObjectId(productId);
        randomProducts = randomProducts.filter(p => 
          !p._id.equals(objId)
        );
      } catch (e) {
        // If it's not a valid ObjectId, filter by productId string
        randomProducts = randomProducts.filter(p => 
          p.productId !== productId && p.aw_product_id !== productId
        );
      }
    }
    
    // Shuffle the products
    randomProducts.sort(() => 0.5 - Math.random());
    
    // Return the first 6 (or fewer if not enough are available)
    const limitedProducts = randomProducts.slice(0, 6);
    
    // Convert MongoDB documents to plain objects
    return JSON.parse(JSON.stringify(limitedProducts));
  } catch (error) {
    console.error("Error getting random products:", error);
    return [];
  }
};

/**
 * Retrieves a single product by ID
 */
export const getProduct = async (id: string) => {
  try {
    await connectDB();
    
    const db = mongoose.connection.db;
    const productsCollection = db.collection('products');
    
    // Try to find the product in different ways
    let product = null;
    
    // First try as ObjectId
    try {
      const objId = new mongoose.Types.ObjectId(id);
      product = await productsCollection.findOne({ _id: objId });
    } catch (e) {
      // Not a valid ObjectId, ignore the error
    }
    
    // If not found, try as productId
    if (!product) {
      product = await productsCollection.findOne({ 
        $or: [
          { productId: id },
          { aw_product_id: id }
        ] 
      });
    }
    
    // If still not found, try other possible ID fields
    if (!product) {
      product = await productsCollection.findOne({ 
        $or: [
          { id: id },
          { SKU: id },
          { sku: id }
        ]
      });
    }
    
    if (!product) {
      return null;
    }
    
    // Convert MongoDB document to plain object
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.error("Error getting product:", error);
    return null;
  }
};