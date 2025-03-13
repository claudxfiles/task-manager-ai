"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Bell, BellOff, Info, CheckCircle, XCircle } from "lucide-react";
import { requestNotificationPermission } from "@/lib/firebase";
import { Badge } from "@/components/ui/badge";

interface NotificationPreferences {
  tasks: boolean;
  goals: boolean;
  reminders: boolean;
  system: boolean;
  marketing: boolean;
}

export default function NotificationSettingsPage() {
  const { data: session } = useSession();
  const [notificationStatus, setNotificationStatus] = useState<NotificationPermission>("default");
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    tasks: true,
    goals: true,
    reminders: true,
    system: true,
    marketing: false
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Verificar el estado de los permisos al cargar el componente
  useEffect(() => {
    if (typeof Notification !== "undefined") {
      setNotificationStatus(Notification.permission);
    }
  }, []);

  // Cargar preferencias del usuario
  useEffect(() => {
    const loadPreferences = async () => {
      if (!session?.user?.email) return;

      try {
        const response = await fetch(`/api/notifications/preferences?email=${session.user.email}`);
        if (response.ok) {
          const data = await response.json();
          if (data.preferences) {
            setPreferences(data.preferences);
          }
        }
      } catch (error) {
        console.error('Error al cargar preferencias:', error);
      }
    };

    loadPreferences();
  }, [session?.user?.email]);

  // Solicitar permiso para notificaciones
  const handleRequestPermission = async () => {
    setLoading(true);
    try {
      const result = await requestNotificationPermission();
      if (result.success) {
        setNotificationStatus('granted');
        toast.success('Notificaciones activadas correctamente');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al activar las notificaciones');
    } finally {
      setLoading(false);
    }
  };

  // Guardar preferencias
  const savePreferences = async () => {
    if (!session?.user?.email) {
      toast.error('Debes iniciar sesión para guardar preferencias');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('/api/notifications/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session.user.email,
          preferences
        }),
      });

      if (!response.ok) {
        throw new Error('Error al guardar preferencias');
      }

      toast.success('Preferencias guardadas correctamente');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al guardar preferencias');
    } finally {
      setSaving(false);
    }
  };

  // Manejar cambios en las preferencias
  const handlePreferenceChange = (key: keyof NotificationPreferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="container py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Configuración de Notificaciones</h1>
        
        {notificationStatus === "default" && (
          <Button
            onClick={handleRequestPermission}
            disabled={loading}
            className="flex items-center gap-2"
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
                <Bell className="h-5 w-5" />
                <span>Activar Notificaciones</span>
              </>
            )}
          </Button>
        )}
        
        {notificationStatus === "granted" && (
          <Badge variant="secondary" className="flex items-center gap-2 bg-green-500/10 text-green-500">
            <CheckCircle className="h-4 w-4" />
            <span>Notificaciones Activadas</span>
          </Badge>
        )}
        
        {notificationStatus === "denied" && (
          <Badge variant="destructive" className="flex items-center gap-2">
            <BellOff className="h-4 w-4" />
            <span>Notificaciones Bloqueadas</span>
          </Badge>
        )}
      </div>

      {notificationStatus === "denied" && (
        <Card className="bg-red-50 border-red-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <XCircle className="h-6 w-6 text-red-500 shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-red-700">Notificaciones bloqueadas</h3>
                <p className="text-sm text-red-600 mt-1">
                  Has bloqueado las notificaciones en este navegador. Para recibir notificaciones, debes permitirlas en la configuración de tu navegador.
                </p>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-red-700">Cómo habilitar notificaciones:</h4>
                  <ol className="list-decimal list-inside text-sm text-red-600 mt-1 space-y-1">
                    <li>Haz clic en el icono de candado o información en la barra de direcciones</li>
                    <li>Busca la opción de "Notificaciones" o "Permisos del sitio"</li>
                    <li>Cambia la configuración de "Bloqueado" a "Permitir"</li>
                    <li>Recarga la página</li>
                  </ol>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Preferencias de Notificaciones</CardTitle>
          <CardDescription>
            Elige qué tipos de notificaciones quieres recibir
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="tasks">Tareas</Label>
                <p className="text-sm text-muted-foreground">
                  Notificaciones sobre tareas pendientes, completadas y recordatorios
                </p>
              </div>
              <Switch
                id="tasks"
                checked={preferences.tasks}
                onCheckedChange={() => handlePreferenceChange('tasks')}
                disabled={notificationStatus !== "granted"}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="goals">Metas</Label>
                <p className="text-sm text-muted-foreground">
                  Actualizaciones sobre el progreso de tus metas y objetivos
                </p>
              </div>
              <Switch
                id="goals"
                checked={preferences.goals}
                onCheckedChange={() => handlePreferenceChange('goals')}
                disabled={notificationStatus !== "granted"}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="reminders">Recordatorios</Label>
                <p className="text-sm text-muted-foreground">
                  Recordatorios programados para eventos y actividades
                </p>
              </div>
              <Switch
                id="reminders"
                checked={preferences.reminders}
                onCheckedChange={() => handlePreferenceChange('reminders')}
                disabled={notificationStatus !== "granted"}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="system">Sistema</Label>
                <p className="text-sm text-muted-foreground">
                  Notificaciones importantes del sistema y actualizaciones de la plataforma
                </p>
              </div>
              <Switch
                id="system"
                checked={preferences.system}
                onCheckedChange={() => handlePreferenceChange('system')}
                disabled={notificationStatus !== "granted"}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="marketing">Marketing</Label>
                <p className="text-sm text-muted-foreground">
                  Ofertas, promociones y novedades de SoulDream
                </p>
              </div>
              <Switch
                id="marketing"
                checked={preferences.marketing}
                onCheckedChange={() => handlePreferenceChange('marketing')}
                disabled={notificationStatus !== "granted"}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Info className="h-4 w-4 mr-2" />
            <span>Las preferencias se aplicarán a todos tus dispositivos</span>
          </div>
          <Button 
            onClick={savePreferences} 
            disabled={saving || notificationStatus !== "granted"}
          >
            {saving ? 'Guardando...' : 'Guardar Preferencias'}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Canales de Notificación</CardTitle>
          <CardDescription>
            Configura cómo quieres recibir tus notificaciones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="browser">Navegador</Label>
                <p className="text-sm text-muted-foreground">
                  Notificaciones push en este navegador
                </p>
              </div>
              <div className="flex items-center">
                {notificationStatus === "granted" ? (
                  <span className="text-green-500 text-sm font-medium">Activado</span>
                ) : notificationStatus === "denied" ? (
                  <span className="text-red-500 text-sm font-medium">Bloqueado</span>
                ) : (
                  <span className="text-amber-500 text-sm font-medium">No configurado</span>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email">Email</Label>
                <p className="text-sm text-muted-foreground">
                  Resumen diario de notificaciones por email
                </p>
              </div>
              <Switch
                id="email"
                checked={true}
                disabled={true}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 