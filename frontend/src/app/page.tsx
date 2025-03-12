import { Metadata } from "next"
import { TaskBoard } from "@/components/task-board"
import { TaskSidebar } from "@/components/task-sidebar"

export const metadata: Metadata = {
  title: "Dashboard - Task Manager",
  description: "Gestiona tus tareas de manera eficiente",
}

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <TaskSidebar />
      <div className="flex-1">
        <TaskBoard />
      </div>
    </main>
  )
} 