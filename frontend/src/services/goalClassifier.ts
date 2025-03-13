export type GoalType = 'desarrollo' | 'salud' | 'educacion' | 'negocio' | 'hobby';

export function classifyGoal(input: string): GoalType {
  const text = input.toLowerCase();
  
  // Palabras clave para cada categoría
  const keywords = {
    desarrollo: ['programación', 'código', 'desarrollo', 'software', 'web', 'app', 'aplicación', 'tecnología', 'programar'],
    salud: ['ejercicio', 'dieta', 'nutrición', 'peso', 'gimnasio', 'salud', 'bienestar', 'deporte', 'entrenamiento'],
    educacion: ['estudiar', 'aprender', 'curso', 'certificación', 'carrera', 'universidad', 'educación', 'conocimiento'],
    negocio: ['empresa', 'negocio', 'emprendimiento', 'ventas', 'clientes', 'marketing', 'ingresos', 'emprender'],
    hobby: ['hobby', 'pasatiempo', 'música', 'arte', 'pintura', 'fotografía', 'jardinería', 'lectura', 'colección']
  };

  // Contar coincidencias para cada categoría
  const matches = Object.entries(keywords).map(([category, words]) => ({
    category,
    count: words.filter(word => text.includes(word)).length
  }));

  // Ordenar por número de coincidencias
  matches.sort((a, b) => b.count - a.count);

  // Si no hay coincidencias, asumimos que es un hobby
  if (matches[0].count === 0) {
    return 'hobby';
  }

  return matches[0].category as GoalType;
} 