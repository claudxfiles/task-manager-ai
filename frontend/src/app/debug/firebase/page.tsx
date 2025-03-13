"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import Link from "next/link";

export default function FirebaseDebugPage() {
  const [status, setStatus] = useState<string>("Verificando...");
  const [error, setError] = useState<string | null>(null);
  const [config, setConfig] = useState<any>(null);
  const [envVars, setEnvVars] = useState<any>(null);

  useEffect(() => {
    // Verificar variables de entorno
    const envConfig = {
      apiKey: process.env.NEXT_PUBLIC_GCP_API_KEY || "No definido",
      authDomain: process.env.NEXT_PUBLIC_GCP_AUTH_DOMAIN || "No definido",
      projectId: process.env.NEXT_PUBLIC_GCP_PROJECT_ID || "No definido",
    };
    setEnvVars(envConfig);

    // Configuración completa de Firebase
    const directConfig = {
      apiKey: "AIzaSyB7RwKtMCRodG0ZQoxoXQHXcisQ5gJLIT4",
      authDomain: "proyectomakepersonal.firebaseapp.com",
      projectId: "proyectomakepersonal",
      storageBucket: "proyectomakepersonal.appspot.com",
      messagingSenderId: "253991058957",
      appId: "1:253991058957:web:3b3efbe36c5c428a6cefb7"
    };
    setConfig(directConfig);

    // Probar inicialización
    try {
      const app = initializeApp(directConfig, "debugApp");
      const auth = getAuth(app);
      const googleProvider = new GoogleAuthProvider();
      
      setStatus("Firebase inicializado correctamente");
    } catch (error: any) {
      setStatus("Error al inicializar Firebase");
      setError(error.message || "Error desconocido");
    }
  }, []);

  const testFirebase = () => {
    try {
      const appName = "testApp" + Date.now();
      const app = initializeApp(config, appName);
      const auth = getAuth(app);
      const googleProvider = new GoogleAuthProvider();
      
      // Configurar el proveedor de Google
      googleProvider.addScope('profile');
      googleProvider.addScope('email');
      googleProvider.setCustomParameters({
        prompt: 'select_account'
      });
      
      alert("Firebase inicializado correctamente con la app: " + appName);
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Depuración de Firebase</h1>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Estado de Firebase</CardTitle>
            <CardDescription>Estado actual de la inicialización de Firebase</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`text-lg font-medium ${status.includes("Error") ? "text-red-500" : "text-green-500"}`}>
              {status}
            </div>
            {error && (
              <div className="mt-2 text-sm text-red-500 p-2 bg-red-50 rounded-md">
                {error}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={testFirebase}>Probar Inicialización</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Configuración de Firebase</CardTitle>
            <CardDescription>Configuración directa utilizada</CardDescription>
          </CardHeader>
          <CardContent>
            {config && (
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-xs">
                {JSON.stringify(config, null, 2)}
              </pre>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Variables de Entorno</CardTitle>
            <CardDescription>Variables de entorno disponibles para Firebase</CardDescription>
          </CardHeader>
          <CardContent>
            {envVars && (
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-xs">
                {JSON.stringify(envVars, null, 2)}
              </pre>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Solución Alternativa</CardTitle>
            <CardDescription>Usa el método de registro con email como alternativa</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Link href="/auth/register">
              <Button className="flex items-center gap-2">
                Registrarse con Email
              </Button>
            </Link>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Este método no depende de Firebase ni de Google
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-6">
        <Link href="/auth/test" className="text-primary hover:underline">
          Volver a la página de prueba de autenticación
        </Link>
      </div>
    </div>
  );
} 