import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { ObjectId } from "mongodb"
import { isAdmin } from "@/lib/auth"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const courseId = searchParams.get("courseId")

    const { db } = await connectToDatabase()

    let query = {}
    if (courseId) {
      query = { courseId: new ObjectId(courseId) }
    }

    const assignments = await db.collection("assignments").find(query).toArray()

    return NextResponse.json({ assignments })
  } catch (error) {
    console.error("Failed to fetch assignments:", error)
    return NextResponse.json({ error: "Failed to fetch assignments" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    // Check if user is admin
    const admin = await isAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const data = await req.json()

    // Validate required fields
    if (!data.title || !data.courseId || !data.description) {
      return NextResponse.json({ error: "Title, courseId, and description are required" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Create assignment
    const assignmentData = {
      ...data,
      courseId: new ObjectId(data.courseId),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("assignments").insertOne(assignmentData)

    return NextResponse.json(
      {
        message: "Assignment created successfully",
        assignmentId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Failed to create assignment:", error)
    return NextResponse.json({ error: "Failed to create assignment" }, { status: 500 })
  }
}

