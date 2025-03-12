"use client"

import { useQuery } from "@tanstack/react-query"
import { TaskColumn } from "./task-column"
import { TaskStatus } from "@/types/task"
import { fetchTasks } from "@/lib/api"

export function TaskBoard() {
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary" />
      </div>
    )
  }

  const columns = [
    {
      title: "Por Hacer",
      status: TaskStatus.TODO,
      tasks: tasks.filter((task) => task.status === TaskStatus.TODO),
    },
    {
      title: "En Progreso",
      status: TaskStatus.IN_PROGRESS,
      tasks: tasks.filter((task) => task.status === TaskStatus.IN_PROGRESS),
    },
    {
      title: "Completadas",
      status: TaskStatus.COMPLETED,
      tasks: tasks.filter((task) => task.status === TaskStatus.COMPLETED),
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <TaskColumn title="Por hacer" status="todo" />
      <TaskColumn title="En progreso" status="in-progress" />
      <TaskColumn title="Completado" status="done" />
    </div>
  )
} 