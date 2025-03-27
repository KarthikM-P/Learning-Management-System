"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookOpen, Github } from "lucide-react"
import { signIn } from "next-auth/react"
import { toast } from "@/hooks/use-toast"

export default function SignUp() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"student" | "instructor">("student")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          email,
          password,
          role,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to register")
      }

      toast({
        title: "Account created",
        description: "Your account has been created successfully",
      })

      // Sign in the user after successful registration
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      router.push("/dashboard")
  
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

  const handleGithubSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn("github", { callbackUrl: "/dashboard" })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign in with GitHub",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
      <div className="w-full max-w-md space-y-8 px-4 py-12">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Link href="/" className="flex items-center">
            <BookOpen className="h-8 w-8 mr-2" />
            <span className="text-2xl font-bold">LearningHub</span>
          </Link>
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="text-muted-foreground">Enter your details to create a new account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First name</Label>
              <Input
                id="first-name"
                placeholder="John"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input
                id="last-name"
                placeholder="Doe"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="m@example.com"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">I am a</Label>
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant={role === "student" ? "default" : "outline"}
                className="justify-center"
                onClick={() => setRole("student")}
                disabled={isLoading}
              >
                Student
              </Button>
              <Button
                type="button"
                variant={role === "instructor" ? "default" : "outline"}
                className="justify-center"
                onClick={() => setRole("instructor")}
                disabled={isLoading}
              >
                Instructor
              </Button>
            </div>
          </div>
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <Button variant="outline" className="w-full" onClick={handleGithubSignIn} disabled={isLoading}>
          <Github className="mr-2 h-4 w-4" />
          GitHub
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link className="underline" href="/sign-in">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

