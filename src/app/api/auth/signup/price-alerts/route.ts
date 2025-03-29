"use server";

import { connectDB } from "@/libs/mongodb";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    // Haal de data uit het request
    const { email, productId, desiredPrice, notificationTime } = await request.json();
    
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
            notificationTime: notificationTime || new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        }
      );
    } else {
      // Maak een nieuwe alert aan
      await alertsCollection.insertOne({
        email,
        productId,
        desiredPrice,
        notificationTime: notificationTime || new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true
      });
    }
    
    return NextResponse.json(
      { success: true, message: "Prijsalert succesvol ingesteld" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error setting price alert:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het instellen van de prijsalert" },
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