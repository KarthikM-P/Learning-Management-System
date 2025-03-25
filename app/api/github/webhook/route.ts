import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    // Get the GitHub webhook payload
    const payload = await req.json()

    // Get the GitHub event from the headers
    const githubEvent = req.headers.get("x-github-event")

    // Handle different GitHub events
    if (githubEvent === "push") {
      // Process push event (e.g., student pushed code to assignment repo)
      const { repository, commits, sender } = payload

      // Here you would update your database with the submission details
      console.log(`Push to ${repository.full_name} by ${sender.login}`)
      console.log(`Commits: ${commits.length}`)

      // In a real application, you'd verify this is for a specific assignment
      // and update the student's submission status

      return NextResponse.json({
        message: "Webhook received and processed successfully",
      })
    }

    if (githubEvent === "pull_request") {
      // Handle pull request events
      const { action, pull_request, repository, sender } = payload

      console.log(`PR ${action} on ${repository.full_name} by ${sender.login}`)

      return NextResponse.json({
        message: "Pull request webhook processed",
      })
    }

    // For other GitHub events
    return NextResponse.json({
      message: `Received ${githubEvent} event`,
    })
  } catch (error) {
    console.error("Error processing GitHub webhook:", error)
    return NextResponse.json({ error: "Failed to process webhook" }, { status: 500 })
  }
}

