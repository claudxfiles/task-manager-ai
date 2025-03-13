import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const classifyAreaAndType = (message: string): { areaId: string; goalType: string } => {
  const lowercaseMessage = message.toLowerCase();
  
  // Palabras clave para cada área
  const keywords = {
    desarrollo: ["carrera", "profesional", "emprender", "negocio", "empresa", "startup", "proyecto", "trabajo"],
    salud: ["ejercicio", "dieta", "nutrición", "deporte", "salud", "bienestar", "médico", "gimnasio"],
    educacion: ["estudiar", "aprender", "curso", "certificación", "título", "universidad", "conocimiento"],
    finanzas: ["dinero", "inversión", "ahorro", "finanzas", "presupuesto", "gastos", "ingresos"],
    hobby: ["hobby", "pasatiempo", "diversión", "arte", "música", "pintura", "fotografía", "lectura"]
  };

  // Encontrar el área más relevante
  let maxMatches = 0;
  let matchedArea = "desarrollo"; // Default

  Object.entries(keywords).forEach(([area, words]) => {
    const matches = words.filter(word => lowercaseMessage.includes(word)).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      matchedArea = area;
    }
  });

  return {
    areaId: matchedArea,
    goalType: matchedArea
  };
};

const generatePlanSteps = (message: string, areaId: string): string => {
  const plans = {
    desarrollo: `1. Objetivo: Desarrollar una carrera profesional exitosa
2. Investigar oportunidades y tendencias del mercado
3. Crear un plan de desarrollo profesional detallado
4. Establecer metas a corto y largo plazo
5. Identificar habilidades clave a desarrollar
6. Buscar mentores y networking
7. Actualizar CV y perfil profesional
8. Participar en proyectos relevantes`,

    salud: `1. Objetivo: Mejorar la salud y bienestar general
2. Realizar chequeo médico general
3. Establecer rutina de ejercicios
4. Planificar alimentación saludable
5. Establecer horarios de descanso
6. Practicar técnicas de manejo del estrés
7. Mantener registro de progreso
8. Consultar con profesionales de la salud`,

    educacion: `1. Objetivo: Ampliar conocimientos y habilidades
2. Identificar áreas de aprendizaje prioritarias
3. Investigar recursos educativos disponibles
4. Crear calendario de estudio
5. Establecer objetivos de aprendizaje medibles
6. Participar en cursos o programas
7. Practicar habilidades nuevas
8. Evaluar progreso regularmente`,

    finanzas: `1. Objetivo: Mejorar situación financiera
2. Analizar ingresos y gastos actuales
3. Crear presupuesto detallado
4. Establecer metas financieras
5. Identificar oportunidades de ahorro
6. Investigar opciones de inversión
7. Desarrollar fuentes adicionales de ingreso
8. Revisar y ajustar estrategias`,

    hobby: `1. Objetivo: Desarrollar nuevas habilidades recreativas
2. Investigar sobre el hobby elegido
3. Adquirir materiales o equipos necesarios
4. Establecer tiempo regular de práctica
5. Conectar con comunidades afines
6. Participar en eventos o grupos
7. Documentar progreso y experiencias
8. Compartir y celebrar logros`
  };

  return plans[areaId as keyof typeof plans] || plans.desarrollo;
};

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    if (!message) {
      return NextResponse.json(
        { error: "No message provided" },
        { status: 400 }
      );
    }

    const { areaId, goalType } = classifyAreaAndType(message);
    const plan = generatePlanSteps(message, areaId);

    return NextResponse.json({
      plan,
      goalType,
      areaId
    });
  } catch (error) {
    console.error("Error generating plan:", error);
    return NextResponse.json(
      { error: "Failed to generate plan" },
      { status: 500 }
    );
  }
} 