import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardShell } from "@/components/dashboard-shell"
import { CalendarClock, Clock, Github, Sparkles, Users, Youtube } from "lucide-react"

export default function CoursePage() {
  // This would be fetched from your API in a real application
  const course = {
    id: "1",
    title: "Advanced JavaScript",
    description:
      "Master JavaScript concepts including closures, prototypes, and ES6+ features. This course is designed for developers who already have a basic understanding of JavaScript and want to deepen their knowledge.",
    duration: "8 weeks",
    instructor: {
      name: "Jane Smith",
      title: "Senior JavaScript Developer",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    progress: 65,
    enrollmentCount: 1243,
    lastUpdated: "March 10, 2025",
    modules: [
      {
        id: "1",
        title: "JavaScript Fundamentals Review",
        lessons: [
          { id: "1", title: "Variables, Scope, and Hoisting", duration: "45 mins", completed: true },
          { id: "2", title: "Functions and Execution Context", duration: "1 hour", completed: true },
          { id: "3", title: "Data Types and Type Coercion", duration: "50 mins", completed: true },
        ],
      },
      {
        id: "2",
        title: "Advanced Functions",
        lessons: [
          { id: "4", title: "Closures and Practical Uses", duration: "1 hour", completed: true },
          { id: "5", title: "Higher-Order Functions", duration: "1.5 hours", completed: false },
          { id: "6", title: "Function Currying and Composition", duration: "1 hour", completed: false },
        ],
      },
      {
        id: "3",
        title: "Object-Oriented JavaScript",
        lessons: [
          { id: "7", title: "Prototypal Inheritance", duration: "1.5 hours", completed: false },
          { id: "8", title: "ES6 Classes and Inheritance", duration: "1 hour", completed: false },
          { id: "9", title: "Design Patterns", duration: "2 hours", completed: false },
        ],
      },
    ],
  }

  return (
    <DashboardShell>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8 grid gap-8 md:grid-cols-[2fr_1fr]">
          <div>
            <h1 className="mb-2 text-3xl font-bold">{course.title}</h1>
            <p className="mb-4 text-muted-foreground">{course.description}</p>
            <div className="mb-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{course.enrollmentCount} students</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Last updated: {course.lastUpdated}</span>
              </div>
            </div>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={course.instructor.avatar || "/placeholder.svg"}
                  alt={course.instructor.name}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="font-medium leading-none">{course.instructor.name}</p>
                  <p className="text-sm text-muted-foreground">{course.instructor.title}</p>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Your progress</span>
                <span className="text-sm font-medium">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
            <div className="flex flex-wrap gap-3">
              <Button>Continue Learning</Button>
              <Button variant="outline">
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
              </Button>
            </div>
          </div>
          <div className="rounded-lg border bg-card">
            <div className="aspect-video w-full overflow-hidden rounded-t-lg bg-muted">
              <img
                src="/placeholder.svg?height=250&width=500"
                alt="Course thumbnail"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="font-semibold">What you'll learn:</h3>
              <ul className="mt-2 space-y-2">
                <li className="flex gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span>Advanced JavaScript concepts and patterns</span>
                </li>
                <li className="flex gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span>Modern ES6+ features and best practices</span>
                </li>
                <li className="flex gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span>Functional programming in JavaScript</span>
                </li>
                <li className="flex gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span>Asynchronous programming with Promises</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Tabs defaultValue="curriculum" className="mt-8">
          <TabsList className="mb-4">
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="discussion">Discussion</TabsTrigger>
          </TabsList>
          <TabsContent value="curriculum" className="space-y-4">
            {course.modules.map((module, index) => (
              <div key={module.id} className="rounded-lg border">
                <div className="flex items-center justify-between border-b p-4">
                  <h3 className="text-lg font-medium">
                    Module {index + 1}: {module.title}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {module.lessons.filter((l) => l.completed).length}/{module.lessons.length} completed
                  </span>
                </div>
                <div className="divide-y">
                  {module.lessons.map((lesson) => (
                    <div key={lesson.id} className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <div className={`h-2 w-2 rounded-full ${lesson.completed ? "bg-primary" : "bg-muted"}`} />
                        <span className="font-medium">{lesson.title}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                        <Button variant="ghost" size="sm">
                          <Youtube className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="resources">
            <div className="rounded-lg border">
              <div className="border-b p-4">
                <h3 className="text-lg font-medium">Course Resources</h3>
              </div>
              <div className="divide-y">
                <div className="p-4">
                  <h4 className="mb-2 font-medium">JavaScript: The Definitive Guide</h4>
                  <p className="text-sm text-muted-foreground">Recommended reading for all JavaScript developers</p>
                  <Button variant="link" className="mt-2 h-auto p-0 text-primary">
                    Download PDF
                  </Button>
                </div>
                <div className="p-4">
                  <h4 className="mb-2 font-medium">Advanced Functions Cheat Sheet</h4>
                  <p className="text-sm text-muted-foreground">Quick reference for advanced function concepts</p>
                  <Button variant="link" className="mt-2 h-auto p-0 text-primary">
                    Download PDF
                  </Button>
                </div>
                <div className="p-4">
                  <h4 className="mb-2 font-medium">ES6+ Features Overview</h4>
                  <p className="text-sm text-muted-foreground">Comprehensive guide to modern JavaScript features</p>
                  <Button variant="link" className="mt-2 h-auto p-0 text-primary">
                    Download PDF
                  </Button>
                </div>
                <div className="p-4">
                  <h4 className="mb-2 font-medium">JavaScript Design Patterns Repository</h4>
                  <p className="text-sm text-muted-foreground">
                    GitHub repository with common design patterns implemented in JavaScript
                  </p>
                  <Button variant="link" className="mt-2 h-auto p-0 text-primary">
                    Open in GitHub
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="assignments" className="space-y-4">
            <div className="rounded-lg border">
              <div className="border-b p-4">
                <h3 className="text-lg font-medium">Module Assignments</h3>
              </div>
              <div className="divide-y">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Assignment 1: Closure Implementation</h4>
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      Completed
                    </span>
                  </div>
                  <p className="my-2 text-sm text-muted-foreground">
                    Implement a memoization function using closures to cache expensive calculations.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline">
                      View Submission
                    </Button>
                    <Button size="sm" variant="outline">
                      <Github className="mr-2 h-4 w-4" />
                      View on GitHub
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Assignment 2: Functional Programming</h4>
                    <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                      In Progress
                    </span>
                  </div>
                  <p className="my-2 text-sm text-muted-foreground">
                    Create a small library of functional programming utilities like map, filter, and reduce.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm">Continue Coding</Button>
                    <Button size="sm" variant="outline">
                      <Github className="mr-2 h-4 w-4" />
                      View on GitHub
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Assignment 3: ES6 Class Implementation</h4>
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                      Not Started
                    </span>
                  </div>
                  <p className="my-2 text-sm text-muted-foreground">
                    Build a small object-oriented system using ES6 classes with inheritance.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm">Start Assignment</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="discussion">
            <div className="rounded-lg border">
              <div className="border-b p-4">
                <h3 className="text-lg font-medium">Course Discussion</h3>
              </div>
              <div className="p-4">
                <div className="mb-4 space-y-4">
                  <div className="flex gap-4">
                    <img
                      src="/placeholder.svg?height=40&width=40"
                      alt="User avatar"
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex-1 rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <div>
                          <span className="font-medium">Alex Johnson</span>
                          <span className="ml-2 text-xs text-muted-foreground">2 days ago</span>
                        </div>
                      </div>
                      <p>
                        I'm having trouble understanding the difference between function currying and partial
                        application. Could someone explain?
                      </p>
                    </div>
                  </div>
                  <div className="ml-14 flex gap-4">
                    <img
                      src="/placeholder.svg?height=40&width=40"
                      alt="Instructor avatar"
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex-1 rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <div>
                          <span className="font-medium">Jane Smith</span>
                          <span className="ml-2 text-xs text-muted-foreground">1 day ago</span>
                          <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            Instructor
                          </span>
                        </div>
                      </div>
                      <p>
                        Great question! Currying converts a function that takes multiple arguments into a sequence of
                        functions that each take a single argument. Partial application, on the other hand, fixes a
                        number of arguments to a function, producing another function of smaller arity. I'll explain
                        this more in our next lesson!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <img src="/placeholder.svg?height=40&width=40" alt="Your avatar" className="h-10 w-10 rounded-full" />
                  <div className="flex-1">
                    <textarea
                      className="min-h-[100px] w-full rounded-lg border p-4"
                      placeholder="Write your comment here..."
                    ></textarea>
                    <div className="mt-2 flex justify-end">
                      <Button>Post Comment</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}

