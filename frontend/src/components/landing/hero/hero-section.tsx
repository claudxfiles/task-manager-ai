"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

export function HeroSection() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 hero-gradient" />

      {/* Content Container */}
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Main Heading */}
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Transforma tus
            <span className="gradient-text block">Sueños en Realidad</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            className="max-w-[600px] text-muted-foreground text-lg md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Planifica tu futuro con la ayuda de IA avanzada. Convierte tus metas en planes accionables y alcanza tu máximo potencial.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 w-full justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button 
              size="lg" 
              className="group flex items-center gap-2"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Cargando...
                </span>
              ) : (
                <>
                  <Image 
                    src="/google-logo.svg" 
                    alt="Google" 
                    width={18} 
                    height={18} 
                    className="h-4 w-4" 
                  />
                  Comienza Gratis con Google
                </>
              )}
            </Button>
            <Button 
              size="lg" 
              variant="secondary" 
              className="group"
              onClick={() => {
                // Scroll to the features section
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Ver Demo
              <Sparkles className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
            </Button>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {features.map((feature, index) => (
              <div 
                key={index}
                className="glass-effect p-6 rounded-lg text-center space-y-2"
              >
                <feature.icon className="w-6 h-6 mx-auto mb-2 text-soul-purple" />
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-soul-purple/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-soul-blue/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
}

const features = [
  {
    title: "IA Personalizada",
    description: "Análisis detallado de tus metas y creación de planes personalizados.",
    icon: Sparkles,
  },
  {
    title: "Planificación Inteligente",
    description: "Divide tus objetivos en pasos accionables y medibles.",
    icon: ArrowRight,
  },
  {
    title: "Seguimiento Continuo",
    description: "Monitorea tu progreso y recibe ajustes en tiempo real.",
    icon: Sparkles,
  },
]; 