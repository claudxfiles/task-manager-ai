"use client";

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Loader2, ChevronRight, Lock, Shield, Key } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface GoogleEvent {
  id: string;
  summary: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
}

export default function CalendarPage() {
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [events, setEvents] = useState<GoogleEvent[]>([])

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true)
      // Aquí implementaremos la autenticación con Google
      // Por ahora solo simulamos el proceso
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsConnected(true)
    } catch (error) {
      console.error('Error al conectar con Google Calendar:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const steps = [
    {
      title: "Crear credenciales",
      description: "Configura las credenciales de OAuth 2.0 en Google Cloud Console",
      icon: Key,
      content: (
        <div className="space-y-4">
          <h3 className="font-semibold">Pasos para crear credenciales:</h3>
          <ol className="list-decimal pl-4 space-y-2">
            <li>Ve a la <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Cloud Console</a></li>
            <li>Crea un nuevo proyecto o selecciona uno existente</li>
            <li>Habilita la API de Google Calendar</li>
            <li>En "Credenciales", crea credenciales de OAuth 2.0</li>
            <li>Configura la pantalla de consentimiento</li>
            <li>Descarga el archivo de credenciales</li>
          </ol>
          <Alert>
            <Lock className="h-4 w-4" />
            <AlertTitle>Importante</AlertTitle>
            <AlertDescription>
              Nunca compartas tus credenciales de OAuth. Mantenlas seguras y no las subas a repositorios públicos.
            </AlertDescription>
          </Alert>
          <Button onClick={() => setCurrentStep(2)} className="mt-4">
            Siguiente paso
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    {
      title: "Configurar la aplicación",
      description: "Añade las credenciales a tu configuración",
      icon: Shield,
      content: (
        <div className="space-y-4">
          <h3 className="font-semibold">Configuración de credenciales:</h3>
          <ol className="list-decimal pl-4 space-y-2">
            <li>Crea un archivo .env.local en la raíz del proyecto</li>
            <li>Añade las siguientes variables:
              <pre className="bg-muted p-2 rounded-md mt-2 text-sm">
                GOOGLE_CLIENT_ID=tu_client_id{"\n"}
                GOOGLE_CLIENT_SECRET=tu_client_secret{"\n"}
                GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback/google
              </pre>
            </li>
            <li>Asegúrate de que el archivo .env.local está en .gitignore</li>
          </ol>
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertTitle>Seguridad</AlertTitle>
            <AlertDescription>
              Tus datos están protegidos. Solo almacenamos el token de acceso necesario para sincronizar eventos.
            </AlertDescription>
          </Alert>
          <Button onClick={handleGoogleLogin} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Conectando...
              </>
            ) : (
              <>
                <CalendarIcon className="mr-2 h-4 w-4" />
                Conectar con Google Calendar
              </>
            )}
          </Button>
        </div>
      )
    }
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Calendario</h1>
          <p className="text-muted-foreground">
            Conecta tu Google Calendar de forma segura
          </p>
        </div>
      </div>

      {!isConnected ? (
        <Card className="p-6">
          <Tabs defaultValue={`step-${currentStep}`} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              {steps.map((step, index) => (
                <TabsTrigger
                  key={index}
                  value={`step-${index + 1}`}
                  disabled={currentStep < index + 1}
                  onClick={() => setCurrentStep(index + 1)}
                >
                  <step.icon className="h-4 w-4 mr-2" />
                  {step.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {steps.map((step, index) => (
              <TabsContent key={index} value={`step-${index + 1}`}>
                <div className="mt-4">
                  <h2 className="text-lg font-semibold mb-2">{step.title}</h2>
                  <p className="text-muted-foreground mb-4">{step.description}</p>
                  {step.content}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Card>
      ) : (
        <Card className="p-4">
          <div className="grid gap-4">
            {/* Aquí irá el componente de calendario que mostrará los eventos */}
            {events.map((event) => (
              <div key={event.id} className="p-4 border rounded-lg">
                <h3 className="font-medium">{event.summary}</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(event.start.dateTime).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
} 