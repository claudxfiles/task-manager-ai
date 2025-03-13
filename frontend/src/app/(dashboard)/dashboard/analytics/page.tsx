"use client";

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
} from "lucide-react";

const stats = [
  {
    name: "Metas Completadas",
    value: "12",
    change: "+33%",
    trend: "up",
    icon: CheckCircle,
    color: "from-soul-purple to-soul-blue",
  },
  {
    name: "Tiempo Promedio",
    value: "28 días",
    change: "-12%",
    trend: "down",
    icon: Clock,
    color: "from-soul-blue to-soul-green",
  },
  {
    name: "Tasa de Éxito",
    value: "85%",
    change: "+5%",
    trend: "up",
    icon: TrendingUp,
    color: "from-soul-green to-soul-purple",
  },
];

const activities = [
  {
    date: "Marzo 2024",
    items: [
      {
        title: "Meta completada: 'Aprender Next.js'",
        description: "Completado en 28 días",
        icon: CheckCircle,
        timestamp: "Hace 2 días",
      },
      {
        title: "Nueva meta: 'Ejercicio diario'",
        description: "Progreso actual: 60%",
        icon: Target,
        timestamp: "Hace 1 semana",
      },
      {
        title: "Sesión de planificación",
        description: "Ajustes realizados por IA",
        icon: Brain,
        timestamp: "Hace 2 semanas",
      },
    ],
  },
  {
    date: "Febrero 2024",
    items: [
      {
        title: "Meta completada: 'Meditación diaria'",
        description: "Completado en 30 días",
        icon: CheckCircle,
        timestamp: "Hace 1 mes",
      },
      {
        title: "Análisis de progreso",
        description: "Revisión mensual de objetivos",
        icon: BarChart,
        timestamp: "Hace 1 mes",
      },
    ],
  },
];

export default function AnalyticsPage() {
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
                    <span className={`text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Activity Timeline */}
      <div>
        <motion.h2
          className="text-xl font-semibold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Historial de Actividad
        </motion.h2>

        <div className="space-y-8">
          {activities.map((period, periodIndex) => (
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
                {period.items.map((item, itemIndex) => (
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
          ))}
        </div>
      </div>
    </div>
  );
} 