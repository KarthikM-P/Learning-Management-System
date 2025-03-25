import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { connectToDatabase } from "@/lib/db"
import { isAdmin } from "@/lib/auth"
import { redirect } from "next/navigation"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

async function getAdminDashboardData() {
  const { db } = await connectToDatabase()

  // Get total counts
  const totalStudents = await db.collection("users").countDocuments({ role: "student" })
  const totalCourses = await db.collection("courses").countDocuments()
  const totalAssignments = await db.collection("assignments").countDocuments()

  // Get recent enrollments (last 7 days)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const recentEnrollments = await db.collection("progress").countDocuments({ createdAt: { $gte: sevenDaysAgo } })

  // Get course enrollment stats
  const courseStats = await db
    .collection("courses")
    .aggregate([
      {
        $project: {
          title: 1,
          studentCount: { $size: { $ifNull: ["$enrolledStudents", []] } },
        },
      },
      { $sort: { studentCount: -1 } },
      { $limit: 5 },
    ])
    .toArray()

  // Get assignment submission stats
  const assignmentStats = await db
    .collection("assignment_submissions")
    .aggregate([
      {
        $group: {
          _id: "$assignmentId",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "assignments",
          localField: "_id",
          foreignField: "_id",
          as: "assignment",
        },
      },
      { $unwind: "$assignment" },
      {
        $project: {
          title: "$assignment.title",
          count: 1,
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ])
    .toArray()

  return {
    stats: {
      totalStudents,
      totalCourses,
      totalAssignments,
      recentEnrollments,
    },
    courseStats,
    assignmentStats,
  }
}

export default async function AdminDashboardPage() {
  // Check if user is admin
  const admin = await isAdmin()
  if (!admin) {
    redirect("/dashboard")
  }

  const data = await getAdminDashboardData()

  return (
    <DashboardShell>
      <DashboardHeader heading="Admin Dashboard" text="Overview of your learning platform" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.totalStudents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.totalCourses}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.totalAssignments}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Enrollments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.recentEnrollments}</div>
            <p className="text-xs text-muted-foreground">Last 7 days</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="courses">Course Analytics</TabsTrigger>
          <TabsTrigger value="assignments">Assignment Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Enrollments</CardTitle>
              <CardDescription>Top courses by student enrollment</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.courseStats.map((course) => ({
                      name: course.title,
                      students: course.studentCount,
                    }))}
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
                    <Tooltip />
                    <Bar dataKey="students" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Assignment Submissions</CardTitle>
              <CardDescription>Top assignments by submission count</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.assignmentStats.map((assignment) => ({
                      name: assignment.title,
                      submissions: assignment.count,
                    }))}
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
                    <Tooltip />
                    <Bar dataKey="submissions" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

