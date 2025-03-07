import { connectDB } from "@/libs/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export async function POST(request: Request) {
  try {
    await connectDB();

    const { name, email, password, phone } = await request.json();

    if (!name || !email || !password || !phone) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const userFound = await User.findOne({ email });

    if (userFound) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    return NextResponse.json(
      {
        name: savedUser.name,
        email: savedUser.email,
        createdAt: savedUser.createdAt,
        updatedAt: savedUser.updatedAt,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during signup:", error);
    return NextResponse.json(
      { message: error instanceof mongoose.Error.ValidationError ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();

    const { userId, name, email, password, phone, address } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const userToUpdate = await User.findById(userId);

    if (!userToUpdate) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (password && password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    if (name) userToUpdate.name = name;
    if (email) userToUpdate.email = email;
    if (phone) userToUpdate.phone = phone;
    if (address) userToUpdate.address = address;

    if (password) {
      userToUpdate.password = await bcrypt.hash(password, 12);
    }

    await userToUpdate.save();

    return NextResponse.json(
      {
        message: "User updated successfully",
        updatedUser: {
          id: userToUpdate._id,
          name: userToUpdate.name,
          email: userToUpdate.email,
          createdAt: userToUpdate.createdAt,
          updatedAt: userToUpdate.updatedAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during user update:", error);
    return NextResponse.json(
      { message: error instanceof mongoose.Error.ValidationError ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();

    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await user.deleteOne();

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during user deletion:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
