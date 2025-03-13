"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EmailSignInButton } from "./email-sign-in-button";

interface AuthFallbackProps {
  errorCode?: string;
  errorMessage?: string;
}

export function AuthFallback({ errorCode, errorMessage }: AuthFallbackProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Problema de Autenticación</AlertTitle>
        <AlertDescription>
          Hemos detectado un problema con la autenticación de Google
        </AlertDescription>
      </Alert>
      
      <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
        <h3 className="text-sm font-medium text-red-800">Error de Autenticación</h3>
        <p className="text-sm text-red-700 mt-1">
          {errorCode === 'auth/api-key-not-valid-please-pass-a-valid-api-key' ? 
            'Firebase: Error (auth/api-key-not-valid--please-pass-a-valid-api-key.)' : 
            errorMessage || 'Error desconocido'}
        </p>
        <p className="text-xs text-red-600 mt-1">
          Código de error: {errorCode || 'desconocido'}
        </p>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Puedes intentar las siguientes soluciones:</h3>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>Verifica tu conexión a internet</li>
          <li>Asegúrate de que las cookies estén habilitadas en tu navegador</li>
          <li>Intenta con otro navegador</li>
          <li>Utiliza el método de registro con email como alternativa</li>
        </ul>
      </div>
      
      <div className="mt-6 flex flex-col items-center space-y-4">
        <EmailSignInButton />
        
        <div className="flex space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/auth/test">
              Probar Otros Métodos
            </Link>
          </Button>
          
          <Button variant="outline" size="sm" asChild>
            <Link href="/debug/firebase">
              Depurar Firebase
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 