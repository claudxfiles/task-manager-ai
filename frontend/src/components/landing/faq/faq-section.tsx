"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Cómo funciona la IA de SoulDream?",
    answer: "SoulDream utiliza IA avanzada para analizar tus metas y crear planes personalizados. La IA aprende de tus preferencias, estilo de vida y circunstancias para ofrecer recomendaciones relevantes y alcanzables.",
  },
  {
    question: "¿Puedo cambiar de plan en cualquier momento?",
    answer: "Sí, puedes actualizar o cambiar tu plan en cualquier momento. Los cambios se aplicarán inmediatamente y se ajustará el cobro de manera proporcional.",
  },
  {
    question: "¿Qué tipo de soporte ofrecen?",
    answer: "Ofrecemos soporte por chat 24/7 para todos los usuarios. Los usuarios Pro tienen acceso a soporte prioritario, mientras que los usuarios Enterprise cuentan con un equipo de soporte dedicado.",
  },
  {
    question: "¿Mis datos están seguros?",
    answer: "La seguridad es nuestra prioridad. Utilizamos encriptación de grado militar y cumplimos con todas las regulaciones de protección de datos. Nunca compartimos tu información personal con terceros.",
  },
  {
    question: "¿Puedo exportar mis datos y planes?",
    answer: "Sí, todos los usuarios pueden exportar sus datos y planes en varios formatos (PDF, Excel, etc.). Los usuarios Pro y Enterprise tienen acceso a opciones de exportación adicionales y API.",
  },
  {
    question: "¿Cómo se integra con otras herramientas?",
    answer: "SoulDream se integra con las principales herramientas de productividad y calendarios. Los usuarios Pro y Enterprise tienen acceso a integraciones adicionales y API personalizada.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-soul-purple/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-soul-blue/10 rounded-full blur-3xl" />
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
            Preguntas <span className="gradient-text">Frecuentes</span>
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-lg max-w-[600px] mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Encuentra respuestas a las preguntas más comunes sobre SoulDream
          </motion.p>
        </div>

        {/* FAQ Accordion */}
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="glass-effect">
                <AccordionTrigger className="text-lg font-medium px-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground px-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
} 