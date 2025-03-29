"use server";

import { connectDB } from "@/libs/mongodb";
import mongoose from "mongoose";

// Deze functie haalt producten op uit je database zoals ze zijn
export const getAllProducts = async () => {
  try {
    await connectDB();
    
    // Gebruik direct de MongoDB collectie
    const db = mongoose.connection.db;
    const productsCollection = db.collection('products');
    
    // Haal alle producten op
    const products = await productsCollection.find({}).toArray();
    
    console.log(`${products.length} producten opgehaald`);
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
    
    // Zoek producten met de gegeven categorie (als het veld bestaat)
    // We proberen verschillende mogelijke veldnamen voor categorie
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
    
    // Haal alle producten op
    const allProducts = await productsCollection.find({}).toArray();
    
    // Shuffle en filter (verwijder het opgegeven product)
    let randomProducts = [...allProducts];
    
    // Filter het huidige product uit indien mogelijk
    if (productId) {
      try {
        // Probeer eerst te filteren op ObjectId
        const objId = new mongoose.Types.ObjectId(productId);
        randomProducts = randomProducts.filter(p => 
          !p._id.equals(objId)
        );
      } catch (e) {
        // Als het geen geldig ObjectId is, filter op productId string
        randomProducts = randomProducts.filter(p => 
          p.productId !== productId
        );
      }
    }
    
    // Shuffle de producten
    randomProducts.sort(() => 0.5 - Math.random());
    
    // Return de eerste 6 (of minder als er niet genoeg zijn)
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