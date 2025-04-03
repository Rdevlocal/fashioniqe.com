"use server";

import { connectDB } from "@/libs/mongodb";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

// Detailed schema definition for price alerts
const priceAlertSchema = new mongoose.Schema({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  desiredPrice: { type: Number, required: true },
  notificationTime: { type: Date, default: Date.now },
  isSpecialOccasion: { type: Boolean, default: false },
  reminderNote: { type: String },
  productTitle: { type: String },
  ean: { type: String },
  merchantName: { type: String },
  productImageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  lastNotified: { type: Date },
  notificationsSent: { type: Number, default: 0 }
});

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    // Extract data from the request
    const { 
      email, 
      productId, 
      desiredPrice, 
      notificationTime, 
      reminderNote, 
      productTitle,
      ean,
      merchantName,
      productImageUrl
    } = await request.json();
    
    // Validate input
    if (!email || !productId || desiredPrice === undefined) {
      return NextResponse.json(
        { error: "Email, productId, and desired price are required" },
        { status: 400 }
      );
    }
    
    // Get the MongoDB database
    const db = mongoose.connection.db;
    
    // Check if the collection exists, if not, create it
    const collections = await db.listCollections({ name: "price_alerts" }).toArray();
    if (collections.length === 0) {
      await db.createCollection("price_alerts");
    }
    
    // Get the collection
    const alertsCollection = db.collection("price_alerts");
    
    // Determine if it's a special occasion
    const isSpecialOccasion = !!reminderNote;
    
    // Check if an alert already exists for this combination
    const existingAlert = await alertsCollection.findOne({
      email,
      productId
    });
    
    if (existingAlert) {
      // Update the existing alert
      await alertsCollection.updateOne(
        { email, productId },
        { 
          $set: { 
            desiredPrice,
            notificationTime: new Date(notificationTime || new Date().toISOString()),
            isSpecialOccasion,
            reminderNote: reminderNote || "",
            productTitle: productTitle || existingAlert.productTitle,
            ean: ean || existingAlert.ean,
            merchantName: merchantName || existingAlert.merchantName,
            productImageUrl: productImageUrl || existingAlert.productImageUrl,
            updatedAt: new Date().toISOString(),
            isActive: true
          }
        }
      );
    } else {
      // Create a new alert
      await alertsCollection.insertOne({
        email,
        productId,
        desiredPrice,
        notificationTime: new Date(notificationTime || new Date().toISOString()),
        isSpecialOccasion,
        reminderNote: reminderNote || "",
        productTitle: productTitle || "",
        ean: ean || "",
        merchantName: merchantName || "",
        productImageUrl: productImageUrl || "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
        notificationsSent: 0
      });
    }

    // If it's a special occasion
    if (isSpecialOccasion) {
      return NextResponse.json(
        { 
          success: true, 
          message: "Reminder successfully set for " + new Date(notificationTime).toLocaleDateString()
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: true, message: "Price alert successfully set" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error setting price alert:", error);
    return NextResponse.json(
      { error: "An error occurred while setting the price alert" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Extract parameters from the URL
    const url = new URL(request.url);
    const email = url.searchParams.get('email');
    const productId = url.searchParams.get('productId');
    
    // Validate input
    if (!email) {
      return NextResponse.json(
        { error: "Email parameter is required" },
        { status: 400 }
      );
    }
    
    // Get the MongoDB database
    const db = mongoose.connection.db;
    const alertsCollection = db.collection("price_alerts");
    
    // Find alerts for this user
    const query: any = { email };
    if (productId) {
      query.productId = productId;
    }
    
    const alerts = await alertsCollection.find(query).toArray();
    
    return NextResponse.json(
      { alerts },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error getting price alerts:", error);
    return NextResponse.json(
      { error: "An error occurred while retrieving price alerts" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    
    // Extract data from the request
    const { email, productId } = await request.json();
    
    // Validate input
    if (!email || !productId) {
      return NextResponse.json(
        { error: "Email and productId are required" },
        { status: 400 }
      );
    }
    
    // Get the MongoDB database
    const db = mongoose.connection.db;
    const alertsCollection = db.collection("price_alerts");
    
    // Delete the alert
    const result = await alertsCollection.deleteOne({
      email,
      productId
    });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "No price alert found with these details" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { success: true, message: "Price alert successfully deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting price alert:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the price alert" },
      { status: 500 }
    );
  }
}