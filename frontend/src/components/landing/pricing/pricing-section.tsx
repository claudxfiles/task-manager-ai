"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Gratuito",
    description: "Perfecto para comenzar tu viaje de desarrollo personal",
    price: "0",
    features: [
      "Chat con IA básico",
      "Planificación de 1 meta",
      "Seguimiento semanal",
      "Recordatorios básicos",
      "Comunidad de soporte",
    ],
    color: "from-soul-purple to-soul-blue",
    popular: false,
  },
  {
    name: "Pro",
    description: "Para quienes buscan un crecimiento acelerado",
    price: "19.99",
    features: [
      "Chat con IA ilimitado",
      "Planificación de metas ilimitadas",
      "Seguimiento diario",
      "Análisis detallado de progreso",
      "Ajustes de plan en tiempo real",
      "Recordatorios personalizados",
      "Acceso prioritario a nuevas funciones",
    ],
    color: "from-soul-blue to-soul-green",
    popular: true,
  },
  {
    name: "Empresas",
    description: "Soluciones personalizadas para equipos",
    price: "Personalizado",
    features: [
      "Todo lo incluido en Pro",
      "Panel de administración",
      "Seguimiento de equipo",
      "Metas compartidas",
      "Reportes avanzados",
      "API acceso",
      "Soporte dedicado 24/7",
    ],
    color: "from-soul-green to-soul-purple",
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 relative">
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
            Planes <span className="gradient-text">Simples</span>
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-lg max-w-[600px] mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Elige el plan que mejor se adapte a tus objetivos
          </motion.p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`glass-effect p-8 space-y-6 relative h-full ${plan.popular ? 'border-soul-purple' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="bg-soul-purple text-white text-sm font-medium px-3 py-1 rounded-full">
                      Más Popular
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="space-y-1">
                  <div className="flex items-baseline">
                    {plan.price !== "Personalizado" && <span className="text-3xl font-bold">$</span>}
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Personalizado" && <span className="text-muted-foreground">/mes</span>}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="pt-6">
                  <Button 
                    className="w-full group" 
                    variant={plan.popular ? "default" : "secondary"}
                  >
                    Comenzar {plan.name}
                    <Sparkles className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 