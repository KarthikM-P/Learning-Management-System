import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { connectToDatabase } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import { CoursesSkeleton } from "@/components/courses-skeleton"
import { ObjectId } from "mongodb"

async function getCourses() {
  const { db } = await connectToDatabase()

  const courses = await db.collection("courses").find({ published: true }).toArray()

  return courses
}

async function getUserEnrollments(userId: string) {
  const { db } = await connectToDatabase()

  const courses = await db
    .collection("courses")
    .find({ enrolledStudents: new ObjectId(userId) })
    .project({ _id: 1 })
    .toArray()

  return courses.map((course) => course._id.toString())
}

export default async function CoursesPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Available Courses" text="Browse and enroll in our coding courses" />

      <Suspense fallback={<CoursesSkeleton />}>
        <CoursesContent />
      </Suspense>
    </DashboardShell>
  )
}

async function CoursesContent() {
  const courses = await getCourses()
  const user = await getCurrentUser()

  let enrolledCourseIds: string[] = []
  if (user) {
    enrolledCourseIds = await getUserEnrollments(user.id)
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.length > 0 ? (
        courses.map((course) => {
          const isEnrolled = enrolledCourseIds.includes(course._id.toString())

          return (
            <Card key={course._id.toString()} className="overflow-hidden flex flex-col">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={course.image || "/placeholder.svg?height=200&width=400"}
                  alt={course.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                <CardDescription className="line-clamp-2">{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Instructor:</span>
                    <span>{course.instructorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Students:</span>
                    <span>{course.enrolledStudents?.length || 0}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                {isEnrolled ? (
                  <Button className="w-full" asChild>
                    <a href={`/courses/${course._id}`}>Continue Learning</a>
                  </Button>
                ) : (
                  <EnrollButton courseId={course._id.toString()} />
                )}
              </CardFooter>
            </Card>
          )
        })
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
          <h3 className="text-lg font-medium">No courses available</h3>
          <p className="mt-2 text-muted-foreground">Check back later for new courses</p>
        </div>
      )}
    </div>
  )
}

function EnrollButton({ courseId }: { courseId: string }) {
  return (
    <form action={`/api/courses/${courseId}/enroll`} method="POST" className="w-full">
      <Button type="submit" className="w-full">
        Enroll Now
      </Button>
    </form>
  )
}

