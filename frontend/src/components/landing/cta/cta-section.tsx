"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-soul-purple/10 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-soul-blue/10 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Logo */}
          <motion.div
            className="w-20 h-20 rounded-2xl bg-gradient-to-r from-soul-purple to-soul-blue flex items-center justify-center mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Brain className="w-10 h-10 text-white" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="text-4xl md:text-5xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Comienza tu viaje hacia tus <span className="gradient-text">metas</span> hoy mismo
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Únete a miles de personas que ya están transformando sus vidas con la ayuda de SoulDream.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="/dashboard">
              <Button size="lg" className="group">
                Acceder a la aplicación
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/dashboard/ai-chat">
              <Button size="lg" variant="outline">
                Probar el chat con IA
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 