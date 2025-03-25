"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Github, PlayCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface CodeEditorProps {
  initialCode?: string
  language?: string
  assignmentId?: string
}

export function CodeEditorWithGithub({ initialCode = "", language = "javascript", assignmentId }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false)
  const [githubRepo, setGithubRepo] = useState("")
  const [githubFilename, setGithubFilename] = useState("")
  const [commitMessage, setCommitMessage] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  const runCode = async () => {
    setLoading(true)
    setOutput("")

    try {
      const response = await fetch("/api/code/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          language,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to execute code")
      }

      setOutput(data.output || "Execution successful")

      if (data.error) {
        setOutput(`Error: ${data.error}`)
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const pushToGithub = async () => {
    if (!githubRepo || !githubFilename || !commitMessage) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/github/push", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          filename: githubFilename,
          repository: githubRepo,
          message: commitMessage,
          assignmentId,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to push to GitHub")
      }

      toast({
        title: "Success!",
        description: "Code pushed to GitHub successfully",
      })

      setDialogOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border">
        <div className="flex items-center justify-between border-b px-4 py-2">
          <h3 className="font-medium">Code Editor ({language})</h3>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => setCode(initialCode)} disabled={code === initialCode}>
              Reset
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setCode("")} disabled={!code}>
              Clear
            </Button>
          </div>
        </div>
        <textarea
          className="w-full min-h-[400px] p-4 font-mono text-sm resize-none focus:outline-none"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={runCode} disabled={loading || !code}>
          <PlayCircle className="mr-2 h-4 w-4" />
          {loading ? "Running..." : "Run Code"}
        </Button>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" disabled={!code}>
              <Github className="mr-2 h-4 w-4" />
              Push to GitHub
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Push to GitHub</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="repo">Repository (username/repo)</Label>
                <Input
                  id="repo"
                  value={githubRepo}
                  onChange={(e) => setGithubRepo(e.target.value)}
                  placeholder="e.g. username/coding-challenges"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="filename">File Name</Label>
                <Input
                  id="filename"
                  value={githubFilename}
                  onChange={(e) => setGithubFilename(e.target.value)}
                  placeholder="e.g. fibonacci.js"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Commit Message</Label>
                <Textarea
                  id="message"
                  value={commitMessage}
                  onChange={(e) => setCommitMessage(e.target.value)}
                  placeholder="e.g. Add solution for fibonacci challenge"
                  rows={2}
                />
              </div>
              <Button
                className="w-full"
                onClick={pushToGithub}
                disabled={loading || !githubRepo || !githubFilename || !commitMessage}
              >
                {loading ? "Pushing..." : "Push to GitHub"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border">
        <div className="border-b px-4 py-2">
          <h3 className="font-medium">Output</h3>
        </div>
        <pre className="p-4 font-mono text-sm h-40 overflow-auto bg-muted/50">
          {output || "// Run your code to see output here"}
        </pre>
      </div>
    </div>
  )
}

