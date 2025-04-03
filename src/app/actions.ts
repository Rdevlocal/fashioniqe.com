"use server";

import { connectDB } from "@/libs/mongodb";
import mongoose from "mongoose";

// Helper functie om ObjectId te converteren naar string
function convertToPlainObject(doc: any) {
  // Als het een array is, converteer elk item
  if (Array.isArray(doc)) {
    return doc.map(item => convertToPlainObject(item));
  }
  
  // Als het een object is (en geen null)
  if (doc && typeof doc === 'object' && doc !== null) {
    const plainObject: any = {};
    
    // Converteer elk veld in het object
    for (const key in doc) {
      // Skip functie-eigenschappen en methods
      if (typeof doc[key] !== 'function') {
        // Speciale behandeling voor ObjectId
        if (key === '_id' && doc[key] instanceof mongoose.Types.ObjectId) {
          plainObject[key] = doc[key].toString();
        } else {
          plainObject[key] = convertToPlainObject(doc[key]);
        }
      }
    }
    return plainObject;
  }
  
  // Return primitieve waardes zoals ze zijn
  return doc;
}

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
    
    // Belangrijk: converteer MongoDB documenten naar eenvoudige objecten
    const plainProducts = convertToPlainObject(products);
    
    return plainProducts;
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
        { productCategory: category },
        { merchant_category: category }
      ]
    }).toArray();
    
    // Belangrijk: converteer MongoDB documenten naar eenvoudige objecten
    return convertToPlainObject(products);
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
    
    // Filter current product (if applicable)
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
          p.productId !== productId && p.aw_product_id !== productId
        );
      }
    }
    
    // Shuffle the products
    randomProducts.sort(() => 0.5 - Math.random());
    
    // Return the first 6 (or fewer if not enough are available)
    const limitedProducts = randomProducts.slice(0, 6);
    
    // Belangrijk: converteer MongoDB documenten naar eenvoudige objecten
    return convertToPlainObject(limitedProducts);
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
    
    // Belangrijk: converteer MongoDB document naar eenvoudig object
    return convertToPlainObject(product);
  } catch (error) {
    console.error("Error getting product:", error);
    return null;
  }
};