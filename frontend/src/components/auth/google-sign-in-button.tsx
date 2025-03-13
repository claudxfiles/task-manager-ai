"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

interface GoogleSignInButtonProps {
  callbackUrl?: string;
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  text?: string;
}

export function GoogleSignInButton({
  callbackUrl = "/dashboard",
  className = "",
  variant = "outline",
  text = "Continuar con Google"
}: GoogleSignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const result = await signIn("google", { 
        callbackUrl,
        redirect: false
      });
      
      if (result?.error) {
        // Manejo de errores específicos
        if (result.error === "Configuration") {
          toast.error("Error de configuración", {
            description: "El servicio de autenticación no está configurado correctamente. Por favor, contacta con soporte."
          });
        } else {
          toast.error("Error de autenticación", {
            description: "No se pudo iniciar sesión con Google. Por favor, inténtalo de nuevo más tarde."
          });
        }
      } else if (result?.url) {
        // Redirección manual en caso de éxito
        window.location.href = result.url;
      }
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      toast.error("Error inesperado", {
        description: "Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      className={`w-full flex items-center justify-center gap-2 ${className}`}
      onClick={handleGoogleSignIn}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
          {text}
        </>
      )}
    </Button>
  );
} 