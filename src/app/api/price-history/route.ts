// src/app/api/price-history/route.ts
// API endpoints voor het ophalen en bijwerken van prijshistorie

import { connectDB } from "@/libs/mongodb";
import { PriceHistory } from "@/models/PriceHistory";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET endpoint - Haalt prijshistorie op voor een product
 * URL: /api/price-history?productId=123
 */
export async function GET(request: NextRequest) {
  try {
    // 1. Verbinding maken met de database
    await connectDB();
    
    // 2. Haal productId op uit de query parameters
    const url = new URL(request.url);
    const productId = url.searchParams.get('productId');
    
    // 3. Controleer of productId is opgegeven
    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is verplicht" },
        { status: 400 }
      );
    }
    
    // 4. Haal prijshistorie op uit de database
    const priceHistory = await PriceHistory.findOne({ productId });
    
    // 5. Als geen data gevonden, retourneer een lege array
    if (!priceHistory) {
      return NextResponse.json(
        { productId, prices: [], lastUpdated: null },
        { status: 200 }
      );
    }
    
    // 6. Retourneer de gevonden prijshistorie
    return NextResponse.json(
      { 
        productId: priceHistory.productId,
        prices: priceHistory.prices || [],
        lastUpdated: priceHistory.lastUpdated
      },
      { status: 200 }
    );
    
  } catch (error) {
    // 7. Foutafhandeling
    console.error("Error fetching price history:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het ophalen van de prijshistorie" },
      { status: 500 }
    );
  }
}

/**
 * POST endpoint - Voegt een nieuw prijspunt toe aan de historie
 * Body: { productId: "123", price: 29.99, date: "2023-03-30T12:00:00Z" }
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Verbinding maken met de database
    await connectDB();
    
    // 2. Haal gegevens op uit het request body
    const { productId, price, date } = await request.json();
    
    // 3. Valideer de invoer
    if (!productId || price === undefined) {
      return NextResponse.json(
        { error: "Product ID en prijs zijn verplicht" },
        { status: 400 }
      );
    }
    
    // 4. Bepaal de datum (gebruik opgegeven datum of huidige datum)
    const priceDate = date ? new Date(date) : new Date();
    
    // 5. Voeg de prijshistorie toe of update deze
    const result = await PriceHistory.updateOne(
      { productId },
      { 
        $push: { 
          prices: { 
            price, 
            date: priceDate
          } 
        },
        $set: { lastUpdated: new Date() }
      },
      { upsert: true } // Maakt een nieuw document aan als het nog niet bestaat
    );
    
    // 6. Retourneer het resultaat
    return NextResponse.json(
      { 
        success: true, 
        message: "Prijshistorie succesvol bijgewerkt",
        modified: result.modifiedCount,
        upserted: result.upsertedCount
      },
      { status: 200 }
    );
    
  } catch (error) {
    // 7. Foutafhandeling
    console.error("Error updating price history:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het bijwerken van de prijshistorie" },
      { status: 500 }
    );
  }
}