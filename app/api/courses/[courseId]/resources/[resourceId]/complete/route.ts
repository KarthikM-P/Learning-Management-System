import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { ObjectId } from "mongodb"
import { getCurrentUser } from "@/lib/auth"

export async function POST(req: Request, { params }: { params: { courseId: string; resourceId: string } }) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { db } = await connectToDatabase()

    // Check if progress record exists
    const progress = await db.collection("progress").findOne({
      studentId: new ObjectId(user.id),
      courseId: new ObjectId(params.courseId),
    })

    if (!progress) {
      return NextResponse.json({ error: "Not enrolled in this course" }, { status: 400 })
    }

    // Mark resource as completed
    await db.collection("progress").updateOne(
      {
        studentId: new ObjectId(user.id),
        courseId: new ObjectId(params.courseId),
      },
      {
        $addToSet: { resourcesCompleted: new ObjectId(params.resourceId) },
        $set: { lastActivity: new Date() },
      },
    )

    // Update overall progress
    const totalResources = await db.collection("resources").countDocuments({
      courseId: new ObjectId(params.courseId),
    })

    const totalAssignments = await db.collection("assignments").countDocuments({
      courseId: new ObjectId(params.courseId),
    })

    const updatedProgress = await db.collection("progress").findOne({
      studentId: new ObjectId(user.id),
      courseId: new ObjectId(params.courseId),
    })

    const completedResources = updatedProgress.resourcesCompleted?.length || 0
    const completedAssignments = updatedProgress.assignmentsCompleted?.length || 0

    const totalItems = totalResources + totalAssignments
    const completedItems = completedResources + completedAssignments

    const overallProgress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0

    await db.collection("progress").updateOne(
      {
        studentId: new ObjectId(user.id),
        courseId: new ObjectId(params.courseId),
      },
      {
        $set: { overallProgress },
      },
    )

    return NextResponse.json({
      message: "Resource marked as completed",
      overallProgress,
    })
  } catch (error) {
    console.error("Failed to mark resource as completed:", error)
    return NextResponse.json({ error: "Failed to mark resource as completed" }, { status: 500 })
  }
}

