// src/app/api/price-history/route.ts
// API endpoints for fetching and updating price history

import { connectDB } from "@/libs/mongodb";
import { PriceHistory } from "@/models/PriceHistory";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET endpoint - Fetches price history for a product
 * URL: /api/price-history?productId=123
 */
export async function GET(request: NextRequest) {
  try {
    // 1. Connect to the database
    await connectDB();
    
    // 2. Retrieve productId from query parameters
    const url = new URL(request.url);
    const productId = url.searchParams.get('productId');
    
    // 3. Check if productId is provided
    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }
    
    // 4. Fetch price history from the database
    const priceHistory = await PriceHistory.findOne({ productId });
    
    // 5. If no data is found, return an empty array
    if (!priceHistory) {
      return NextResponse.json(
        { productId, prices: [], lastUpdated: null },
        { status: 200 }
      );
    }
    
    // 6. Return the found price history
    return NextResponse.json(
      { 
        productId: priceHistory.productId,
        prices: priceHistory.prices || [],
        lastUpdated: priceHistory.lastUpdated
      },
      { status: 200 }
    );
    
  } catch (error) {
    // 7. Error handling
    console.error("Error fetching price history:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the price history" },
      { status: 500 }
    );
  }
}

/**
 * POST endpoint - Adds a new price point to the history
 * Body: { productId: "123", price: 29.99, date: "2023-03-30T12:00:00Z" }
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Connect to the database
    await connectDB();
    
    // 2. Retrieve data from the request body
    const { productId, price, date } = await request.json();
    
    // 3. Validate the input
    if (!productId || price === undefined) {
      return NextResponse.json(
        { error: "Product ID and price are required" },
        { status: 400 }
      );
    }
    
    // 4. Determine the date (use provided date or current date)
    const priceDate = date ? new Date(date) : new Date();
    
    // 5. Add or update the price history
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
      { upsert: true } // Creates a new document if it doesn't exist
    );
    
    // 6. Return the result
    return NextResponse.json(
      { 
        success: true, 
        message: "Price history successfully updated",
        modified: result.modifiedCount,
        upserted: result.upsertedCount
      },
      { status: 200 }
    );
    
  } catch (error) {
    // 7. Error handling
    console.error("Error updating price history:", error);
    return NextResponse.json(
      { error: "An error occurred while updating the price history" },
      { status: 500 }
    );
  }
}