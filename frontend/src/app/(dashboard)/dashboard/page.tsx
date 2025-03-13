'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, Dumbbell, Target, Activity, Calendar, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const modules = [
    {
      icon: <Wallet className="w-5 h-5" />,
      title: 'Finanzas',
      href: '/dashboard/finances'
    },
    {
      icon: <Dumbbell className="w-5 h-5" />,
      title: 'Workout',
      href: '/dashboard/workout'
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: 'Metas',
      href: '/dashboard/goals'
    },
    {
      icon: <Activity className="w-5 h-5" />,
      title: 'Hábitos',
      href: '/dashboard/habits'
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: 'Calendario',
      href: '/dashboard/calendar'
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: 'Chat con IA',
      href: '/dashboard/ai-chat'
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {modules.map((module, index) => (
          <motion.div
            key={module.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="group relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <Button
                variant="ghost"
                className="w-full h-full p-6 flex flex-col items-center justify-center gap-3 hover:bg-accent/50"
                asChild
              >
                <a href={module.href}>
                  <div className="text-muted-foreground group-hover:text-primary transition-colors duration-200">
                    {module.icon}
                  </div>
                  <span className="font-medium">{module.title}</span>
                </a>
              </Button>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}