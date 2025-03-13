"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface SimpleGoogleButtonProps {
  onError?: (code?: string, message?: string) => void;
}

export function SimpleGoogleButton({ onError }: SimpleGoogleButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setDebugInfo(null);
      
      // Mostrar información de depuración
      console.log('Iniciando autenticación con Google...');
      
      // Verificar si Firebase está inicializado
      if (!auth || !googleProvider) {
        throw new Error("Firebase no está inicializado correctamente. Verifica la consola para más detalles.");
      }
      
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Usuario autenticado exitosamente");
      router.push('/dashboard');
    } catch (error: any) {
      console.error("Error al iniciar sesión con Google:", error);
      
      // Guardar información de depuración
      setDebugInfo(`Código: ${error.code || 'desconocido'}, Mensaje: ${error.message || 'No hay mensaje de error'}`);
      
      // Si se proporcionó un manejador de errores, llamarlo
      if (onError) {
        onError(error.code, error.message);
        return; // No mostrar el error localmente si se está manejando externamente
      }
      
      // Manejar errores específicos con mensajes más amigables
      if (error.code === 'auth/api-key-not-valid-please-pass-a-valid-api-key') {
        setError("La configuración de Firebase no es correcta. Por favor, verifica tus credenciales.");
      } else if (error.code === 'auth/configuration-not-found') {
        setError("La configuración de Firebase no se ha encontrado. Verifica tu archivo .env.local.");
      } else if (error.code === 'auth/popup-closed-by-user') {
        setError("Has cerrado la ventana de inicio de sesión. Inténtalo de nuevo.");
      } else if (error.code === 'auth/popup-blocked') {
        setError("El navegador ha bloqueado la ventana emergente. Por favor, permite ventanas emergentes para este sitio.");
      } else if (error.code === 'auth/network-request-failed') {
        setError("Error de red. Verifica tu conexión a Internet.");
      } else if (error.code === 'auth/internal-error') {
        setError("Error interno de Firebase. Por favor, intenta más tarde.");
      } else if (error.code === 'auth/invalid-api-key') {
        setError("La API key de Firebase no es válida. Contacta al administrador.");
      } else if (!error.code && error.message && error.message.includes('Firebase')) {
        setError("Error de inicialización de Firebase. Verifica la configuración.");
      } else {
        setError("Ocurrió un error al iniciar sesión. Por favor, intenta más tarde o usa el registro con email.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Button
        variant="default"
        size="lg"
        className="flex items-center justify-center gap-2 sm:w-auto px-8"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Cargando...
          </span>
        ) : (
          <>
            <Image
              src="/google-logo.svg"
              alt="Google"
              width={18}
              height={18}
              className="h-4 w-4"
            />
            Comienza Gratis
          </>
        )}
      </Button>
      
      {error && (
        <div className="mt-2 text-sm text-red-500 max-w-md text-center p-2 bg-red-50 rounded-md border border-red-100">
          <p>{error}</p>
          <p className="mt-1">
            <Link href="/auth/register" className="text-primary hover:underline font-medium">
              Regístrate con email
            </Link> como alternativa.
          </p>
        </div>
      )}
      
      {debugInfo && (
        <div className="mt-2 text-xs text-gray-500 max-w-md text-center">
          <details>
            <summary className="cursor-pointer hover:text-gray-700">Información de depuración</summary>
            <p className="mt-1 text-left bg-gray-100 p-2 rounded">{debugInfo}</p>
            <p className="mt-1 text-left">
              <Link href="/debug/firebase" className="text-primary hover:underline text-xs">
                Ir a la página de depuración de Firebase
              </Link>
            </p>
          </details>
        </div>
      )}
    </div>
  );
} 