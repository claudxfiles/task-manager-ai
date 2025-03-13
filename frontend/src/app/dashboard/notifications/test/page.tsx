"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function NotificationsTestPage() {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const sendNotification = async () => {
    if (!session?.user?.email) {
      toast.error('Debes iniciar sesión para enviar notificaciones');
      return;
    }

    if (!title || !body) {
      toast.error('El título y el mensaje son requeridos');
      return;
    }

    setLoading(true);

    try {
      let parsedData = {};
      if (data) {
        try {
          parsedData = JSON.parse(data);
        } catch (e) {
          toast.error('El formato de los datos adicionales es inválido');
          return;
        }
      }

      const response = await fetch('/api/notifications/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          body,
          userEmail: session.user.email,
          data: parsedData,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar la notificación');
      }

      const result = await response.json();
      
      if (result.success) {
        toast.success(`Notificación enviada a ${result.successCount} dispositivos`);
        if (result.failureCount > 0) {
          toast.warning(`Falló el envío a ${result.failureCount} dispositivos`);
        }
      } else {
        throw new Error(result.error || 'Error desconocido');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al enviar la notificación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle>Enviar Notificación de Prueba</CardTitle>
          <CardDescription>
            Prueba el sistema de notificaciones enviando un mensaje a tus dispositivos registrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Título</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título de la notificación"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Mensaje</label>
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Mensaje de la notificación"
                rows={3}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Datos Adicionales (JSON)</label>
              <Textarea
                value={data}
                onChange={(e) => setData(e.target.value)}
                placeholder='{"url": "/dashboard/tasks", "taskId": "123"}'
                rows={3}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Opcional: Datos en formato JSON que se enviarán con la notificación
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={sendNotification} 
            disabled={loading || !title || !body}
            className="w-full"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </span>
            ) : (
              "Enviar Notificación"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 