import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { ObjectId } from "mongodb"
import { isAdmin } from "@/lib/auth"

export async function GET(req: Request, { params }: { params: { courseId: string } }) {
  try {
    const { db } = await connectToDatabase()

    const resources = await db
      .collection("resources")
      .find({ courseId: new ObjectId(params.courseId) })
      .toArray()

    return NextResponse.json({ resources })
  } catch (error) {
    console.error("Failed to fetch resources:", error)
    return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 })
  }
}

export async function POST(req: Request, { params }: { params: { courseId: string } }) {
  try {
    // Check if user is admin
    const admin = await isAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const data = await req.json()

    // Validate required fields
    if (!data.title || !data.type) {
      return NextResponse.json({ error: "Title and type are required" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Create resource
    const resourceData = {
      ...data,
      courseId: new ObjectId(params.courseId),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("resources").insertOne(resourceData)

    return NextResponse.json(
      {
        message: "Resource created successfully",
        resourceId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Failed to create resource:", error)
    return NextResponse.json({ error: "Failed to create resource" }, { status: 500 })
  }
}

