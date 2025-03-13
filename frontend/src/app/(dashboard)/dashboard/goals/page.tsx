"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, CheckCircle2, Circle, MoreVertical, Trophy, Users, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { GoalType } from "@/services/goalClassifier";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SubTask {
  id: number;
  title: string;
  completed: boolean;
}

type GoalStatus = "pendiente" | "en progreso" | "completada";
type GoalPriority = "alta" | "media" | "baja";

interface Goal {
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

interface Task {
  id: number;
  title: string;
  completed: boolean;
  dueDate?: string;
  priority: "alta" | "media" | "baja";
}

interface Project {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: "alta" | "media" | "baja";
  status: "pendiente" | "en progreso" | "completada";
  tasks: Task[];
  points: number;
}

interface LifeArea {
  id: string;
  name: string;
  description: string;
  icon: string;
  projects: Project[];
}

interface FinancialAccount {
  id: string;
  name: string;
  balance: number;
  currency: string;
  type: "checking" | "savings" | "investment" | "credit";
}

// Datos de ejemplo para la tabla de clasificación
const leaderboardData = [
  { id: 1, name: "Carlos Rodríguez", points: 1250, avatar: "/avatars/user1.png" },
  { id: 2, name: "María López", points: 980, avatar: "/avatars/user2.png" },
  { id: 3, name: "Tu", points: 820, avatar: "/avatars/user3.png", isCurrentUser: true },
  { id: 4, name: "Juan Pérez", points: 750, avatar: "/avatars/user4.png" },
  { id: 5, name: "Ana García", points: 620, avatar: "/avatars/user5.png" },
];

const LIFE_AREAS: LifeArea[] = [
  {
    id: "desarrollo",
    name: "Desarrollo Personal",
    description: "Metas enfocadas en tu crecimiento personal",
    icon: "💼",
    projects: []
  },
  {
    id: "salud",
    name: "Salud y Bienestar",
    description: "Metas relacionadas con tu salud física y mental",
    icon: "💪",
    projects: []
  },
  {
    id: "educacion",
    name: "Educación",
    description: "Metas académicas y de aprendizaje",
    icon: "📚",
    projects: []
  },
  {
    id: "finanzas",
    name: "Finanzas",
    description: "Metas financieras y económicas",
    icon: "💰",
    projects: []
  },
  {
    id: "hobby",
    name: "Hobbies",
    description: "Metas relacionadas con tus pasatiempos",
    icon: "🎨",
    projects: []
  }
];

const CURRENCIES = [
  { code: "USD", symbol: "$", name: "Dólar estadounidense" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "MXN", symbol: "$", name: "Peso mexicano" },
  { code: "CLP", symbol: "$", name: "Peso chileno" },
  // Añade más monedas según necesites
];

const ProjectCard = ({ 
  project, 
  onUpdateProject, 
  onDeleteProject, 
  onToggleTask 
}: { 
  project: Project;
  onUpdateProject: (projectId: number, updates: Partial<Project>) => void;
  onDeleteProject: (projectId: number) => void;
  onToggleTask: (projectId: number, taskId: number) => void;
}) => {
  return (
    <Card className="p-4 space-y-3">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg">{project.title}</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onUpdateProject(project.id, {})}>
              Editar proyecto
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDeleteProject(project.id)}>
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {project.description && (
        <p className="text-sm text-muted-foreground">{project.description}</p>
      )}
      
      <div className="flex flex-wrap gap-2">
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
          {project.status}
        </span>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
          {project.priority}
        </span>
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span>Progreso</span>
          <span>{calculateProgress(project)}%</span>
        </div>
        <Progress value={calculateProgress(project)} className="h-2" />
      </div>
      
      {project.tasks.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium">
            Tareas ({project.tasks.filter(t => t.completed).length}/{project.tasks.length})
          </p>
          <div className="space-y-1 max-h-36 overflow-y-auto">
            {project.tasks.map((task) => (
              <div key={task.id} className="flex items-center gap-2 text-sm">
                <button 
                  onClick={() => onToggleTask(project.id, task.id)}
                  className="flex-shrink-0"
                >
                  {task.completed ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
                <span className={task.completed ? "line-through text-muted-foreground" : ""}>
                  {task.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <p className="text-sm text-muted-foreground">
        Fecha límite: {new Date(project.dueDate).toLocaleDateString()}
      </p>
      
      {project.points > 0 && (
        <div className="flex items-center gap-1 text-sm">
          <Trophy className="h-4 w-4 text-yellow-500" />
          <span className="font-medium">{project.points} puntos</span>
        </div>
      )}
    </Card>
  );
};

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Goals</h2>
        <Button>Add Goal</Button>
      </div>
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Goals</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          {goals.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {goals.map((goal) => (
                <Card key={goal.id} className="p-6">
                  <h3 className="font-semibold">{goal.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {goal.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Due: {new Date(goal.dueDate).toLocaleDateString()}
                    </span>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
                      {goal.status}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-6">
              <div className="text-center">
                <h3 className="font-semibold">No goals yet</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Create your first goal to get started
                </p>
              </div>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="pending" className="space-y-4">
          {/* Similar structure for pending goals */}
        </TabsContent>
        <TabsContent value="in-progress" className="space-y-4">
          {/* Similar structure for in-progress goals */}
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          {/* Similar structure for completed goals */}
        </TabsContent>
      </Tabs>
    </div>
  );
} 