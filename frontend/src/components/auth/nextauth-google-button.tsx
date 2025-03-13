"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface NextAuthGoogleButtonProps {
  onError?: (code?: string, message?: string) => void;
}

export function NextAuthGoogleButton({ onError }: NextAuthGoogleButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setDebugInfo(null);
      
      console.log('Iniciando autenticación con Google (NextAuth)...');
      
      const result = await signIn("google", { 
        redirect: false,
        callbackUrl: "/dashboard" 
      });
      
      if (result?.error) {
        throw new Error(result.error);
      }
      
      if (result?.url) {
        console.log("Usuario autenticado exitosamente, redirigiendo a:", result.url);
        router.push(result.url);
      }
    } catch (error: any) {
      console.error("Error al iniciar sesión con Google:", error);
      
      // Guardar información de depuración
      setDebugInfo(`Error: ${error.message || 'No hay mensaje de error'}`);
      
      // Si se proporcionó un manejador de errores, llamarlo
      if (onError) {
        onError("nextauth_error", error.message);
        return; // No mostrar el error localmente si se está manejando externamente
      }
      
      setError("Ocurrió un error al iniciar sesión con Google. Por favor, intenta más tarde o usa el registro con email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Button
        variant="default"
        size="lg"
        className="flex items-center justify-center gap-2 sm:w-auto px-8 bg-blue-600 hover:bg-blue-700"
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
            <span>Iniciar con NextAuth</span>
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
          </details>
        </div>
      )}
    </div>
  );
} 