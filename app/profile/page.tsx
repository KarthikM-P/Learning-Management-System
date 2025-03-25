import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { GitHubConnectButton } from "@/components/github-connect-button"
import { getCurrentUser } from "@/lib/auth"
import { connectToDatabase } from "@/lib/db"
import { ObjectId } from "mongodb"
import { Github } from "lucide-react"

async function getUserProfile(userId: string) {
  const { db } = await connectToDatabase()

  const user = await db.collection("users").findOne({
    _id: new ObjectId(userId),
  })

  if (!user) {
    return null
  }

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    image: user.image,
    githubUsername: user.githubUsername || null,
    createdAt: user.createdAt,
  }
}

export default async function ProfilePage() {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return null // This should be handled by middleware
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Profile" text="Manage your account settings and preferences" />

      <Suspense fallback={<div>Loading profile...</div>}>
        <ProfileContent userId={currentUser.id} />
      </Suspense>
    </DashboardShell>
  )
}

async function ProfileContent({ userId }: { userId: string }) {
  const profile = await getUserProfile(userId)

  if (!profile) {
    return <div>User profile not found</div>
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile.image || "/placeholder.svg?height=80&width=80"} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button variant="outline">Change Avatar</Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={profile.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue={profile.email} disabled />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Account Type</Label>
            <div className="rounded-md border px-3 py-2">{profile.role === "admin" ? "Administrator" : "Student"}</div>
          </div>

          <div className="space-y-2">
            <Label>Member Since</Label>
            <div className="rounded-md border px-3 py-2">
              {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "N/A"}
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>GitHub Integration</CardTitle>
          <CardDescription>Connect your GitHub account to submit assignments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {profile.githubUsername ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={`https://github.com/${profile.githubUsername}.png`} />
                  <AvatarFallback>GH</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{profile.githubUsername}</p>
                  <p className="text-sm text-muted-foreground">GitHub account connected</p>
                </div>
              </div>
              <Button variant="outline">Disconnect</Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 py-6">
              <div className="rounded-full bg-muted p-6">
                <Github className="h-8 w-8" />
              </div>
              <div className="text-center">
                <h3 className="font-medium">Connect GitHub Account</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Connect your GitHub account to submit assignments and projects
                </p>
              </div>
              <GitHubConnectButton />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Change your password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" />
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Change Password</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

