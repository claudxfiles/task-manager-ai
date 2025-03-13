"use client";

import { motion } from "framer-motion";
import { 
  Brain, 
  Target, 
  LineChart, 
  Calendar, 
  MessageSquare, 
  Sparkles,
  Clock,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Brain,
    title: "IA Conversacional Avanzada",
    description: "Dialoga de forma natural sobre tus metas y recibe orientación personalizada basada en tus respuestas.",
    color: "from-soul-purple to-soul-blue",
    delay: 0.2,
  },
  {
    icon: Target,
    title: "Objetivos SMART",
    description: "Convierte tus metas en objetivos específicos, medibles, alcanzables, relevantes y temporales.",
    color: "from-soul-blue to-soul-green",
    delay: 0.3,
  },
  {
    icon: LineChart,
    title: "Análisis de Progreso",
    description: "Visualiza tu avance con métricas claras y ajusta tu estrategia según sea necesario.",
    color: "from-soul-green to-soul-purple",
    delay: 0.4,
  },
  {
    icon: Calendar,
    title: "Planificación Temporal",
    description: "Organiza tus metas en un calendario realista con recordatorios y fechas clave.",
    color: "from-soul-purple to-soul-blue",
    delay: 0.5,
  },
  {
    icon: MessageSquare,
    title: "Feedback Continuo",
    description: "Recibe retroalimentación constructiva y sugerencias de mejora en tiempo real.",
    color: "from-soul-blue to-soul-green",
    delay: 0.6,
  },
  {
    icon: RefreshCw,
    title: "Adaptación Dinámica",
    description: "El plan se ajusta automáticamente según tu progreso y circunstancias cambiantes.",
    color: "from-soul-green to-soul-purple",
    delay: 0.7,
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-muted/50 relative overflow-hidden">
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
            Características <span className="gradient-text">Principales</span>
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-lg max-w-[600px] mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Herramientas poderosas diseñadas para maximizar tu potencial y alcanzar tus metas
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: feature.delay }}
            >
              <div className="glass-effect p-6 space-y-4 h-full transition-all duration-300 hover:translate-y-[-4px]">
                {/* Icon */}
                <div className="relative">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Button size="lg" className="group">
            Explora Todas las Características
            <Sparkles className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
          </Button>
        </motion.div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/3 left-0 w-64 h-64 bg-soul-purple/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-soul-blue/10 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
} 