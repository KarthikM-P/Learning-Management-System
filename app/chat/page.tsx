"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DashboardShell } from "@/components/dashboard-shell"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { SendHorizontal } from "lucide-react"

export default function ChatPage() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "John Doe",
      role: "student",
      content: "Hi everyone! I'm having trouble with the Fibonacci sequence assignment. Any tips?",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      sender: "Jane Smith",
      role: "instructor",
      content:
        "Hi John! The key is to think about the base cases and then build up from there. Have you tried using memoization to improve performance?",
      timestamp: "10:32 AM",
    },
    {
      id: 3,
      sender: "Alex Johnson",
      role: "student",
      content:
        "I had the same issue last week. The recursive solution works but it's very slow for large values of n. I switched to an iterative approach and it was much faster.",
      timestamp: "10:35 AM",
    },
  ])

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "You",
          role: "student",
          content: message,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])
      setMessage("")

      // Simulate instructor response after a delay
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: prevMessages.length + 1,
            sender: "Jane Smith",
            role: "instructor",
            content:
              "Good question! Let me help you with that. Have you checked the course resources for additional examples?",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ])
      }, 2000)
    }
  }

  return (
    <DashboardShell>
      <div className="container mx-auto flex h-[calc(100vh-4rem)] flex-col">
        <div className="mb-4 flex justify-between border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold">Course Chat</h1>
            <p className="text-muted-foreground">Advanced JavaScript - General Discussion</p>
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-sm">24 online</span>
          </div>
        </div>

        <div className="flex-1 overflow-auto space-y-4 mb-4">
          {messages.map((msg) => (
            <div key={msg.id} className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${msg.sender.charAt(0)}`} />
                <AvatarFallback>{msg.sender.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-medium">{msg.sender}</span>
                  {msg.role === "instructor" && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      Instructor
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                </div>
                <p className="mt-1">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button onClick={sendMessage}>
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}

