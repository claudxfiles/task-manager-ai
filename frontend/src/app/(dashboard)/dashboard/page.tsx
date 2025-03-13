"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dumbbell, Wallet, Target, Activity, Calendar, BarChart2, Settings, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <motion.h1 
        className="text-2xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-6">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" /> Finanzas
            </CardTitle>
            <CardDescription>
              Gestiona tus finanzas personales
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-muted-foreground">
              Controla tus ingresos, gastos y ahorra para tus metas financieras.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/dashboard/finances">
                Ir a Finanzas
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="p-6">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5" /> Workout
            </CardTitle>
            <CardDescription>
              Gestiona tus entrenamientos
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-muted-foreground">
              Planifica tus rutinas de ejercicio y haz seguimiento de tu progreso.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/dashboard/workout">
                Ir a Workout
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="p-6">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" /> Metas
            </CardTitle>
            <CardDescription>
              Define y alcanza tus objetivos
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-muted-foreground">
              Establece metas claras y haz seguimiento de tu progreso.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/dashboard/goals">
                Ir a Metas
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="p-6">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" /> Hábitos
            </CardTitle>
            <CardDescription>
              Desarrolla hábitos positivos
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-muted-foreground">
              Crea y mantén hábitos saludables para mejorar tu vida.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/dashboard/habits">
                Ir a Hábitos
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="p-6">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" /> Calendario
            </CardTitle>
            <CardDescription>
              Organiza tu tiempo
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-muted-foreground">
              Planifica tus actividades y gestiona tu tiempo de manera eficiente.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/dashboard/calendar">
                Ir a Calendario
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="p-6">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" /> Chat con IA
            </CardTitle>
            <CardDescription>
              Tu asistente personal
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-muted-foreground">
              Consulta con tu asistente de IA para obtener ayuda y consejos.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/dashboard/ai-chat">
                Ir a Chat con IA
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}