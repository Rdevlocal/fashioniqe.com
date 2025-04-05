"use server";

import { connectDB } from "@/libs/mongodb";
import mongoose from "mongoose";

// Utility functie voor veilige conversie van MongoDB documenten
function safeConvertToPlainObject(doc: any): any {
  if (doc === null || doc === undefined) return null;

  // Als het een array is, converteer elk item
  if (Array.isArray(doc)) {
    return doc.map(item => safeConvertToPlainObject(item));
  }
  
  // Als het een object is
  if (typeof doc === 'object') {
    const plainObject: any = {};
    
    for (const key in doc) {
      if (Object.prototype.hasOwnProperty.call(doc, key)) {
        // Skip functies en private properties
        if (typeof doc[key] !== 'function' && !key.startsWith('_')) {
          // Speciale behandeling voor ObjectId
          if (doc[key] instanceof mongoose.Types.ObjectId) {
            plainObject[key] = doc[key].toString();
          } else if (doc[key] instanceof Date) {
            plainObject[key] = doc[key].toISOString();
          } else if (doc[key] && typeof doc[key] === 'object') {
            // Recursieve conversie voor geneste objecten
            plainObject[key] = safeConvertToPlainObject(doc[key]);
          } else {
            plainObject[key] = doc[key];
          }
        }
      }
    }
    
    return plainObject;
  }
  
  // Primitieve waarden teruggeven
  return doc;
}

// Interface voor flexibele zoekcriteria
interface ProductSearchCriteria {
  _id?: mongoose.Types.ObjectId | string;
  productId?: string;
  category?: string;
  categoryName?: string;
  merchantCategory?: string;
  aw_product_id?: string;
  gender?: string;
}

// Hulpfunctie voor het voorbereiden van zoekcriteria
function prepareSearchCriteria(id: string): ProductSearchCriteria[] {
  const searchCriteria: ProductSearchCriteria[] = [];

  // Probeer verschillende ID-formaten
  try {
    // Probeer als MongoDB ObjectId
    const objectId = new mongoose.Types.ObjectId(id);
    searchCriteria.push({ _id: objectId });
  } catch {
    // Als geen geldige ObjectId, voeg andere zoekmethoden toe
    searchCriteria.push(
      { productId: id },
      { aw_product_id: id },
      { SKU : id },
      { sku: id }
    );
  }

  return searchCriteria;
}

// Uitgebreide product ophaalmethode
export const getProduct = async (id: string) => {
  if (!id) {
    console.warn("Geen product-ID opgegeven");
    return null;
  }

  try {
    await connectDB();
    
    const db = mongoose.connection.db;
    const productsCollection = db.collection('products');
    
    // Bereid zoekcriteria voor
    const searchCriteria = prepareSearchCriteria(id);
    
    // Zoek het product met de verschillende criteria
    let product = null;
    for (const criteria of searchCriteria) {
      product = await productsCollection.findOne(criteria as mongoose.FilterQuery<mongoose.Document>);
      if (product) break;
    }
    
    // Product niet gevonden
    if (!product) {
      console.warn(`Geen product gevonden voor ID: ${id}`);
      return null;
    }
    
    // Converteer en retourneer product
    return safeConvertToPlainObject(product);
  } catch (error) {
    console.error("Fout bij ophalen product:", error);
    return null;
  }
};

// Haal alle producten op met uitgebreide filtering
export const getAllProducts = async (filters: any = {}) => {
  try {
    await connectDB();
    
    const db = mongoose.connection.db;
    const productsCollection = db.collection('products');
    
    // Standaard zoekopties met mogelijkheid tot filtering
    const searchOptions: any = {};
    
    // Voorbereiden van filters
    if (filters.category) {
      searchOptions.$or = [
        { category: filters.category },
        { categoryName: filters.category }
      ];
    }
    
    if (filters.gender) {
      searchOptions.gender = filters.gender;
    }
    
    if (filters.minPrice || filters.maxPrice) {
      searchOptions.price = {};
      if (filters.minPrice) searchOptions.price.$gte = filters.minPrice;
      if (filters.maxPrice) searchOptions.price.$lte = filters.maxPrice;
    }
    
    // Verzamel producten met mogelijke filtering
    const products = await productsCollection.find(searchOptions).toArray();
    
    console.log(`${products.length} producten opgehaald`);
    
    return safeConvertToPlainObject(products);
  } catch (error) {
    console.error("Fout bij ophalen producten:", error);
    return [];
  }
};

// Haal producten op per categorie met uitgebreide opties
export const getCategoryProducts = async (
  category: string, 
  options: { 
    limit?: number, 
    gender?: string, 
    minPrice?: number, 
    maxPrice?: number 
  } = {}
) => {
  try {
    await connectDB();
    
    const db = mongoose.connection.db;
    const productsCollection = db.collection('products');
    
    // Uitgebreide zoekcriteria
    const searchCriteria: any = {
      $or: [
        { categoryName: category },
        { category: category },
        { productCategory: category },
        { merchant_category: category }
      ]
    };
    
    // Optionele gender filter
    if (options.gender) {
      searchCriteria.gender = options.gender;
    }
    
    // Optionele prijs filter
    if (options.minPrice || options.maxPrice) {
      searchCriteria.price = {};
      if (options.minPrice) searchCriteria.price.$gte = options.minPrice;
      if (options.maxPrice) searchCriteria.price.$lte = options.maxPrice;
    }
    
    // Verzamel producten
    let query = productsCollection.find(searchCriteria);
    
    // Optionele limiet
    if (options.limit) {
      query = query.limit(options.limit);
    }
    
    const products = await query.toArray();
    
    return safeConvertToPlainObject(products);
  } catch (error) {
    console.error("Fout bij ophalen categorie producten:", error);
    return [];
  }
};

// Haal willekeurige producten op met geavanceerde filtering
export const getRandomProducts = async (
  productId?: string, 
  options: { 
    limit?: number, 
    category?: string, 
    gender?: string 
  } = {}
) => {
  try {
    await connectDB();
    
    const db = mongoose.connection.db;
    const productsCollection = db.collection('products');
    
    // Basis zoekopties
    const searchOptions: any = {};
    
    // Optionele categorie filter
    if (options.category) {
      searchOptions.$or = [
        { category: options.category },
        { categoryName: options.category }
      ];
    }
    
    // Optionele gender filter
    if (options.gender) {
      searchOptions.gender = options.gender;
    }
    
    // Haal alle producten op met mogelijke filtering
    const allProducts = await productsCollection.find(searchOptions).toArray();
    
    // Filter het huidige product eruit als dat mogelijk is
    let randomProducts = productId 
      ? allProducts.filter(p => {
          try {
            // Probeer te filteren als ObjectId
            const objId = new mongoose.Types.ObjectId(productId);
            return !p._id.equals(objId);
          } catch {
            // Als geen geldige ObjectId, gebruik andere methoden
            return p.productId !== productId && 
                   p.aw_product_id !== productId;
          }
        })
      : allProducts;
    
    // Willekeurig sorteren
    randomProducts.sort(() => 0.5 - Math.random());
    
    // Beperk het aantal producten
    const limitedProducts = randomProducts.slice(
      0, 
      options.limit || 6  // Standaard 6 producten
    );
    
    return safeConvertToPlainObject(limitedProducts);
  } catch (error) {
    console.error("Fout bij ophalen willekeurige producten:", error);
    return [];
  }
};