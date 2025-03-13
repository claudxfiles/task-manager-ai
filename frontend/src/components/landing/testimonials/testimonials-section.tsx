"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ana García",
    role: "Emprendedora",
    image: "/testimonials/avatar-1.png",
    content: "SoulDream me ayudó a transformar mi idea de negocio en un plan concreto. La IA entendió perfectamente mis objetivos y me guió paso a paso.",
    rating: 5,
  },
  {
    name: "Carlos Mendoza",
    role: "Desarrollador Personal",
    image: "/testimonials/avatar-2.png",
    content: "La capacidad de la IA para adaptar el plan según mi progreso es increíble. Es como tener un coach personal 24/7.",
    rating: 5,
  },
  {
    name: "Laura Torres",
    role: "Estudiante de Posgrado",
    image: "/testimonials/avatar-3.png",
    content: "Gracias a SoulDream pude organizar mis metas académicas y personales de manera efectiva. La planificación inteligente hace toda la diferencia.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-soul-purple/10 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-soul-blue/10 rounded-full blur-3xl -translate-y-1/2" />
      </div>

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
            Lo que Dicen <span className="gradient-text">Nuestros Usuarios</span>
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-lg max-w-[600px] mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Historias reales de personas que han transformado sus vidas con SoulDream
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="glass-effect p-6 space-y-4 relative">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6">
                  <Quote className="w-10 h-10 text-soul-purple/20" />
                </div>

                {/* Rating */}
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-soul-purple text-soul-purple" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground relative z-10">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-soul-purple to-soul-blue flex items-center justify-center text-white font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 