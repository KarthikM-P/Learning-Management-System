import { NextResponse } from "next/server"
import { getCourses, createCourse } from "@/lib/db"

export async function GET() {
  try {
    const courses = await getCourses()
    return NextResponse.json({ courses })
  } catch (error) {
    console.error("Failed to fetch courses:", error)
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()

    // Validate required fields
    if (!data.title || !data.description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 })
    }

    // Add creation date and default values
    const courseData = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      enrolledStudents: [],
      published: false,
    }

    const result = await createCourse(courseData)

    return NextResponse.json(
      {
        message: "Course created successfully",
        courseId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Failed to create course:", error)
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 })
  }
}

