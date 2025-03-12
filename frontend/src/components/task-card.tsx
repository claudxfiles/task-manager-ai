import { Task, TaskPriority } from "@/types/task"
import { Card } from "./ui/card"
import { Badge } from "./ui/badge"
import { Calendar, Clock } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useTaskModal } from "@/hooks/use-task-modal"

const priorityColors = {
  [TaskPriority.LOW]: "bg-blue-100 text-blue-800",
  [TaskPriority.MEDIUM]: "bg-yellow-100 text-yellow-800",
  [TaskPriority.HIGH]: "bg-orange-100 text-orange-800",
  [TaskPriority.URGENT]: "bg-red-100 text-red-800",
}

interface TaskCardProps {
  title: string
  description: string
  status: "todo" | "in-progress" | "done"
}

export function TaskCard({ title, description, status }: TaskCardProps) {
  return (
    <div className="bg-background rounded-lg border p-4 shadow-sm">
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground mt-2">{description}</p>
      <div className="flex items-center mt-4">
        <span className="text-xs text-muted-foreground">{status}</span>
      </div>
    </div>
  )
} 