"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Mail } from "lucide-react";
import { useRouter } from 'next/navigation';

export function EmailSignInButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleEmailSignIn = () => {
    setIsLoading(true);
    // Redirigir al usuario a la página de registro
    setTimeout(() => {
      router.push('/auth/register');
      setIsLoading(false);
    }, 500); // Pequeño retraso para mostrar el estado de carga
  };

  return (
    <Button
      variant="outline"
      size="lg"
      className="flex items-center justify-center gap-2 sm:w-auto px-8 border-primary/20"
      onClick={handleEmailSignIn}
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
          <Mail className="h-4 w-4" />
          Registrarse con Email
        </>
      )}
    </Button>
  );
} 