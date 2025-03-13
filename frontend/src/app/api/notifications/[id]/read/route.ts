import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar la sesión del usuario
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const notificationId = params.id;
    if (!notificationId) {
      return NextResponse.json(
        { error: 'ID de notificación no proporcionado' },
        { status: 400 }
      );
    }

    // Obtener la notificación
    const notification = await prisma.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!notification) {
      return NextResponse.json(
        { error: 'Notificación no encontrada' },
        { status: 404 }
      );
    }

    // Verificar que el usuario sea el propietario de la notificación
    if (notification.userEmail !== session.user.email) {
      return NextResponse.json(
        { error: 'No autorizado para modificar esta notificación' },
        { status: 403 }
      );
    }

    // Marcar como leída
    const updatedNotification = await prisma.notification.update({
      where: {
        id: notificationId,
      },
      data: {
        read: true,
      },
    });

    return NextResponse.json({
      success: true,
      notification: updatedNotification,
    });
  } catch (error) {
    console.error('Error al marcar notificación como leída:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 