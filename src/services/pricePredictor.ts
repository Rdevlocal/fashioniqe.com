// src/services/pricePredictor.ts - Service voor prijsvoorspellingen

import mongoose from "mongoose";
import { connectDB } from "@/libs/mongodb";

// Base interfaces for price data
interface PricePoint {
  price: number;
  date: Date;
}

// Interface for prediction results
interface PricePrediction {
  // Main prediction
  predictedPrice: number;
  confidence: number; // 0-100% reliability
  
  // Discount prediction
  predictedDiscountDate: Date | null;
  predictedDiscountPercentage: number | null;
  
  // Trend analysis
  seasonalTrend: 'rising' | 'falling' | 'stable';
  
  // Data for chart
  historicalPrices: PricePoint[];
  predictedPrices: PricePoint[];
  
  // Buying advice
  bestTimeToBuy: Date | null;
  lowestPredictedPrice: number | null;
}

/**
 * PricePredictor - Service for predicting price trends and discounts
 */
export class PricePredictor {
  
  /**
   * Creates a price prediction for a product
   * @param productId ID of the product
   */
  public static async predictPrice(productId: string): Promise<PricePrediction> {
    try {
      // Step 1: Get historical price data
      const priceHistory = await this.getHistoricalPrices(productId);
      
      // Step 2: Get current price
      const currentPrice = await this.fetchCurrentProductPrice(productId);
      
      // Step 3: Determine seasonal trend
      const seasonalTrend = this.analyzeSeasonal(priceHistory);
      
      // Step 4: Predict future prices
      const futurePrices = this.predictFuturePrices(priceHistory, currentPrice);
      
      // Step 5: Determine when the product is likely to go on sale
      const { date: discountDate, percentage: discountPercentage } = 
        this.predictDiscountDate(priceHistory, futurePrices);
      
      // Step 6: Determine the best time to buy
      const { date: bestBuyDate, price: lowestPrice } = 
        this.determineBestTimeToBuy(futurePrices);
      
      // Step 7: Calculate confidence score
      const confidence = priceHistory.length > 10 ? 75 : 60;
      
      // Return prediction result
      return {
        predictedPrice: futurePrices.length > 0 ? futurePrices[0].price : currentPrice,
        confidence,
        predictedDiscountDate: discountDate,
        predictedDiscountPercentage: discountPercentage,
        seasonalTrend,
        historicalPrices: priceHistory,
        predictedPrices: futurePrices,
        bestTimeToBuy: bestBuyDate,
        lowestPredictedPrice: lowestPrice
      };
    } catch (error) {
      console.error("Error in price prediction:", error);
      
      // Return fallback prediction on errors
      return {
        predictedPrice: 0,
        confidence: 0,
        predictedDiscountDate: null,
        predictedDiscountPercentage: null,
        seasonalTrend: 'stable',
        historicalPrices: [],
        predictedPrices: [],
        bestTimeToBuy: null,
        lowestPredictedPrice: null
      };
    }
  }

  /**
   * Gets historical price data for a product
   */
  private static async getHistoricalPrices(productId: string): Promise<PricePoint[]> {
    await connectDB();
    
    try {
      // Get MongoDB database
      const db = mongoose.connection.db;
      
      // Check if collection exists
      const collections = await db.listCollections({ name: "price_history" }).toArray();
      if (collections.length === 0) {
        // No historical data available, generate test data
        return this.generateDummyPriceHistory(productId);
      }
      
      // Get historical prices from database
      const priceCollection = db.collection("price_history");
      const priceHistory = await priceCollection.findOne({ productId });
      
      // If no data found, generate test data
      if (!priceHistory || !priceHistory.prices || priceHistory.prices.length === 0) {
        return this.generateDummyPriceHistory(productId);
      }
      
      // Transform to PricePoint interface
      return priceHistory.prices.map((entry: any) => ({
        price: entry.price,
        date: new Date(entry.date)
      }));
    } catch (error) {
      console.error("Error fetching price history:", error);
      return this.generateDummyPriceHistory(productId);
    }
  }

  /**
   * Generates realistic test data for price history
   */
  private static async generateDummyPriceHistory(productId: string): Promise<PricePoint[]> {
    // Get current price
    const currentPrice = await this.fetchCurrentProductPrice(productId);
    const today = new Date();
    const priceHistory: PricePoint[] = [];
    
    // Generate price data for past 6 months
    for (let i = 180; i >= 0; i -= 15) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      // Factors affecting price
      const seasonalFactor = Math.sin((date.getMonth() + 6) / 12 * Math.PI * 2);
      const randomFactor = 0.1 * (Math.random() - 0.5);
      const marketFactor = Math.cos(i / 30) * 0.05;
      
      // Calculate price with seasonal factors
      let price = currentPrice * (1 + seasonalFactor * 0.15 + randomFactor + marketFactor);
      
      // Add discount in typical sale seasons
      if ((date.getMonth() === 11 || date.getMonth() === 5) && date.getDate() < 15) {
        price *= 0.8 + Math.random() * 0.1; // 10-20% discount
      }
      
      // Add to history
      priceHistory.push({
        price: Math.round(price * 100) / 100, // Round to two decimals
        date: new Date(date)
      });
    }
    
    return priceHistory;
  }
  
  /**
   * Gets the current price of a product
   */
  private static async fetchCurrentProductPrice(productId: string): Promise<number> {
    await connectDB();
    
    try {
      const db = mongoose.connection.db;
      const productsCollection = db.collection('products');
      
      // Try to find the product in different ways
      let product = null;
      
      // 1. Search via ObjectId
      try {
        const objId = new mongoose.Types.ObjectId(productId);
        product = await productsCollection.findOne({ _id: objId });
      } catch (e) {
        // Not a valid ObjectId, ignore error
      }
      
      // 2. Search via productId field
      if (!product) {
        product = await productsCollection.findOne({ productId: productId });
      }
      
      // 3. Search via other ID fields
      if (!product) {
        product = await productsCollection.findOne({ 
          $or: [
            { id: productId },
            { SKU: productId },
            { sku: productId }
          ]
        });
      }
      
      if (!product) {
        return 99.99; // Default price if product not found
      }
      
      return product.price || 99.99;
    } catch (error) {
      console.error("Error fetching product price:", error);
      return 99.99; // Fallback price on errors
    }
  }
  
  /**
   * Analyzes price trend (rising, falling or stable)
   */
  private static analyzeSeasonal(priceHistory: PricePoint[]): 'rising' | 'falling' | 'stable' {
    if (!priceHistory || priceHistory.length < 2) {
      return 'stable';
    }
    
    // Look at last 5 price points
    const recentPrices = priceHistory.slice(-5);
    
    let increasingCount = 0;
    let decreasingCount = 0;
    
    // Count how often price rises and falls
    for (let i = 1; i < recentPrices.length; i++) {
      if (recentPrices[i].price > recentPrices[i-1].price) {
        increasingCount++;
      } else if (recentPrices[i].price < recentPrices[i-1].price) {
        decreasingCount++;
      }
    }
    
    // Determine trend based on number of rises and falls
    if (increasingCount > decreasingCount) return 'rising';
    if (decreasingCount > increasingCount) return 'falling';
    return 'stable';
  }
  
  /**
   * Predicts future prices for next 90 days
   */
  private static predictFuturePrices(priceHistory: PricePoint[], currentPrice: number): PricePoint[] {
    if (!priceHistory || priceHistory.length < 2) {
      return [];
    }
    
    const today = new Date();
    const predictions: PricePoint[] = [];
    
    // Use recent price data (last 6 months)
    const recentPrices = priceHistory.slice(-12);
    
    // Calculate average price change
    let totalChange = 0;
    for (let i = 1; i < recentPrices.length; i++) {
      totalChange += (recentPrices[i].price - recentPrices[i-1].price) / recentPrices[i-1].price;
    }
    
    const avgMonthlyChange = totalChange / (recentPrices.length - 1);
    
    // Sale seasons (month numbers)
    const holidaySeasons = [10, 11, 5, 6]; // Nov, Dec, Jun, Jul
    
    // Predict prices for every 15 days
    let lastPrice = currentPrice;
    
    for (let i = 15; i <= 90; i += 15) {
      const predictionDate = new Date(today);
      predictionDate.setDate(today.getDate() + i);
      
      const month = predictionDate.getMonth();
      
      // Base trend based on historical change
      let predictedChange = avgMonthlyChange / 2; // Half monthly
      
      // Adjust for seasonal effects
      if (holidaySeasons.includes(month)) {
        // Discount in holiday season
        predictedChange -= 0.05; // 5% price decrease
      } else if ([1, 7].includes(month)) {
        // Price increase after sale seasons
        predictedChange += 0.03; // 3% price increase
      }
      
      // Calculate predicted price
      lastPrice = lastPrice * (1 + predictedChange);
      
      // Round to two decimals
      const roundedPrice = Math.round(lastPrice * 100) / 100;
      
      predictions.push({
        date: predictionDate,
        price: roundedPrice
      });
    }
    
    return predictions;
  }
  
  /**
   * Predicts when a product will go on sale
   */
  private static predictDiscountDate(priceHistory: PricePoint[], futurePrices: PricePoint[]): {date: Date | null, percentage: number | null} {
    if (!futurePrices || futurePrices.length === 0) {
      return {date: null, percentage: null};
    }
    
    // Look for largest expected price drop
    let maxDiscount = 0;
    let discountDate = null;
    let discountPercentage = null;
    
    for (let i = 1; i < futurePrices.length; i++) {
      const priceChange = futurePrices[i-1].price - futurePrices[i].price;
      const percentageChange = priceChange / futurePrices[i-1].price;
      
      // Detect significant discount (>5%)
      if (percentageChange > 0.05 && percentageChange > maxDiscount) {
        maxDiscount = percentageChange;
        discountDate = futurePrices[i].date;
        discountPercentage = Math.round(percentageChange * 100);
      }
    }
    
    // If we don't find a clear discount, look at seasonal patterns
    if (!discountDate) {
      const today = new Date();
      const currentMonth = today.getMonth();
      
      // Determine next sale period
      let nextSaleMonth;
      
      if (currentMonth < 5) {
        nextSaleMonth = 5; // Summer sale (June)
      } else if (currentMonth < 10) {
        nextSaleMonth = 10; // Winter sale (November)
      } else {
        nextSaleMonth = 5; // Summer sale next year
      }
      
      const nextSaleDate = new Date(today.getFullYear() + (nextSaleMonth < currentMonth ? 1 : 0), nextSaleMonth, 15);
      
      return {
        date: nextSaleDate,
        percentage: 15 // Average discount percentage
      };
    }
    
    return {
      date: discountDate,
      percentage: discountPercentage
    };
  }
  
  /**
   * Determines the best time to buy based on predicted prices
   */
  private static determineBestTimeToBuy(futurePrices: PricePoint[]): {date: Date | null, price: number | null} {
    if (!futurePrices || futurePrices.length === 0) {
      return {date: null, price: null};
    }
    
    // Find moment with lowest predicted price
    let lowestPriceEntry = futurePrices.reduce((lowest, current) => 
      current.price < lowest.price ? current : lowest, futurePrices[0]);
    
    return {
      date: lowestPriceEntry.date,
      price: lowestPriceEntry.price
    };
  }
}