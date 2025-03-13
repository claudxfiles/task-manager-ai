"use client";

import { motion } from "framer-motion";
import { Brain, Target, Rocket, ChevronRight, MessageSquare } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Comparte tus Sueños",
    description: "Conversa con nuestra IA sobre tus metas y aspiraciones. Ella te ayudará a clarificar tus objetivos.",
    color: "from-soul-purple/20 to-soul-purple/0",
  },
  {
    icon: Brain,
    title: "Análisis Inteligente",
    description: "La IA analiza tus metas y crea un plan personalizado basado en tus circunstancias únicas.",
    color: "from-soul-blue/20 to-soul-blue/0",
  },
  {
    icon: Target,
    title: "Plan Detallado",
    description: "Recibe un plan paso a paso con acciones concretas y plazos realistas para alcanzar tus metas.",
    color: "from-soul-green/20 to-soul-green/0",
  },
  {
    icon: Rocket,
    title: "Seguimiento y Ajustes",
    description: "Monitorea tu progreso mientras la IA ajusta el plan según tus avances y necesidades.",
    color: "from-soul-purple/20 to-soul-purple/0",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
      
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Cómo <span className="gradient-text">Funciona</span>
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-lg max-w-[600px] mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Un proceso simple pero poderoso para convertir tus sueños en realidad
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Step Card */}
              <div className="glass-effect p-6 space-y-4 relative h-full">
                {/* Icon Background */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${step.color} rounded-full blur-2xl opacity-20`} />
                
                {/* Icon */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-soul-purple to-soul-blue flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>

              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <ChevronRight className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>
    </section>
  );
} 