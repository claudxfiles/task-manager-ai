import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

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

    // Verificar que el usuario solo pueda ver sus propias notificaciones
    if (email !== session.user.email) {
      return NextResponse.json(
        { error: 'No autorizado para ver estas notificaciones' },
        { status: 403 }
      );
    }

    // Obtener las notificaciones del usuario
    const notifications = await prisma.notification.findMany({
      where: {
        userEmail: email,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50, // Limitar a las últimas 50 notificaciones
    });

    return NextResponse.json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.error('Error al obtener notificaciones:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 