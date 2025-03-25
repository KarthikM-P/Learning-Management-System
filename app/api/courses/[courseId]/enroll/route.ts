import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { ObjectId } from "mongodb"
import { getCurrentUser } from "@/lib/auth"

export async function POST(req: Request, { params }: { params: { courseId: string } }) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { db } = await connectToDatabase()

    // Check if course exists
    const course = await db.collection("courses").findOne({
      _id: new ObjectId(params.courseId),
    })

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    // Check if user is already enrolled
    const isEnrolled = course.enrolledStudents?.some((studentId: ObjectId) => studentId.toString() === user.id)

    if (isEnrolled) {
      return NextResponse.json({ error: "Already enrolled in this course" }, { status: 400 })
    }

    // Enroll user in course
    await db
      .collection("courses")
      .updateOne({ _id: new ObjectId(params.courseId) }, { $push: { enrolledStudents: new ObjectId(user.id) } })

    // Create initial progress record
    await db.collection("progress").insertOne({
      studentId: new ObjectId(user.id),
      courseId: new ObjectId(params.courseId),
      resourcesCompleted: [],
      assignmentsCompleted: [],
      overallProgress: 0,
      lastActivity: new Date(),
    })

    return NextResponse.json({
      message: "Successfully enrolled in course",
    })
  } catch (error) {
    console.error("Failed to enroll in course:", error)
    return NextResponse.json({ error: "Failed to enroll in course" }, { status: 500 })
  }
}

