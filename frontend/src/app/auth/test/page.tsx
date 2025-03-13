"use client";

import { SimpleGoogleButton } from "@/components/auth/simple-google-button";
import { DirectGoogleButton } from "@/components/auth/direct-google-button";
import { NextAuthGoogleButton } from "@/components/auth/nextauth-google-button";
import { EmailSignInButton } from "@/components/auth/email-sign-in-button";
import { SimpleAuthButton } from "@/components/auth/simple-auth-button";
import { useState } from "react";
import { AuthFallback } from "@/components/auth/auth-fallback";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function AuthTestPage() {
  const [authError, setAuthError] = useState<{code?: string, message?: string} | null>(null);

  // Función para manejar errores de autenticación
  const handleAuthError = (code?: string, message?: string) => {
    setAuthError({ code, message });
    // Mostrar el error por 5 segundos y luego limpiarlo
    setTimeout(() => {
      setAuthError(null);
    }, 5000);
  };

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Prueba de Métodos de Autenticación</h1>
      
      {authError && (
        <div className="mb-6">
          <AuthFallback errorCode={authError.code} errorMessage={authError.message} />
        </div>
      )}
      
      <Tabs defaultValue="demo">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="demo">Demo</TabsTrigger>
          <TabsTrigger value="firebase-direct">Firebase Directo</TabsTrigger>
          <TabsTrigger value="firebase-env">Firebase con Env</TabsTrigger>
          <TabsTrigger value="nextauth">NextAuth.js</TabsTrigger>
        </TabsList>
        
        <TabsContent value="demo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Acceso Directo (Demo)</CardTitle>
              <CardDescription>
                Acceso simplificado sin autenticación real para pruebas
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <SimpleAuthButton />
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              Este método no requiere autenticación real, es solo para pruebas
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="firebase-direct" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Firebase Directo</CardTitle>
              <CardDescription>
                Usa Firebase directamente con la API key hardcodeada
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <DirectGoogleButton onError={handleAuthError} />
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              Este método usa la API key directamente en el código
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="firebase-env" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Firebase con Variables de Entorno</CardTitle>
              <CardDescription>
                Usa Firebase con la API key de las variables de entorno
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <SimpleGoogleButton onError={handleAuthError} />
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              Este método usa la API key de las variables de entorno
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="nextauth" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>NextAuth.js</CardTitle>
              <CardDescription>
                Usa NextAuth.js para la autenticación con Google
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <NextAuthGoogleButton onError={handleAuthError} />
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              Este método usa NextAuth.js para manejar la autenticación
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Alternativa: Email</CardTitle>
            <CardDescription>
              Usa el método de registro con email como alternativa
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <EmailSignInButton />
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Este método no depende de Firebase ni de Google
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-6 text-center">
        <Link href="/debug/firebase" className="text-primary hover:underline">
          Ir a la página de depuración de Firebase
        </Link>
      </div>
    </div>
  );
} 