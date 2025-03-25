import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { hash } from "bcrypt"

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json()

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    // Connect to database
    const { db } = await connectToDatabase()

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Create user
    const userData = {
      name,
      email,
      password: hashedPassword,
      role: role || "student", // Default to student if role not provided
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("users").insertOne(userData)

    return NextResponse.json(
      {
        message: "User registered successfully",
        userId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Failed to register user:", error)
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 })
  }
}

