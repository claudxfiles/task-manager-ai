"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Mail } from "lucide-react";
import Link from "next/link";
import { SimpleGoogleButton } from "@/components/auth/simple-google-button";
import { DirectGoogleButton } from "@/components/auth/direct-google-button";
import { EmailSignInButton } from "@/components/auth/email-sign-in-button";
import { useState } from "react";
import { AuthFallback } from "@/components/auth/auth-fallback";

export function HeroSection() {
  const [authError, setAuthError] = useState<{code?: string, message?: string} | null>(null);

  // Función para manejar errores de autenticación
  const handleAuthError = (code?: string, message?: string) => {
    setAuthError({ code, message });
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

          {/* CTA Buttons or Auth Fallback */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 w-full justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {authError ? (
              <AuthFallback errorCode={authError.code} errorMessage={authError.message} />
            ) : (
              <>
                <DirectGoogleButton onError={handleAuthError} />
                <EmailSignInButton />
              </>
            )}
          </motion.div>

          {/* Demo Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
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