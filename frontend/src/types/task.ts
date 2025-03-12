export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in-progress",
  COMPLETED = "done",
}

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}

export interface Tag {
  id: number
  name: string
}

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  due_date?: string
  estimated_hours?: number
  created_at: string
  updated_at: string
  project_id?: number
  parent_task_id?: number
  tags?: Array<{
    id: string
    name: string
  }>
  ai_suggestions?: AISuggestion[]
}

export interface AISuggestion {
  id: number
  task_id: number
  suggestion_type: string
  content: string
  created_at: string
  is_applied: boolean
}

export interface Project {
  id: number
  name: string
  description?: string
  created_at: string
  tasks?: Task[]
} 