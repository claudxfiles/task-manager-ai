export type GoalType = "desarrollo" | "salud" | "educacion" | "finanzas" | "hobby";
export type GoalStatus = "pendiente" | "en progreso" | "completada";
export type GoalPriority = "alta" | "media" | "baja";

export interface Goal {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: GoalPriority;
  status: GoalStatus;
  goalType: GoalType;
  progress: number;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  dueDate?: string;
  priority: GoalPriority;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: GoalPriority;
  status: GoalStatus;
  tasks: Task[];
  points: number;
}

export interface LifeArea {
  id: string;
  name: string;
  description: string;
  icon: string;
  projects: Project[];
}

export interface FinancialAccount {
  id: string;
  name: string;
  balance: number;
  currency: string;
  type: "checking" | "savings" | "investment" | "credit";
} 