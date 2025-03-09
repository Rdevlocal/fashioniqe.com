"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth";
import { Session } from "next-auth";
import mongoose, { Schema } from "mongoose";
import { revalidatePath } from "next/cache";
import { Product } from "@/models/Products";
import { connectDB } from "@/libs/mongodb";

// Mongoose Model Schema
const wishlistSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  items: [{
    productId: { type: Schema.Types.ObjectId, required: true, ref: 'Product' }
  }]
});

const Wishlist = mongoose.models.Wishlist || mongoose.model('Wishlist', wishlistSchema);

export type Wishlists = {
  userId: string;
  items: Array<{
    productId: Schema.Types.ObjectId;
  }>;
};

export async function addItem(productId: Schema.Types.ObjectId) {
  await connectDB();
  const session: Session | null = await getServerSession(authOptions);

  if (!session?.user._id) {
    console.error(`User Id not found.`);
    return;
  }

  const userId = session.user._id;

  await Wishlist.findOneAndUpdate(
    { userId },
    { $addToSet: { items: { productId } } }, // Voeg toe zonder duplicates
    { upsert: true, new: true }
  );

  revalidatePath("/wishlist");
}

export async function getItems(userId: string) {
  await connectDB();

  if (!userId) {
    console.error(`User Id not found.`);
    return null;
  }

  const wishlist = await Wishlist.findOne({ userId }).populate('items.productId');

  if (!wishlist) {
    console.error("Wishlist not found.");
    return null;
  }

  return wishlist.items
    .map(item => item.productId)
    .filter(product => product !== null);
}

export async function getTotalWishlist() {
  await connectDB();
  const session: Session | null = await getServerSession(authOptions);
  
  if (!session?.user._id) return undefined;

  const wishlist = await Wishlist.findOne({ userId: session.user._id });
  return wishlist || undefined;
}

export async function delItem(productId: Schema.Types.ObjectId) {
  await connectDB();
  const session: Session | null = await getServerSession(authOptions);
  
  if (!session?.user._id) {
    console.error("User not found.");
    return;
  }

  await Wishlist.findOneAndUpdate(
    { userId: session.user._id },
    { $pull: { items: { productId } } }
  );

  revalidatePath("/wishlist");
}