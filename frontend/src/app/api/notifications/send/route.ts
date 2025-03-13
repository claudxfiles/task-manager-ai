import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import admin from '@/lib/firebase-admin';
import type { MulticastMessage } from 'firebase-admin/messaging';

// En un entorno de producción, deberías usar una biblioteca como firebase-admin
// para enviar notificaciones desde el servidor.
// Esta es una implementación simulada para fines de demostración.

interface NotificationPayload {
  title: string;
  body: string;
  userEmail: string;
  data?: Record<string, string>;
}

export async function POST(req: Request) {
  try {
    // Verificar la sesión del usuario
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    // Obtener los datos de la notificación
    const { title, body, userEmail, data } = await req.json() as NotificationPayload;
    if (!title || !body || !userEmail) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      );
    }

    // Obtener los tokens del usuario
    const tokens = await prisma.notificationToken.findMany({
      where: {
        userEmail: userEmail,
      },
      select: {
        token: true,
      },
    });

    if (!tokens.length) {
      return NextResponse.json(
        { error: 'No hay tokens registrados para este usuario' },
        { status: 404 }
      );
    }

    // Preparar el mensaje
    const message: MulticastMessage = {
      notification: {
        title,
        body,
      },
      data: data || {},
      tokens: tokens.map((t: { token: string }) => t.token),
    };

    // Enviar la notificación
    const response = await admin.messaging().sendEachForMulticast(message);

    // Limpiar tokens inválidos
    if (response.failureCount > 0) {
      const failedTokens = response.responses
        .map((resp: admin.messaging.SendResponse, idx: number) => resp.success ? null : tokens[idx].token)
        .filter((token: string | null): token is string => token !== null);

      if (failedTokens.length > 0) {
        await prisma.notificationToken.deleteMany({
          where: {
            token: {
              in: failedTokens,
            },
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      successCount: response.successCount,
      failureCount: response.failureCount,
    });
  } catch (error) {
    console.error('Error al enviar notificación:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 