"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { toast } from "@/hooks/use-toast"

export default function EditCoursePage({ params }: { params: { courseId: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [course, setCourse] = useState<any>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [duration, setDuration] = useState("")
  const [category, setCategory] = useState("")
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [resources, setResources] = useState<{ title: string; type: string }[]>([])
  const [newResourceTitle, setNewResourceTitle] = useState("")
  const [newResourceType, setNewResourceType] = useState("video")

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${params.courseId}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch course")
        }

        setCourse(data.course)
        setTitle(data.course.title)
        setDescription(data.course.description)
        setDuration(data.course.duration)
        setCategory(data.course.category || "")
        setStartDate(data.course.startDate ? new Date(data.course.startDate) : undefined)
        setEndDate(data.course.endDate ? new Date(data.course.endDate) : undefined)

        // Fetch resources
        const resourcesResponse = await fetch(`/api/courses/${params.courseId}/resources`)
        const resourcesData = await resourcesResponse.json()

        if (resourcesResponse.ok) {
          setResources(
            resourcesData.resources.map((resource: any) => ({
              id: resource._id,
              title: resource.title,
              type: resource.type,
            })),
          )
        }
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
      }
    }

    fetchCourse()
  }, [params.courseId])

  const addResource = () => {
    if (newResourceTitle.trim()) {
      setResources([...resources, { title: newResourceTitle, type: newResourceType }])
      setNewResourceTitle("")
    }
  }

  const removeResource = (index: number) => {
    const updatedResources = [...resources]
    updatedResources.splice(index, 1)
    setResources(updatedResources)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Update course
      const courseResponse = await fetch(`/api/courses/${params.courseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          duration,
          category,
          startDate,
          endDate,
        }),
      })

      const courseData = await courseResponse.json()

      if (!courseResponse.ok) {
        throw new Error(courseData.error || "Failed to update course")
      }

      // Add new resources
      const newResources = resources.filter((resource) => !resource.id)

      for (const resource of newResources) {
        const resourceResponse = await fetch(`/api/courses/${params.courseId}/resources`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: resource.title,
            type: resource.type,
          }),
        })

        if (!resourceResponse.ok) {
          const resourceData = await resourceResponse.json()
          throw new Error(resourceData.error || "Failed to add resource")
        }
      }

      toast({
        title: "Success",
        description: "Course updated successfully",
      })

      router.push("/admin/courses")
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!course) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Edit Course" text="Loading course details..." />
        <div className="flex items-center justify-center p-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Edit Course" text="Update course details and resources">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </DashboardHeader>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Course Details</CardTitle>
            <CardDescription>Update the information for this course</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Advanced JavaScript"
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide a detailed description of your course"
                className="min-h-32"
                disabled={isLoading}
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (weeks)</Label>
                <Input
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 8"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory} disabled={isLoading}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="node">Node.js</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="databases">Databases</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground",
                      )}
                      disabled={isLoading}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                      disabled={isLoading}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Course Resources</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Add videos, articles, and other resources for your course
                </p>
              </div>
              <div className="flex gap-2">
                <Input
                  value={newResourceTitle}
                  onChange={(e) => setNewResourceTitle(e.target.value)}
                  placeholder="Resource title"
                  className="flex-1"
                  disabled={isLoading}
                />
                <Select value={newResourceType} onValueChange={setNewResourceType} disabled={isLoading}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Resource type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="code">Code Sample</SelectItem>
                    <SelectItem value="quiz">Quiz</SelectItem>
                  </SelectContent>
                </Select>
                <Button type="button" onClick={addResource} disabled={isLoading || !newResourceTitle.trim()}>
                  Add
                </Button>
              </div>
              <div className="space-y-2">
                {resources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between rounded-md border p-3">
                    <div className="flex items-center gap-2">
                      <div>
                        <p className="font-medium">{resource.title}</p>
                        <p className="text-sm text-muted-foreground">{resource.type}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeResource(index)} disabled={isLoading}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {resources.length === 0 && (
                  <p className="text-sm italic text-muted-foreground">No resources added yet</p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-6">
            <Button variant="outline" type="button" onClick={() => router.back()} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Course"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </DashboardShell>
  )
}

