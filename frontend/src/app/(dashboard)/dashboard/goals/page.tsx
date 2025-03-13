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
  const [goals, setGoals] = useLocalStorage<Goal[]>("user_goals", []);
  const [selectedArea, setSelectedArea] = useState<string>("all");
  const [showNewGoalDialog, setShowNewGoalDialog] = useState(false);
  const [newGoal, setNewGoal] = useState<Partial<Goal>>({
    title: "",
    description: "",
    dueDate: "",
    priority: "media",
    status: "pendiente",
    progress: 0
  });

  const filteredGoals = goals.filter(goal => 
    selectedArea === "all" || goal.goalType === selectedArea
  );

  const goalsByStatus = {
    pendiente: filteredGoals.filter(g => g.status === "pendiente"),
    "en progreso": filteredGoals.filter(g => g.status === "en progreso"),
    completada: filteredGoals.filter(g => g.status === "completada")
  };

  const handleCreateGoal = () => {
    if (!newGoal.title) return;

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description || "",
      dueDate: newGoal.dueDate || new Date().toISOString(),
      priority: newGoal.priority as GoalPriority,
      status: newGoal.status as GoalStatus,
      goalType: selectedArea === "all" ? "desarrollo" : selectedArea as GoalType,
      progress: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setGoals([...goals, goal]);
    setShowNewGoalDialog(false);
    setNewGoal({
      title: "",
      description: "",
      dueDate: "",
      priority: "media",
      status: "pendiente",
      progress: 0
    });
  };

  const updateGoalStatus = (goalId: string, newStatus: GoalStatus) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, status: newStatus, updatedAt: new Date().toISOString() }
        : goal
    ));
  };

  const updateGoalProgress = (goalId: string, progress: number) => {
    setGoals(goals.map(goal =>
      goal.id === goalId
        ? { ...goal, progress, updatedAt: new Date().toISOString() }
        : goal
    ));
  };

  const deleteGoal = (goalId: string) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Metas</h2>
          <p className="text-muted-foreground">
            Gestiona y da seguimiento a tus metas personales
          </p>
        </div>
        <Dialog open={showNewGoalDialog} onOpenChange={setShowNewGoalDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Meta
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Nueva Meta</DialogTitle>
              <DialogDescription>
                Define los detalles de tu nueva meta
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={newGoal.title}
                  onChange={e => setNewGoal({ ...newGoal, title: e.target.value })}
                  placeholder="Ej: Aprender un nuevo idioma"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={newGoal.description}
                  onChange={e => setNewGoal({ ...newGoal, description: e.target.value })}
                  placeholder="Describe tu meta..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="dueDate">Fecha límite</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newGoal.dueDate}
                    onChange={e => setNewGoal({ ...newGoal, dueDate: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="priority">Prioridad</Label>
                  <Select
                    value={newGoal.priority}
                    onValueChange={value => setNewGoal({ ...newGoal, priority: value as GoalPriority })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona la prioridad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="media">Media</SelectItem>
                      <SelectItem value="baja">Baja</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewGoalDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateGoal}>Crear Meta</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todas</TabsTrigger>
          {LIFE_AREAS.map(area => (
            <TabsTrigger key={area.id} value={area.id}>
              {area.icon} {area.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(goalsByStatus).map(([status, statusGoals]) => (
              <Card key={status} className="p-6">
                <h3 className="font-semibold text-lg capitalize mb-4">{status}</h3>
                <div className="space-y-4">
                  {statusGoals.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No hay metas en esta categoría</p>
                  ) : (
                    statusGoals.map(goal => (
                      <Card key={goal.id} className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{goal.title}</h4>
                            <p className="text-sm text-muted-foreground">{goal.description}</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => updateGoalStatus(goal.id, "pendiente")}>
                                Marcar como Pendiente
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateGoalStatus(goal.id, "en progreso")}>
                                Marcar En Progreso
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateGoalStatus(goal.id, "completada")}>
                                Marcar como Completada
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => deleteGoal(goal.id)}>
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progreso</span>
                            <span>{goal.progress}%</span>
                          </div>
                          <Progress value={goal.progress} />
                        </div>
                        <div className="mt-4 flex gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(goal.priority)}`}>
                            {goal.priority}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Vence: {new Date(goal.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {LIFE_AREAS.map(area => (
          <TabsContent key={area.id} value={area.id}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Similar content as "all" tab but filtered by area */}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function getPriorityColor(priority: GoalPriority) {
  switch (priority) {
    case "alta":
      return "bg-red-100 text-red-800";
    case "media":
      return "bg-yellow-100 text-yellow-800";
    case "baja":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getStatusColor(status: GoalStatus) {
  switch (status) {
    case "pendiente":
      return "bg-gray-100 text-gray-800";
    case "en progreso":
      return "bg-blue-100 text-blue-800";
    case "completada":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function calculateProgress(project: Project): number {
  if (project.tasks.length === 0) return 0;
  const completedTasks = project.tasks.filter(task => task.completed).length;
  return Math.round((completedTasks / project.tasks.length) * 100);
} 