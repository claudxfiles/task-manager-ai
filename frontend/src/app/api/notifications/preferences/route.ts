import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Obtener las preferencias de notificaciones
export async function GET(request: Request) {
  try {
    // Verificar la sesión del usuario
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    // Obtener el email del usuario de los parámetros de la URL
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email no proporcionado' },
        { status: 400 }
      );
    }

    // Verificar que el usuario solo pueda ver sus propias preferencias
    if (email !== session.user.email) {
      return NextResponse.json(
        { error: 'No autorizado para ver estas preferencias' },
        { status: 403 }
      );
    }

    // Obtener las preferencias del usuario
    const userPreferences = await prisma.notificationPreferences.findUnique({
      where: {
        userEmail: email,
      },
    });

    // Si no hay preferencias, devolver valores predeterminados
    if (!userPreferences) {
      return NextResponse.json({
        success: true,
        preferences: {
          tasks: true,
          goals: true,
          reminders: true,
          system: true,
          marketing: false,
        },
      });
    }

    return NextResponse.json({
      success: true,
      preferences: userPreferences,
    });
  } catch (error) {
    console.error('Error al obtener preferencias:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// Guardar las preferencias de notificaciones
export async function POST(request: Request) {
  try {
    // Verificar la sesión del usuario
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    // Obtener los datos de la petición
    const { email, preferences } = await request.json();

    if (!email || !preferences) {
      return NextResponse.json(
        { error: 'Datos incompletos' },
        { status: 400 }
      );
    }

    // Verificar que el usuario solo pueda modificar sus propias preferencias
    if (email !== session.user.email) {
      return NextResponse.json(
        { error: 'No autorizado para modificar estas preferencias' },
        { status: 403 }
      );
    }

    // Guardar las preferencias del usuario
    const updatedPreferences = await prisma.notificationPreferences.upsert({
      where: {
        userEmail: email,
      },
      update: {
        tasks: preferences.tasks,
        goals: preferences.goals,
        reminders: preferences.reminders,
        system: preferences.system,
        marketing: preferences.marketing,
      },
      create: {
        userEmail: email,
        tasks: preferences.tasks,
        goals: preferences.goals,
        reminders: preferences.reminders,
        system: preferences.system,
        marketing: preferences.marketing,
      },
    });

    return NextResponse.json({
      success: true,
      preferences: updatedPreferences,
    });
  } catch (error) {
    console.error('Error al guardar preferencias:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 