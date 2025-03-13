"use client";

import { useEffect, useState } from "react";
import { requestNotificationPermission, onMessageListener } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Bell, BellOff } from "lucide-react";
import { toast } from "sonner";

interface NotificationManagerProps {
  userId?: string;
}

export function NotificationManager({ userId }: NotificationManagerProps) {
  const [permission, setPermission] = useState<NotificationPermission | "default">("default");
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Verificar el estado de los permisos al cargar el componente
  useEffect(() => {
    if (typeof Notification !== "undefined") {
      setPermission(Notification.permission);
    }
  }, []);

  // Configurar el listener para mensajes en primer plano
  useEffect(() => {
    const unsubscribe = onMessageListener();
    
    return () => {
      unsubscribe();
    };
  }, []);

  // Solicitar permiso para notificaciones
  const requestPermission = async () => {
    setLoading(true);
    try {
      const fcmToken = await requestNotificationPermission();
      setToken(fcmToken);
      
      if (fcmToken) {
        // Actualizar el permiso
        setPermission(Notification.permission);
        
        // Registrar el token en el servidor
        if (userId) {
          await registerTokenWithServer(userId, fcmToken);
        }
        
        toast.success("Notificaciones activadas correctamente");
      } else {
        toast.error("No se pudo obtener el token de notificación");
      }
    } catch (error) {
      console.error("Error al solicitar permiso:", error);
      toast.error("Error al activar las notificaciones");
    } finally {
      setLoading(false);
    }
  };

  // Registrar el token en el servidor
  const registerTokenWithServer = async (userId: string, token: string) => {
    try {
      const response = await fetch("/api/notifications/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          token,
          platform: "web"
        }),
      });
      
      if (!response.ok) {
        throw new Error("Error al registrar el token");
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error al registrar el token:", error);
      throw error;
    }
  };

  return (
    <div className="flex flex-col items-center">
      {permission === "granted" ? (
        <div className="flex items-center gap-2 text-sm text-green-500">
          <Bell className="h-4 w-4" />
          <span>Notificaciones activadas</span>
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={requestPermission}
          disabled={loading || permission === "denied"}
          className={permission === "denied" ? "opacity-50 cursor-not-allowed" : ""}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Activando...
            </span>
          ) : (
            <>
              {permission === "denied" ? (
                <>
                  <BellOff className="mr-2 h-4 w-4" />
                  Notificaciones bloqueadas
                </>
              ) : (
                <>
                  <Bell className="mr-2 h-4 w-4" />
                  Activar notificaciones
                </>
              )}
            </>
          )}
        </Button>
      )}
      
      {permission === "denied" && (
        <p className="text-xs text-muted-foreground mt-2 max-w-xs text-center">
          Has bloqueado las notificaciones. Para activarlas, debes permitirlas en la configuración de tu navegador.
        </p>
      )}
    </div>
  );
} 