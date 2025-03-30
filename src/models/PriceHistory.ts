// src/models/PriceHistory.ts
// Dit bestand definieert het database model voor het opslaan van prijsgeschiedenis

import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface voor een individueel prijspunt
 */
export interface PriceHistoryItem {
  price: number;    // De prijs op het gegeven moment
  date: Date;       // De datum waarop deze prijs is geregistreerd
}

/**
 * Interface voor het volledige prijshistorie document
 */
export interface PriceHistoryDocument extends Document {
  productId: string;               // ID van het product
  prices: PriceHistoryItem[];      // Array van prijspunten
  lastUpdated: Date;               // Datum van laatste update
}

/**
 * Schema voor individuele prijspunten
 */
const PriceHistoryItemSchema = new Schema<PriceHistoryItem>({
  // De prijs van het product op het gegeven moment
  price: {
    type: Number,
    required: true,
  },
  // Datum waarop deze prijs werd geregistreerd
  date: {
    type: Date,
    required: true,
  },
});

/**
 * Hoofdschema voor prijshistorie
 */
const PriceHistorySchema = new Schema<PriceHistoryDocument>({
  // Product ID (ref naar product collectie)
  productId: {
    type: String,
    required: true,
    index: true,  // Index voor snelle opzoekingen
  },
  // Array van prijspunten
  prices: [PriceHistoryItemSchema],
  // Datum van laatste update
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

// Creëer een samengestelde index voor efficiënte queries
PriceHistorySchema.index({ productId: 1, lastUpdated: -1 });

// Exporteer het model (als het al bestaat, gebruik het bestaande model)
export const PriceHistory = mongoose.models.PriceHistory || 
  mongoose.model<PriceHistoryDocument>('PriceHistory', PriceHistorySchema);