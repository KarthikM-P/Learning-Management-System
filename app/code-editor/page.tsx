"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Github, PlayCircle, Save } from "lucide-react"

export default function CodeEditorPage() {
  const [code, setCode] = useState(`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Test the function
console.log(fibonacci(10));
`)
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false)

  const runCode = () => {
    setLoading(true)
    setOutput("")

    // Simulate code execution
    setTimeout(() => {
      try {
        // In a real app, this would be done securely on the server
        // This is just for demonstration purposes
        const originalConsoleLog = console.log
        const logs = []

        console.log = (...args) => {
          logs.push(args.join(" "))
          originalConsoleLog(...args)
        }

        // Never do eval in production - this is just for demonstration
        const result = new Function(code)()
        console.log = originalConsoleLog

        setOutput(logs.join("\n"))
      } catch (error) {
        setOutput(`Error: ${error.message}`)
      }
      setLoading(false)
    }, 1000)
  }

  const pushToGithub = () => {
    // In a real application, this would integrate with GitHub API
    alert("Code would be pushed to GitHub repository")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Code Editor" text="Complete coding challenges and push your solutions to GitHub">
        <div className="flex gap-2">
          <Button variant="outline" onClick={pushToGithub}>
            <Github className="mr-2 h-4 w-4" />
            Push to GitHub
          </Button>
          <Button onClick={runCode} disabled={loading}>
            <PlayCircle className="mr-2 h-4 w-4" />
            {loading ? "Running..." : "Run Code"}
          </Button>
        </div>
      </DashboardHeader>

      <div className="grid gap-6">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium">Fibonacci Sequence Challenge</h2>
          <Badge>JavaScript</Badge>
          <Badge variant="outline">Medium</Badge>
        </div>

        <div className="rounded-lg border">
          <div className="p-4">
            <h3 className="font-medium">Task Description</h3>
            <p className="mt-2 text-muted-foreground">
              Implement a function to calculate the nth number in the Fibonacci sequence. The Fibonacci sequence is
              defined as: F(0) = 0, F(1) = 1, and F(n) = F(n-1) + F(n-2) for n &gt; 1.
            </p>
            <div className="mt-4">
              <h4 className="font-medium">Requirements:</h4>
              <ul className="mt-2 ml-6 list-disc text-muted-foreground">
                <li>Your function should be named `fibonacci`</li>
                <li>It should take a single parameter `n` (the position in the sequence)</li>
                <li>It should return the value at position `n` in the Fibonacci sequence</li>
                <li>Optimize your solution for performance if possible</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_300px]">
          <div className="space-y-4">
            <div className="rounded-lg border">
              <div className="flex items-center justify-between border-b px-4 py-2">
                <h3 className="font-medium">Code</h3>
                <Button variant="ghost" size="sm">
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </div>
              <textarea
                className="w-full min-h-[400px] p-4 font-mono text-sm resize-none focus:outline-none"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
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
          <div className="space-y-4">
            <div className="rounded-lg border">
              <div className="border-b px-4 py-2">
                <h3 className="font-medium">Hints</h3>
              </div>
              <div className="p-4">
                <Tabs defaultValue="hint1">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="hint1">Hint 1</TabsTrigger>
                    <TabsTrigger value="hint2">Hint 2</TabsTrigger>
                    <TabsTrigger value="hint3">Hint 3</TabsTrigger>
                  </TabsList>
                  <TabsContent value="hint1" className="mt-4 text-sm">
                    Start with the base cases: F(0) = 0 and F(1) = 1
                  </TabsContent>
                  <TabsContent value="hint2" className="mt-4 text-sm">
                    The recursive solution is elegant but inefficient. Consider a more optimized approach.
                  </TabsContent>
                  <TabsContent value="hint3" className="mt-4 text-sm">
                    Try using memoization or an iterative approach to improve performance.
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            <div className="rounded-lg border">
              <div className="border-b px-4 py-2">
                <h3 className="font-medium">GitHub Integration</h3>
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground">
                  Connect your GitHub account to submit your solutions directly to your repository.
                </p>
                <div className="mt-4">
                  <h4 className="text-sm font-medium">Repository</h4>
                  <div className="mt-2 flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    <span className="text-sm">username/coding-challenges</span>
                  </div>
                </div>
                <Separator className="my-4" />
                <div>
                  <h4 className="text-sm font-medium">Commit Message</h4>
                  <textarea
                    className="mt-2 w-full rounded-md border p-2 text-sm"
                    rows={2}
                    placeholder="Add Fibonacci sequence solution"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}

