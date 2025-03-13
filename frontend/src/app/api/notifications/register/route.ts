import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { createTwilioBinding } from '@/lib/twilio';

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

    // Buscar o crear el registro de notificación en la base de datos
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

    // Registrar el token en Twilio Notify
    try {
      // Usamos el email como identity, pero podría ser cualquier identificador único
      const identity = session.user.email;
      const twilioBinding = await createTwilioBinding(identity, token);
      
      console.log('Token registrado en Twilio Notify:', twilioBinding?.sid || 'No se pudo registrar');
    } catch (twilioError) {
      // No fallamos la petición si Twilio falla, solo registramos el error
      console.error('Error al registrar token en Twilio Notify:', twilioError);
    }

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