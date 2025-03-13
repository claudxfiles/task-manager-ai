"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export function SimpleGoogleButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Usuario autenticado:", result.user);
      router.push('/dashboard');
    } catch (error: any) {
      console.error("Error al iniciar sesión con Google:", error);
      alert(`Error: ${error.message || 'Ocurrió un error al iniciar sesión'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
  );
} 