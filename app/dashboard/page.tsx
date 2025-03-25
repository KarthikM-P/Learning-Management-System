import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { getCurrentUser } from "@/lib/auth"
import { connectToDatabase } from "@/lib/db"
import { ObjectId } from "mongodb"
import { DashboardSkeleton } from "@/components/dashboard-skeleton"

// Sample data for charts
const progressData = [
  { name: "Week 1", progress: 30 },
  { name: "Week 2", progress: 45 },
  { name: "Week 3", progress: 55 },
  { name: "Week 4", progress: 70 },
  { name: "Week 5", progress: 80 },
  { name: "Week 6", progress: 90 },
]

async function getStudentDashboardData(userId: string) {
  const { db } = await connectToDatabase()

  // Get enrolled courses
  const enrolledCourses = await db
    .collection("courses")
    .find({ enrolledStudents: new ObjectId(userId) })
    .toArray()

  // Get assignments
  const assignments = await db
    .collection("assignments")
    .find({
      courseId: {
        $in: enrolledCourses.map((course) => course._id),
      },
    })
    .sort({ dueDate: 1 })
    .limit(5)
    .toArray()

  // Get progress data
  const progressData = await db
    .collection("progress")
    .find({ studentId: new ObjectId(userId) })
    .toArray()

  // Calculate overall stats
  const totalCourses = enrolledCourses.length
  const totalAssignments = await db.collection("assignments").countDocuments({
    courseId: {
      $in: enrolledCourses.map((course) => course._id),
    },
  })

  const completedAssignments = await db.collection("assignment_submissions").countDocuments({
    studentId: new ObjectId(userId),
    grade: { $exists: true },
  })

  // Calculate overall progress
  let overallProgress = 0
  if (progressData.length > 0) {
    const totalProgress = progressData.reduce((sum, item) => sum + item.overallProgress, 0)
    overallProgress = Math.round(totalProgress / progressData.length)
  }

  return {
    courses: enrolledCourses,
    assignments,
    stats: {
      totalCourses,
      completedAssignments,
      totalAssignments,
      overallProgress,
    },
  }
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    return null // This should be handled by middleware
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text={`Welcome back, ${user.name}! Here's an overview of your learning progress.`}
      />

      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent userId={user.id} />
      </Suspense>
    </DashboardShell>
  )
}

async function DashboardContent({ userId }: { userId: string }) {
  const data = await getStudentDashboardData(userId)

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.totalCourses}</div>
            <p className="text-xs text-muted-foreground">
              {data.stats.totalCourses > 0 ? "Keep up the good work!" : "Enroll in a course to get started"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.stats.completedAssignments}/{data.stats.totalAssignments}
            </div>
            <p className="text-xs text-muted-foreground">
              {data.stats.completedAssignments > 0
                ? `${data.stats.completedAssignments} tasks completed`
                : "No tasks completed yet"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.overallProgress}%</div>
            <p className="text-xs text-muted-foreground">
              {data.stats.overallProgress > 0
                ? `+${Math.min(5, data.stats.overallProgress)}% from last week`
                : "Start learning to track progress"}
            </p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
              <CardDescription>Your course completion progress over the past 6 weeks</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ChartContainer
                config={{
                  progress: {
                    label: "Progress",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={progressData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="progress" stroke="var(--color-progress)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.courses.length > 0 ? (
              data.courses.map((course) => (
                <Card key={course._id.toString()} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <img
                      src={course.image || "/placeholder.svg?height=100&width=200"}
                      alt={course.title}
                      className="h-48 w-full object-cover"
                    />
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2 mt-2">{course.description}</CardDescription>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Duration:</span>
                        <span className="font-medium">{course.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Instructor:</span>
                        <span className="font-medium">{course.instructorName}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Progress:</span>
                        <span className="font-medium">{data.stats.overallProgress || 0}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${data.stats.overallProgress || 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 px-6 py-3">
                    <Button className="w-full" variant="outline" asChild>
                      <a href={`/courses/${course._id}`}>Continue Learning</a>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <h3 className="text-lg font-medium">No courses enrolled yet</h3>
                <p className="mt-2 text-muted-foreground">Browse available courses and enroll to start learning</p>
                <Button className="mt-4" asChild>
                  <a href="/courses">Browse Courses</a>
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Assignments</CardTitle>
              <CardDescription>Your pending assignments and deadlines</CardDescription>
            </CardHeader>
            <CardContent>
              {data.assignments.length > 0 ? (
                <div className="space-y-4">
                  {data.assignments.map((assignment) => (
                    <div key={assignment._id.toString()} className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{assignment.title}</h3>
                          <p className="text-sm text-muted-foreground">{assignment.courseName}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {new Date(assignment.dueDate) > new Date()
                              ? `Due in ${Math.ceil((new Date(assignment.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days`
                              : "Overdue"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(assignment.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={`/code-editor?assignmentId=${assignment._id}`}>Start Assignment</a>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <h3 className="text-lg font-medium">No assignments due</h3>
                  <p className="mt-2 text-muted-foreground">
                    You're all caught up! Check back later for new assignments.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}

