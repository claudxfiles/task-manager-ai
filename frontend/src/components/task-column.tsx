import { TaskCard } from "./task-card"

interface TaskColumnProps {
  title: string
  status: "todo" | "in-progress" | "done"
}

export function TaskColumn({ title, status }: TaskColumnProps) {
  return (
    <div className="bg-card rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        <TaskCard
          title="Ejemplo de tarea"
          description="Esta es una tarea de ejemplo"
          status={status}
        />
      </div>
    </div>
  )
} 