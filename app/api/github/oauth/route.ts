import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import { ObjectId } from "mongodb"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const code = searchParams.get("code")

    if (!code) {
      return NextResponse.json({ error: "No code provided" }, { status: 400 })
    }

    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Exchange code for access token
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_ID,
        client_secret: process.env.GITHUB_SECRET,
        code,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (tokenData.error) {
      return NextResponse.json({ error: tokenData.error_description || "Failed to get access token" }, { status: 400 })
    }

    const accessToken = tokenData.access_token

    // Get user's GitHub info
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    })

    const githubUser = await githubUserResponse.json()

    // Store GitHub info in database
    const { db } = await connectToDatabase()

    await db.collection("users").updateOne(
      { _id: new ObjectId(user.id) },
      {
        $set: {
          githubUsername: githubUser.login,
          githubAccessToken: accessToken, // In production, encrypt this token
          githubId: githubUser.id,
          updatedAt: new Date(),
        },
      },
    )

    // Redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", req.url))
  } catch (error) {
    console.error("GitHub OAuth error:", error)
    return NextResponse.json({ error: "Failed to process GitHub authentication" }, { status: 500 })
  }
}

