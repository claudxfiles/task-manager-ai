"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  let errorMessage = "Ha ocurrido un error durante la autenticación.";
  let errorDescription = "Por favor, inténtalo de nuevo o contacta con soporte si el problema persiste.";

  // Personalizar mensajes según el tipo de error
  if (error === "OAuthSignin") {
    errorMessage = "Error al iniciar el proceso de autenticación.";
  } else if (error === "OAuthCallback") {
    errorMessage = "Error durante la respuesta de autenticación.";
  } else if (error === "OAuthCreateAccount") {
    errorMessage = "Error al crear la cuenta con el proveedor.";
  } else if (error === "EmailCreateAccount") {
    errorMessage = "Error al crear la cuenta con el email.";
  } else if (error === "Callback") {
    errorMessage = "Error en la respuesta del proveedor de autenticación.";
  } else if (error === "AccessDenied") {
    errorMessage = "Acceso denegado.";
    errorDescription = "No tienes permisos para acceder a este recurso.";
  } else if (error === "Configuration") {
    errorMessage = "Error de configuración.";
    errorDescription = "Hay un problema con la configuración del servidor.";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-destructive/20 shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-destructive">Error de Autenticación</CardTitle>
            <CardDescription>
              {errorMessage}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              {errorDescription}
            </p>
            <div className="flex flex-col space-y-3">
              <Button asChild>
                <Link href="/auth/login">
                  Volver a Iniciar Sesión
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">
                  Volver al Inicio
                </Link>
              </Button>
            </div>
          </CardContent>
          <CardFooter className="text-center text-sm text-muted-foreground">
            Si necesitas ayuda, por favor contacta con nuestro{" "}
            <Link href="/support" className="text-soul-purple hover:underline">
              equipo de soporte
            </Link>
            .
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
} 