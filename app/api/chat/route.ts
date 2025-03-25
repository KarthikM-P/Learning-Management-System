import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { ObjectId } from "mongodb"
import { getCurrentUser } from "@/lib/auth"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const courseId = searchParams.get("courseId")

    if (!courseId) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    const messages = await db
      .collection("chat_messages")
      .find({ courseId: new ObjectId(courseId) })
      .sort({ createdAt: 1 })
      .toArray()

    return NextResponse.json({ messages })
  } catch (error) {
    console.error("Failed to fetch chat messages:", error)
    return NextResponse.json({ error: "Failed to fetch chat messages" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()

    // Validate required fields
    if (!data.content || !data.courseId) {
      return NextResponse.json({ error: "Content and courseId are required" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Create message
    const messageData = {
      content: data.content,
      courseId: new ObjectId(data.courseId),
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      userImage: user.image || null,
      createdAt: new Date(),
    }

    const result = await db.collection("chat_messages").insertOne(messageData)

    return NextResponse.json(
      {
        message: "Message sent successfully",
        messageId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Failed to send message:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}

