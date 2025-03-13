import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Esta es una implementación básica. En un entorno de producción,
// deberías almacenar estos tokens en una base de datos.
const deviceTokens: Record<string, { token: string, platform: string }[]> = {};

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

    // Obtener el token del cuerpo de la petición
    const { token } = await req.json();
    if (!token) {
      return NextResponse.json(
        { error: 'Token no proporcionado' },
        { status: 400 }
      );
    }

    // Buscar o crear el registro de notificación
    const notification = await prisma.notificationToken.upsert({
      where: {
        token: token,
      },
      update: {
        lastUpdated: new Date(),
      },
      create: {
        token: token,
        userEmail: session.user.email,
        lastUpdated: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      notification
    });
  } catch (error) {
    console.error('Error al registrar token:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// Endpoint para obtener los tokens de un usuario (solo para pruebas)
export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');
  
  if (!userId) {
    return NextResponse.json(
      { error: 'Se requiere el parámetro userId' },
      { status: 400 }
    );
  }
  
  const userTokens = deviceTokens[userId] || [];
  
  return NextResponse.json(
    { 
      userId, 
      tokens: userTokens.map(device => ({
        token: device.token.substring(0, 10) + '...',
        platform: device.platform
      }))
    },
    { status: 200 }
  );
} 