"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bell, BellOff } from "lucide-react";
import { requestNotificationPermission } from "@/lib/firebase";
import { toast } from "sonner";
import Link from "next/link";

interface NotificationButtonProps {
  userId?: string;
}

export function NotificationButton({ userId }: NotificationButtonProps) {
  const [permission, setPermission] = useState<NotificationPermission | "default">("default");
  const [loading, setLoading] = useState(false);

  // Verificar el estado de los permisos al cargar el componente
  useEffect(() => {
    if (typeof Notification !== "undefined") {
      setPermission(Notification.permission);
    }
  }, []);

  // Solicitar permiso para notificaciones
  const handleRequestPermission = async () => {
    setLoading(true);
    try {
      const token = await requestNotificationPermission();
      
      if (token) {
        setPermission(Notification.permission);
        toast.success("Notificaciones activadas correctamente");
      } else if (Notification.permission === "denied") {
        toast.error("Permiso de notificaciones denegado");
      } else {
        toast.error("No se pudo activar las notificaciones");
      }
    } catch (error) {
      console.error("Error al solicitar permiso:", error);
      toast.error("Error al activar las notificaciones");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link href="/dashboard/notifications">
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={permission === "default" ? handleRequestPermission : undefined}
        disabled={loading}
      >
        {loading ? (
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : permission === "granted" ? (
          <Bell className="h-5 w-5" />
        ) : permission === "denied" ? (
          <BellOff className="h-5 w-5" />
        ) : (
          <Bell className="h-5 w-5" />
        )}
        
        {permission === "granted" && (
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-green-500" />
        )}
        
        {permission === "denied" && (
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
        )}
      </Button>
    </Link>
  );
} 