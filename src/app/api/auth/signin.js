import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        // Replace this with actual authentication logic (e.g., check a database)
        if (email === "test@example.com" && password === "password123") {
            return NextResponse.json({ message: "Success", user: { email } }, { status: 200 });
        }

        return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
