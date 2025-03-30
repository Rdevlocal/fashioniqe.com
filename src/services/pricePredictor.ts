// src/services/pricePredictor.ts - Service voor prijsvoorspellingen

import mongoose from "mongoose";
import { connectDB } from "@/libs/mongodb";

// Basis interfaces voor prijsgegevens
interface PricePoint {
  price: number;
  date: Date;
}

// Interface voor de voorspellingsresultaten
interface PricePrediction {
  // Hoofdvoorspelling
  predictedPrice: number;
  confidence: number; // 0-100% betrouwbaarheid
  
  // Korting voorspelling
  predictedDiscountDate: Date | null;
  predictedDiscountPercentage: number | null;
  
  // Trend analyse
  seasonalTrend: 'rising' | 'falling' | 'stable';
  
  // Gegevens voor de grafiek
  historicalPrices: PricePoint[];
  predictedPrices: {date: Date, price: number}[];
  
  // Koopadvies
  bestTimeToBuy: Date | null;
  lowestPredictedPrice: number | null;
}

/**
 * PricePredictor - Service voor het voorspellen van prijstrends en kortingen
 */
export class PricePredictor {
  
  /**
   * Maakt een prijsvoorspelling voor een product
   * @param productId ID van het product
   */
  public static async predictPrice(productId: string): Promise<PricePrediction> {
    try {
      // Stap 1: Haal historische prijsgegevens op
      const priceHistory = await this.getHistoricalPrices(productId);
      
      // Stap 2: Haal huidige prijs op
      const currentPrice = await this.fetchCurrentProductPrice(productId);
      
      // Stap 3: Bepaal de seizoenstrend
      const seasonalTrend = this.analyzeSeasonal(priceHistory);
      
      // Stap 4: Voorspel toekomstige prijzen
      const futurePrices = this.predictFuturePrices(priceHistory, currentPrice);
      
      // Stap 5: Bepaal wanneer het product waarschijnlijk in de korting gaat
      const { date: discountDate, percentage: discountPercentage } = 
        this.predictDiscountDate(priceHistory, futurePrices);
      
      // Stap 6: Bepaal het beste moment om te kopen
      const { date: bestBuyDate, price: lowestPrice } = 
        this.determineBestTimeToBuy(futurePrices);
      
      // Stap 7: Bereken een betrouwbaarheidsscore
      const confidence = priceHistory.length > 10 ? 75 : 60;
      
      // Retourneer het voorspellingsresultaat
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
      
      // Retourneer een fallback-voorspelling bij fouten
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
   * Haalt historische prijsgegevens op voor een product
   */
  private static async getHistoricalPrices(productId: string): Promise<PricePoint[]> {
    await connectDB();
    
    try {
      // Haal de MongoDB database op
      const db = mongoose.connection.db;
      
      // Controleer of de collectie bestaat
      const collections = await db.listCollections({ name: "price_history" }).toArray();
      if (collections.length === 0) {
        // Geen historische data beschikbaar, genereer testdata
        return this.generateDummyPriceHistory(productId);
      }
      
      // Haal historische prijzen op uit de database
      const priceCollection = db.collection("price_history");
      const priceHistory = await priceCollection.findOne({ productId });
      
      // Als geen gegevens gevonden, genereer testdata
      if (!priceHistory || !priceHistory.prices || priceHistory.prices.length === 0) {
        return this.generateDummyPriceHistory(productId);
      }
      
      // Transformeer naar PricePoint interface
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
   * Genereert realistische testdata voor de prijshistorie
   */
  private static async generateDummyPriceHistory(productId: string): Promise<PricePoint[]> {
    // Vraag de huidige prijs op
    const currentPrice = await this.fetchCurrentProductPrice(productId);
    const today = new Date();
    const priceHistory: PricePoint[] = [];
    
    // Genereer prijsgegevens voor de afgelopen 6 maanden
    for (let i = 180; i >= 0; i -= 15) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      // Factoren die de prijs beïnvloeden
      const seasonalFactor = Math.sin((date.getMonth() + 6) / 12 * Math.PI * 2);
      const randomFactor = 0.1 * (Math.random() - 0.5);
      const marketFactor = Math.cos(i / 30) * 0.05;
      
      // Bereken prijs met seizoensgebonden factoren
      let price = currentPrice * (1 + seasonalFactor * 0.15 + randomFactor + marketFactor);
      
      // Voeg korting toe in typische saleseizoenen
      if ((date.getMonth() === 11 || date.getMonth() === 5) && date.getDate() < 15) {
        price *= 0.8 + Math.random() * 0.1; // 10-20% korting
      }
      
      // Voeg toe aan geschiedenis
      priceHistory.push({
        price: Math.round(price * 100) / 100, // Rond af op twee decimalen
        date: new Date(date)
      });
    }
    
    return priceHistory;
  }
  
  /**
   * Haalt de huidige prijs op van een product
   */
  private static async fetchCurrentProductPrice(productId: string): Promise<number> {
    await connectDB();
    
    try {
      const db = mongoose.connection.db;
      const productsCollection = db.collection('products');
      
      // Probeer het product op verschillende manieren te vinden
      let product = null;
      
      // 1. Zoek via ObjectId
      try {
        const objId = new mongoose.Types.ObjectId(productId);
        product = await productsCollection.findOne({ _id: objId });
      } catch (e) {
        // Geen geldige ObjectId, negeer de fout
      }
      
      // 2. Zoek via productId veld
      if (!product) {
        product = await productsCollection.findOne({ productId: productId });
      }
      
      // 3. Zoek via andere ID-velden
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
        return 99.99; // Standaardprijs als product niet gevonden
      }
      
      return product.price || 99.99;
    } catch (error) {
      console.error("Error fetching product price:", error);
      return 99.99; // Fallback prijs bij fouten
    }
  }
  
  /**
   * Analyseert de prijstrend (stijgend, dalend of stabiel)
   */
  private static analyzeSeasonal(priceHistory: PricePoint[]): 'rising' | 'falling' | 'stable' {
    if (!priceHistory || priceHistory.length < 2) {
      return 'stable';
    }
    
    // Bekijk de laatste 5 prijspunten
    const recentPrices = priceHistory.slice(-5);
    
    let increasingCount = 0;
    let decreasingCount = 0;
    
    // Tel hoe vaak de prijs stijgt en daalt
    for (let i = 1; i < recentPrices.length; i++) {
      if (recentPrices[i].price > recentPrices[i-1].price) {
        increasingCount++;
      } else if (recentPrices[i].price < recentPrices[i-1].price) {
        decreasingCount++;
      }
    }
    
    // Bepaal de trend op basis van het aantal stijgingen en dalingen
    if (increasingCount > decreasingCount) return 'rising';
    if (decreasingCount > increasingCount) return 'falling';
    return 'stable';
  }
  
  /**
   * Voorspelt toekomstige prijzen voor de komende 90 dagen
   */
  private static predictFuturePrices(priceHistory: PricePoint[], currentPrice: number): {date: Date, price: number}[] {
    if (!priceHistory || priceHistory.length < 2) {
      return [];
    }
    
    const today = new Date();
    const predictions: {date: Date, price: number}[] = [];
    
    // Gebruik recente prijsgegevens (laatste 6 maanden)
    const recentPrices = priceHistory.slice(-12);
    
    // Bereken gemiddelde prijsverandering
    let totalChange = 0;
    for (let i = 1; i < recentPrices.length; i++) {
      totalChange += (recentPrices[i].price - recentPrices[i-1].price) / recentPrices[i-1].price;
    }
    
    const avgMonthlyChange = totalChange / (recentPrices.length - 1);
    
    // Kortingsseizoenen (maandnummers)
    const holidaySeasons = [10, 11, 5, 6]; // Nov, Dec, Juni, Juli
    
    // Voorspel prijzen voor elke 15 dagen
    let lastPrice = currentPrice;
    
    for (let i = 15; i <= 90; i += 15) {
      const predictionDate = new Date(today);
      predictionDate.setDate(today.getDate() + i);
      
      const month = predictionDate.getMonth();
      
      // Basistrend op basis van historische verandering
      let predictedChange = avgMonthlyChange / 2; // Half maandelijks
      
      // Pas aan voor seizoenseffecten
      if (holidaySeasons.includes(month)) {
        // Korting in feestdagenseizoen
        predictedChange -= 0.05; // 5% prijsverlaging
      } else if ([1, 7].includes(month)) {
        // Prijsstijging na kortingsseizoenen
        predictedChange += 0.03; // 3% prijsverhoging
      }
      
      // Bereken voorspelde prijs
      lastPrice = lastPrice * (1 + predictedChange);
      
      // Rond af op twee decimalen
      const roundedPrice = Math.round(lastPrice * 100) / 100;
      
      predictions.push({
        date: predictionDate,
        price: roundedPrice
      });
    }
    
    return predictions;
  }
  
  /**
   * Voorspelt wanneer een product in de uitverkoop gaat
   */
  private static predictDiscountDate(priceHistory: PricePoint[], futurePrices: {date: Date, price: number}[]): {date: Date | null, percentage: number | null} {
    if (!futurePrices || futurePrices.length === 0) {
      return {date: null, percentage: null};
    }
    
    // Zoek naar de grootste verwachte prijsdaling
    let maxDiscount = 0;
    let discountDate = null;
    let discountPercentage = null;
    
    for (let i = 1; i < futurePrices.length; i++) {
      const priceChange = futurePrices[i-1].price - futurePrices[i].price;
      const percentageChange = priceChange / futurePrices[i-1].price;
      
      // Detecteer significante korting (>5%)
      if (percentageChange > 0.05 && percentageChange > maxDiscount) {
        maxDiscount = percentageChange;
        discountDate = futurePrices[i].date;
        discountPercentage = Math.round(percentageChange * 100);
      }
    }
    
    // Als we geen duidelijke korting vinden, kijk naar seisoenspatronen
    if (!discountDate) {
      const today = new Date();
      const currentMonth = today.getMonth();
      
      // Bepaal volgende sale-periode
      let nextSaleMonth;
      
      if (currentMonth < 5) {
        nextSaleMonth = 5; // Zomeruitverkoop (juni)
      } else if (currentMonth < 10) {
        nextSaleMonth = 10; // Winteruitverkoop (november)
      } else {
        nextSaleMonth = 5; // Zomeruitverkoop volgend jaar
      }
      
      const nextSaleDate = new Date(today.getFullYear() + (nextSaleMonth < currentMonth ? 1 : 0), nextSaleMonth, 15);
      
      return {
        date: nextSaleDate,
        percentage: 15 // Gemiddelde kortingspercentage
      };
    }
    
    return {
      date: discountDate,
      percentage: discountPercentage
    };
  }
  
  /**
   * Bepaalt het beste moment om te kopen op basis van voorspelde prijzen
   */
  private static determineBestTimeToBuy(futurePrices: {date: Date, price: number}[]): {date: Date | null, price: number | null} {
    if (!futurePrices || futurePrices.length === 0) {
      return {date: null, price: null};
    }
    
    // Zoek het moment met de laagste voorspelde prijs
    let lowestPriceEntry = futurePrices.reduce((lowest, current) => 
      current.price < lowest.price ? current : lowest, futurePrices[0]);
    
    return {
      date: lowestPriceEntry.date,
      price: lowestPriceEntry.price
    };
  }
}