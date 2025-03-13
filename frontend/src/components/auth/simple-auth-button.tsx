"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';

export function SimpleAuthButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      
      // Simular un proceso de autenticación
      console.log('Iniciando autenticación simplificada...');
      
      // Esperar 1.5 segundos para simular el proceso
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirigir al dashboard
      console.log("Usuario autenticado exitosamente (simulación)");
      router.push('/dashboard');
    } catch (error) {
      console.error("Error en la autenticación simulada:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="default"
      size="lg"
      className="flex items-center justify-center gap-2 sm:w-auto px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
      onClick={handleSignIn}
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
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
            <path d="M12 8v8"></path>
            <path d="M8 12h8"></path>
          </svg>
          <span>Acceso Directo (Demo)</span>
        </>
      )}
    </Button>
  );
} 