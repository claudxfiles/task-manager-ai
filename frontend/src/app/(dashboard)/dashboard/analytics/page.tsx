"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  TrendingUp,
  Target,
  Calendar,
  Brain,
  CheckCircle,
  Clock,
  BarChart,
  Activity,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Goal, GoalStatus } from "@/types/goals";
import { Habit } from "@/types/habits";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Función para calcular la diferencia de días entre dos fechas
function daysBetween(date1: Date, date2: Date) {
  const oneDay = 24 * 60 * 60 * 1000; // horas*minutos*segundos*milisegundos
  const diffDays = Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
  return diffDays;
}

// Función para formatear fechas relativas
function formatRelativeTime(date: Date) {
  const now = new Date();
  const diffDays = daysBetween(now, date);
  
  if (diffDays === 0) return "Hoy";
  if (diffDays === 1) return "Ayer";
  if (diffDays < 7) return `Hace ${diffDays} días`;
  if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
  if (diffDays < 365) return `Hace ${Math.floor(diffDays / 30)} meses`;
  return `Hace ${Math.floor(diffDays / 365)} años`;
}

export default function AnalyticsPage() {
  // Obtener datos de metas y hábitos del almacenamiento local
  const [goals, setGoals] = useLocalStorage<Goal[]>("user_goals", []);
  const [habits, setHabits] = useLocalStorage<Habit[]>("user_habits", []);
  const [timeFrame, setTimeFrame] = useState<"week" | "month" | "year">("month");
  
  // Estadísticas calculadas
  const [stats, setStats] = useState([
    {
      name: "Metas Completadas",
      value: "0",
      change: "0%",
      trend: "up",
      icon: CheckCircle,
      color: "from-soul-purple to-soul-blue",
    },
    {
      name: "Tiempo Promedio",
      value: "0 días",
      change: "0%",
      trend: "neutral",
      icon: Clock,
      color: "from-soul-blue to-soul-green",
    },
    {
      name: "Tasa de Éxito",
      value: "0%",
      change: "0%",
      trend: "neutral",
      icon: TrendingUp,
      color: "from-soul-green to-soul-purple",
    },
  ]);

  // Actividades generadas a partir de metas y hábitos
  const [activities, setActivities] = useState<any[]>([]);

  // Calcular estadísticas basadas en metas y hábitos
  useEffect(() => {
    if (!goals || !habits) return;

    // Metas completadas
    const completedGoals = goals.filter(goal => goal.status === "completada");
    const completedGoalsCount = completedGoals.length;
    
    // Calcular cambio en metas completadas (simulado)
    const previousCompletedGoals = completedGoalsCount > 0 ? completedGoalsCount - Math.floor(completedGoalsCount * 0.25) : 0;
    const completedGoalsChange = previousCompletedGoals > 0 
      ? Math.round(((completedGoalsCount - previousCompletedGoals) / previousCompletedGoals) * 100)
      : 0;
    
    // Tiempo promedio para completar metas
    let totalDays = 0;
    let goalsWithDates = 0;
    
    completedGoals.forEach(goal => {
      if (goal.createdAt && goal.updatedAt) {
        const createdDate = new Date(goal.createdAt);
        const completedDate = new Date(goal.updatedAt);
        totalDays += daysBetween(createdDate, completedDate);
        goalsWithDates++;
      }
    });
    
    const averageDays = goalsWithDates > 0 ? Math.round(totalDays / goalsWithDates) : 28;
    
    // Simular cambio en tiempo promedio
    const previousAverageDays = averageDays > 0 ? averageDays + Math.floor(averageDays * 0.12) : 30;
    const averageDaysChange = previousAverageDays > 0 
      ? Math.round(((previousAverageDays - averageDays) / previousAverageDays) * 100)
      : 0;
    
    // Tasa de éxito
    const totalGoals = goals.length > 0 ? goals.length : 1;
    const successRate = Math.round((completedGoalsCount / totalGoals) * 100);
    
    // Simular cambio en tasa de éxito
    const previousSuccessRate = successRate > 0 ? successRate - 5 : 80;
    const successRateChange = previousSuccessRate > 0 
      ? Math.round(((successRate - previousSuccessRate) / previousSuccessRate) * 100)
      : 0;
    
    // Actualizar estadísticas
    setStats([
      {
        name: "Metas Completadas",
        value: completedGoalsCount.toString(),
        change: `${completedGoalsChange > 0 ? '+' : ''}${completedGoalsChange}%`,
        trend: completedGoalsChange >= 0 ? "up" : "down",
        icon: CheckCircle,
        color: "from-soul-purple to-soul-blue",
      },
      {
        name: "Tiempo Promedio",
        value: `${averageDays} días`,
        change: `${averageDaysChange > 0 ? '-' : '+'}${Math.abs(averageDaysChange)}%`,
        trend: averageDaysChange > 0 ? "down" : "up",
        icon: Clock,
        color: "from-soul-blue to-soul-green",
      },
      {
        name: "Tasa de Éxito",
        value: `${successRate}%`,
        change: `${successRateChange > 0 ? '+' : ''}${successRateChange}%`,
        trend: successRateChange >= 0 ? "up" : "down",
        icon: TrendingUp,
        color: "from-soul-green to-soul-purple",
      },
    ]);
    
    // Generar historial de actividades
    const allActivities: any[] = [];
    
    // Agrupar por mes
    const months: Record<string, any[]> = {};
    
    // Procesar metas
    goals.forEach(goal => {
      const date = new Date(goal.updatedAt || goal.createdAt);
      const monthYear = `${date.toLocaleString('es', { month: 'long' })} ${date.getFullYear()}`;
      
      if (!months[monthYear]) {
        months[monthYear] = [];
      }
      
      if (goal.status === "completada") {
        months[monthYear].push({
          title: `Meta completada: '${goal.title}'`,
          description: goal.description ? `${goal.description.substring(0, 50)}${goal.description.length > 50 ? '...' : ''}` : 
                      `Completado en ${daysBetween(new Date(goal.createdAt), new Date(goal.updatedAt))} días`,
          icon: CheckCircle,
          timestamp: formatRelativeTime(new Date(goal.updatedAt)),
          date: new Date(goal.updatedAt),
        });
      } else if (goal.status === "en progreso") {
        months[monthYear].push({
          title: `Nueva meta: '${goal.title}'`,
          description: `Progreso actual: ${goal.progress}%`,
          icon: Target,
          timestamp: formatRelativeTime(new Date(goal.createdAt)),
          date: new Date(goal.createdAt),
        });
      }
    });
    
    // Procesar hábitos
    habits.forEach(habit => {
      const date = new Date(habit.createdAt);
      const monthYear = `${date.toLocaleString('es', { month: 'long' })} ${date.getFullYear()}`;
      
      if (!months[monthYear]) {
        months[monthYear] = [];
      }
      
      months[monthYear].push({
        title: `Nuevo hábito: '${habit.name}'`,
        description: `Frecuencia: ${habit.frequency} veces por semana`,
        icon: Activity,
        timestamp: formatRelativeTime(date),
        date,
      });
    });
    
    // Añadir análisis periódicos (simulados)
    const now = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const lastMonthStr = `${lastMonth.toLocaleString('es', { month: 'long' })} ${lastMonth.getFullYear()}`;
    
    if (!months[lastMonthStr]) {
      months[lastMonthStr] = [];
    }
    
    months[lastMonthStr].push({
      title: "Análisis de progreso",
      description: "Revisión mensual de objetivos",
      icon: BarChart,
      timestamp: "Hace 1 mes",
      date: lastMonth,
    });
    
    // Convertir el objeto de meses a un array ordenado por fecha
    Object.keys(months).forEach(monthYear => {
      // Ordenar actividades dentro del mes por fecha (más recientes primero)
      months[monthYear].sort((a, b) => b.date.getTime() - a.date.getTime());
      
      allActivities.push({
        date: monthYear,
        items: months[monthYear],
      });
    });
    
    // Ordenar meses (más recientes primero)
    allActivities.sort((a, b) => {
      const dateA = new Date(a.items[0].date);
      const dateB = new Date(b.items[0].date);
      return dateB.getTime() - dateA.getTime();
    });
    
    setActivities(allActivities);
  }, [goals, habits]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <motion.h1
          className="text-3xl font-bold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Análisis
        </motion.h1>
        <motion.p
          className="text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Visualiza tu progreso y rendimiento
        </motion.p>
      </div>

      {/* Filtros */}
      <div className="flex justify-end">
        <Select value={timeFrame} onValueChange={(value: "week" | "month" | "year") => setTimeFrame(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Periodo de tiempo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Última semana</SelectItem>
            <SelectItem value="month">Último mes</SelectItem>
            <SelectItem value="year">Último año</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{stat.name}</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    <span className={`text-sm ${
                      stat.trend === 'up' 
                        ? 'text-green-500 flex items-center' 
                        : stat.trend === 'down' 
                          ? 'text-red-500 flex items-center' 
                          : 'text-gray-500'
                    }`}>
                      {stat.change}
                      {stat.trend === 'up' && <ArrowUpRight className="h-3 w-3 ml-1" />}
                      {stat.trend === 'down' && <ArrowDownRight className="h-3 w-3 ml-1" />}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tabs de análisis */}
      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="timeline">Historial de Actividad</TabsTrigger>
          <TabsTrigger value="progress">Progreso por Área</TabsTrigger>
        </TabsList>
        
        {/* Historial de Actividad */}
        <TabsContent value="timeline" className="space-y-4 mt-6">
          <div className="space-y-8">
            {activities.length > 0 ? (
              activities.map((period, periodIndex) => (
                <div key={period.date}>
                  <motion.h3
                    className="text-sm font-medium text-muted-foreground mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + periodIndex * 0.1 }}
                  >
                    {period.date}
                  </motion.h3>

                  <div className="space-y-4">
                    {period.items.map((item: any, itemIndex: number) => (
                      <motion.div
                        key={itemIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.5 + periodIndex * 0.1 + itemIndex * 0.1,
                        }}
                      >
                        <Card className="p-4">
                          <div className="flex gap-4">
                            <div className="mt-1">
                              <item.icon className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-medium">{item.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {item.description}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {item.timestamp}
                              </p>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <Card className="p-6 text-center">
                <p className="text-muted-foreground">No hay actividades registradas aún.</p>
                <p className="text-sm mt-2">Comienza a crear metas y hábitos para ver tu progreso aquí.</p>
              </Card>
            )}
          </div>
        </TabsContent>
        
        {/* Progreso por Área */}
        <TabsContent value="progress" className="space-y-6 mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Progreso por Área de Vida</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Desarrollo Personal</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Salud y Bienestar</span>
                  <span>60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Educación</span>
                  <span>85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Finanzas</span>
                  <span>40%</span>
                </div>
                <Progress value={40} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Hobbies</span>
                  <span>50%</span>
                </div>
                <Progress value={50} className="h-2" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Consistencia de Hábitos</h3>
            <div className="space-y-6">
              {habits.length > 0 ? (
                habits.map((habit, index) => (
                  <div key={habit.id} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{habit.name}</span>
                      <span>{Math.floor(Math.random() * 40) + 60}%</span>
                    </div>
                    <Progress value={Math.floor(Math.random() * 40) + 60} className="h-2" />
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center">No hay hábitos registrados aún.</p>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 