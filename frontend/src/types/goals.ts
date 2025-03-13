export interface Task {
  id: number;
  title: string;
  completed: boolean;
  dueDate?: string;
  priority: "alta" | "media" | "baja";
}

export interface Project {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: "alta" | "media" | "baja";
  status: "pendiente" | "en progreso" | "completada";
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