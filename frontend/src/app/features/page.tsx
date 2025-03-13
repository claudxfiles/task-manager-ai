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
  RefreshCw,
  ArrowLeft,
  CheckCircle,
  Wallet,
  Activity,
  BarChart2,
  Settings,
  Users,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar/navbar";
import { Footer } from "@/components/landing/footer/footer";

const allFeatures = [
  {
    icon: Brain,
    title: "IA Conversacional Avanzada",
    description: "Dialoga de forma natural sobre tus metas y recibe orientación personalizada basada en tus respuestas.",
    color: "from-soul-purple to-soul-blue",
    delay: 0.1,
  },
  {
    icon: Target,
    title: "Objetivos SMART",
    description: "Convierte tus metas en objetivos específicos, medibles, alcanzables, relevantes y temporales.",
    color: "from-soul-blue to-soul-green",
    delay: 0.15,
  },
  {
    icon: LineChart,
    title: "Análisis de Progreso",
    description: "Visualiza tu avance con métricas claras y ajusta tu estrategia según sea necesario.",
    color: "from-soul-green to-soul-purple",
    delay: 0.2,
  },
  {
    icon: Calendar,
    title: "Planificación Temporal",
    description: "Organiza tus metas en un calendario realista con recordatorios y fechas clave.",
    color: "from-soul-purple to-soul-blue",
    delay: 0.25,
  },
  {
    icon: MessageSquare,
    title: "Feedback Continuo",
    description: "Recibe retroalimentación constructiva y sugerencias de mejora en tiempo real.",
    color: "from-soul-blue to-soul-green",
    delay: 0.3,
  },
  {
    icon: RefreshCw,
    title: "Adaptación Dinámica",
    description: "El plan se ajusta automáticamente según tu progreso y circunstancias cambiantes.",
    color: "from-soul-green to-soul-purple",
    delay: 0.35,
  },
  {
    icon: CheckCircle,
    title: "Seguimiento de Hábitos",
    description: "Crea y mantén hábitos positivos con recordatorios y estadísticas de consistencia.",
    color: "from-soul-purple to-soul-blue",
    delay: 0.4,
  },
  {
    icon: Wallet,
    title: "Gestión Financiera",
    description: "Controla tus finanzas personales y establece metas de ahorro e inversión.",
    color: "from-soul-blue to-soul-green",
    delay: 0.45,
  },
  {
    icon: Activity,
    title: "Monitoreo de Bienestar",
    description: "Realiza un seguimiento de tu salud física y mental con métricas personalizadas.",
    color: "from-soul-green to-soul-purple",
    delay: 0.5,
  },
  {
    icon: BarChart2,
    title: "Estadísticas Avanzadas",
    description: "Visualiza tu progreso con gráficos detallados y análisis de tendencias.",
    color: "from-soul-purple to-soul-blue",
    delay: 0.55,
  },
  {
    icon: Settings,
    title: "Personalización Completa",
    description: "Adapta la aplicación a tus necesidades con opciones de personalización extensas.",
    color: "from-soul-blue to-soul-green",
    delay: 0.6,
  },
  {
    icon: Users,
    title: "Comunidad de Apoyo",
    description: "Conecta con otros usuarios para compartir experiencias y motivación.",
    color: "from-soul-green to-soul-purple",
    delay: 0.65,
  },
  {
    icon: Shield,
    title: "Privacidad Garantizada",
    description: "Tus datos están seguros con encriptación de extremo a extremo y controles de privacidad.",
    color: "from-soul-purple to-soul-blue",
    delay: 0.7,
  },
  {
    icon: Clock,
    title: "Recordatorios Inteligentes",
    description: "Recibe notificaciones contextuales basadas en tus hábitos y preferencias.",
    color: "from-soul-blue to-soul-green",
    delay: 0.75,
  },
  {
    icon: Sparkles,
    title: "Gamificación Motivadora",
    description: "Mantén la motivación con un sistema de recompensas, logros y desafíos.",
    color: "from-soul-green to-soul-purple",
    delay: 0.8,
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="container relative z-10">
            {/* Header */}
            <div className="text-center space-y-4 mb-16">
              <Link 
                href="/" 
                className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al inicio
              </Link>
              
              <motion.h1 
                className="text-4xl md:text-5xl font-bold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Todas las <span className="gradient-text">Características</span>
              </motion.h1>
              
              <motion.p 
                className="text-muted-foreground text-lg max-w-[700px] mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Descubre todas las herramientas y funcionalidades que SoulDream ofrece para ayudarte a alcanzar tus metas y transformar tu vida
              </motion.p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
              {allFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
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
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <Link href="/auth/register">
                <Button size="lg" className="group">
                  Comienza a Usar Todas las Características
                  <Sparkles className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
                </Button>
              </Link>
            </motion.div>

            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/3 left-0 w-64 h-64 bg-soul-purple/10 rounded-full blur-3xl" />
              <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-soul-blue/10 rounded-full blur-3xl" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 