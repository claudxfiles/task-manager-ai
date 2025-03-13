"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Mail } from "lucide-react";
import Link from "next/link";

interface AuthFallbackProps {
  errorCode?: string;
  errorMessage?: string;
}

export function AuthFallback({ errorCode, errorMessage }: AuthFallbackProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Problema de Autenticación</CardTitle>
        <CardDescription className="text-center">
          Hemos detectado un problema con la autenticación de Google
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error de Autenticación</AlertTitle>
          <AlertDescription>
            {errorMessage || "No se pudo completar la autenticación con Google."}
            {errorCode && (
              <div className="mt-2 text-xs opacity-70">
                Código de error: {errorCode}
              </div>
            )}
          </AlertDescription>
        </Alert>

        <div className="text-sm">
          <p>Puedes intentar las siguientes soluciones:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Verifica tu conexión a internet</li>
            <li>Asegúrate de que las cookies estén habilitadas en tu navegador</li>
            <li>Intenta con otro navegador</li>
            <li>Utiliza el método de registro con email como alternativa</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link href="/auth/register">
          <Button className="w-full flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Continuar con Email
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
} 