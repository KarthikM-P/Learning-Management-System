import type React from "react"
interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <a className="flex items-center gap-2 font-semibold" href="/">
          <span>LearningHub</span>
        </a>
        <nav className="hidden flex-1 items-center gap-6 text-lg font-medium md:flex">
          <a className="text-foreground" href="/dashboard">
            Dashboard
          </a>
          <a className="text-muted-foreground transition-colors hover:text-foreground" href="/courses">
            Courses
          </a>
          <a className="text-muted-foreground transition-colors hover:text-foreground" href="/assignments">
            Assignments
          </a>
          <a className="text-muted-foreground transition-colors hover:text-foreground" href="/chat">
            Chat
          </a>
        </nav>
        <div className="flex flex-1 items-center justify-end gap-4 md:flex-initial">
          <a className="flex items-center gap-2 font-medium" href="/profile">
            <span className="hidden sm:inline-block">Profile</span>
          </a>
        </div>
      </header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-6 md:gap-8">{children}</main>
    </div>
  )
}

