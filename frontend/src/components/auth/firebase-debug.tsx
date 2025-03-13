"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth, googleProvider } from "@/lib/firebase";

export function FirebaseDebug() {
  const [config, setConfig] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Obtener la configuración de Firebase
    const apiKey = process.env.NEXT_PUBLIC_GCP_API_KEY;
    const authDomain = process.env.NEXT_PUBLIC_GCP_AUTH_DOMAIN;
    const projectId = process.env.NEXT_PUBLIC_GCP_PROJECT_ID;

    setConfig({
      apiKey: apiKey ? `${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}` : 'undefined',
      authDomain,
      projectId,
    });
  }, []);

  const testFirebase = async () => {
    setIsLoading(true);
    setTestResult(null);
    setError(null);

    try {
      // Verificar si Firebase está inicializado
      if (!auth || !googleProvider) {
        throw new Error("Firebase no está inicializado correctamente");
      }

      // Verificar si la API key es válida
      const testUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.NEXT_PUBLIC_GCP_API_KEY}`;
      const response = await fetch(testUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password',
          returnSecureToken: true,
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        // Si hay un error específico de API key inválida
        if (data.error.message === 'API key not valid. Please pass a valid API key.') {
          throw new Error("La API key no es válida");
        } else {
          // Otros errores son esperados (como email ya en uso)
          setTestResult("Conexión con Firebase establecida correctamente");
        }
      } else {
        setTestResult("Conexión con Firebase establecida correctamente");
      }
    } catch (err: any) {
      console.error("Error al probar Firebase:", err);
      setError(err.message || "Error desconocido al probar Firebase");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Depuración de Firebase</CardTitle>
        <CardDescription className="text-center">
          Herramienta para diagnosticar problemas con la configuración de Firebase
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="config">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="config">Configuración</TabsTrigger>
            <TabsTrigger value="test">Prueba</TabsTrigger>
          </TabsList>
          <TabsContent value="config" className="space-y-4">
            <div className="rounded-md bg-muted p-4">
              <h3 className="font-medium mb-2">Variables de Entorno</h3>
              {config ? (
                <pre className="text-xs overflow-auto p-2 bg-background rounded">
                  {JSON.stringify(config, null, 2)}
                </pre>
              ) : (
                <p className="text-sm text-muted-foreground">Cargando configuración...</p>
              )}
            </div>
            <div className="text-sm space-y-2">
              <p className="font-medium">Instrucciones:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Verifica que la API key sea correcta</li>
                <li>Asegúrate de que el dominio de autenticación tenga el formato: <code>proyectoid.firebaseapp.com</code></li>
                <li>Confirma que el ID del proyecto coincida con tu proyecto en Firebase</li>
              </ol>
            </div>
          </TabsContent>
          <TabsContent value="test">
            <div className="space-y-4">
              <Button 
                onClick={testFirebase} 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Probando..." : "Probar Conexión con Firebase"}
              </Button>
              
              {testResult && (
                <div className="p-3 rounded-md bg-green-50 border border-green-200 text-green-700 text-sm">
                  {testResult}
                </div>
              )}
              
              {error && (
                <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm">
                  <p className="font-medium">Error:</p>
                  <p>{error}</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center text-xs text-muted-foreground">
        Esta herramienta solo es visible en modo desarrollo
      </CardFooter>
    </Card>
  );
} 