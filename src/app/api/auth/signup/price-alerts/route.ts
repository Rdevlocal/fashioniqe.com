"use server";

import { connectDB } from "@/libs/mongodb";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

// Uitgebreide schema definitie voor prijsalerts
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
    
    // Haal de data uit het request
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
    
    // Valideer de invoer
    if (!email || !productId || desiredPrice === undefined) {
      return NextResponse.json(
        { error: "Email, productId en gewenste prijs zijn verplicht" },
        { status: 400 }
      );
    }
    
    // Haal de MongoDB database op
    const db = mongoose.connection.db;
    
    // Controleer of de collectie bestaat, zo niet, maak deze aan
    const collections = await db.listCollections({ name: "price_alerts" }).toArray();
    if (collections.length === 0) {
      await db.createCollection("price_alerts");
    }
    
    // Haal de collectie op
    const alertsCollection = db.collection("price_alerts");
    
    // Bepaal of het een speciale gelegenheid is
    const isSpecialOccasion = !!reminderNote;
    
    // Zoek of er al een alert bestaat voor deze combinatie
    const existingAlert = await alertsCollection.findOne({
      email,
      productId
    });
    
    if (existingAlert) {
      // Update de bestaande alert
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
      // Maak een nieuwe alert aan
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

    // Indien het een speciale gelegenheid betreft
    if (isSpecialOccasion) {
      return NextResponse.json(
        { 
          success: true, 
          message: "Herinnering succesvol ingesteld voor " + new Date(notificationTime).toLocaleDateString()
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: true, message: "Prijsalert succesvol ingesteld" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error setting price alert:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het instellen van de prijsalert" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Haal parameters op uit de URL
    const url = new URL(request.url);
    const email = url.searchParams.get('email');
    const productId = url.searchParams.get('productId');
    
    // Valideer de invoer
    if (!email) {
      return NextResponse.json(
        { error: "Email parameter is verplicht" },
        { status: 400 }
      );
    }
    
    // Haal de MongoDB database op
    const db = mongoose.connection.db;
    const alertsCollection = db.collection("price_alerts");
    
    // Zoek alerts voor deze gebruiker
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
      { error: "Er is een fout opgetreden bij het ophalen van prijsalerts" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    
    // Haal de data uit het request
    const { email, productId } = await request.json();
    
    // Valideer de invoer
    if (!email || !productId) {
      return NextResponse.json(
        { error: "Email en productId zijn verplicht" },
        { status: 400 }
      );
    }
    
    // Haal de MongoDB database op
    const db = mongoose.connection.db;
    const alertsCollection = db.collection("price_alerts");
    
    // Verwijder de alert
    const result = await alertsCollection.deleteOne({
      email,
      productId
    });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Geen prijsalert gevonden met deze gegevens" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { success: true, message: "Prijsalert succesvol verwijderd" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting price alert:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het verwijderen van de prijsalert" },
      { status: 500 }
    );
  }
}