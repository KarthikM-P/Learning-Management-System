import { NextResponse } from "next/server"
import { getCourseById } from "@/lib/db"
import { connectToDatabase } from "@/lib/db"
import { ObjectId } from "mongodb"
import { isAdmin } from "@/lib/auth"

export async function GET(req: Request, { params }: { params: { courseId: string } }) {
  try {
    const course = await getCourseById(params.courseId)

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    return NextResponse.json({ course })
  } catch (error) {
    console.error("Failed to fetch course:", error)
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { courseId: string } }) {
  try {
    // Check if user is admin
    const admin = await isAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const data = await req.json()
    const { db } = await connectToDatabase()

    // Update course
    const result = await db.collection("courses").updateOne(
      { _id: new ObjectId(params.courseId) },
      {
        $set: {
          ...data,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Course updated successfully",
    })
  } catch (error) {
    console.error("Failed to update course:", error)
    return NextResponse.json({ error: "Failed to update course" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { courseId: string } }) {
  try {
    // Check if user is admin
    const admin = await isAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const { db } = await connectToDatabase()

    // Delete course
    const result = await db.collection("courses").deleteOne({
      _id: new ObjectId(params.courseId),
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error("Failed to delete course:", error)
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 })
  }
}

