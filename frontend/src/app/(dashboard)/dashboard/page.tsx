"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Target, CheckSquare, Calendar, Trophy, TrendingUp, DollarSign, Brain, Activity } from "lucide-react";

interface DashboardStat {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export default function DashboardPage() {
  const [habits] = useLocalStorage("habits", []);
  const [goals] = useLocalStorage("user_goals", []);
  const [finances] = useLocalStorage("finances", { balance: 0, transactions: [] });
  const [dailyProgress, setDailyProgress] = useState(0);
  const [weeklyProgress, setWeeklyProgress] = useState(0);

  // Calcular el progreso diario y semanal
  useEffect(() => {
    if (habits.length === 0) return;
    
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());

    const completedToday = habits.filter((habit: any) => {
      const lastCompleted = new Date(habit.lastCompleted);
      return lastCompleted.toDateString() === today.toDateString();
    }).length;

    const completedThisWeek = habits.filter((habit: any) => {
      const lastCompleted = new Date(habit.lastCompleted);
      return lastCompleted >= weekStart;
    }).length;
    
    const dailyProgress = Math.round((completedToday / habits.length) * 100);
    const weeklyProgress = Math.round((completedThisWeek / (habits.length * 7)) * 100);
    
    setDailyProgress(dailyProgress);
    setWeeklyProgress(weeklyProgress);
  }, [habits]);

  const stats: DashboardStat[] = [
    {
      title: "Metas Activas",
      value: goals.length.toString(),
      description: `${goals.filter((g: any) => g.progress >= 50).length} metas > 50%`,
      icon: <Target className="h-4 w-4" />,
      color: "bg-blue-500"
    },
    {
      title: "Hábitos",
      value: `${dailyProgress}%`,
      description: `${habits.length} hábitos en seguimiento`,
      icon: <CheckSquare className="h-4 w-4" />,
      color: "bg-green-500"
    },
    {
      title: "Finanzas",
      value: `$${finances.balance.toFixed(2)}`,
      description: "Balance actual",
      icon: <DollarSign className="h-4 w-4" />,
      color: "bg-emerald-500"
    },
    {
      title: "Productividad",
      value: `${weeklyProgress}%`,
      description: "Progreso semanal",
      icon: <Activity className="h-4 w-4" />,
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Brain className="mr-2 h-4 w-4" />
            Análisis IA
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden">
              <div className="p-6 flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-full ${stat.color} bg-opacity-10`}>
                    {stat.icon}
                  </div>
                  <h3 className="text-sm font-medium">{stat.title}</h3>
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>
              <div className={`absolute bottom-0 left-0 h-1 ${stat.color}`} style={{ width: `${dailyProgress}%` }} />
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <div className="p-6">
            <h3 className="text-lg font-medium">Progreso de Metas</h3>
            <div className="mt-4 space-y-2">
              {goals.slice(0, 3).map((goal: any) => (
                <div key={goal.id} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{goal.title}</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} />
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="col-span-3">
          <div className="p-6">
            <h3 className="text-lg font-medium">Hábitos de Hoy</h3>
            <div className="mt-4 space-y-2">
              {habits.slice(0, 4).map((habit: any) => (
                <div key={habit.id} className="flex items-center justify-between">
                  <span className="text-sm">{habit.title}</span>
                  <CheckSquare 
                    className={`h-4 w-4 ${habit.completed ? 'text-green-500' : 'text-gray-300'}`} 
                  />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 