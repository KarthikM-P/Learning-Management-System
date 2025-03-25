"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

export function GitHubConnectButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleConnect = () => {
    setIsLoading(true)

    // Redirect to GitHub OAuth flow
    const clientId = process.env.NEXT_PUBLIC_GITHUB_ID
    const redirectUri = `${window.location.origin}/api/github/oauth`
    const scope = "repo" // Permissions needed

    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`
  }

  return (
    <Button variant="outline" onClick={handleConnect} disabled={isLoading}>
      <Github className="mr-2 h-4 w-4" />
      {isLoading ? "Connecting..." : "Connect GitHub Account"}
    </Button>
  )
}

