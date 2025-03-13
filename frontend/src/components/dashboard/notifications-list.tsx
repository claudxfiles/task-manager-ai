"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, BellOff, CheckCircle, XCircle, Settings } from "lucide-react";
import { toast } from "sonner";
import { requestNotificationPermission } from "@/lib/firebase";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
}

export function NotificationsList() {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [notificationStatus, setNotificationStatus] = useState<NotificationPermission>("default");

  useEffect(() => {
    const checkPermission = async () => {
      const permission = await Notification.permission;
      setNotificationStatus(permission);
    };

    checkPermission();
  }, []);

  useEffect(() => {
    const loadNotifications = async () => {
      if (!session?.user?.email) return;

      try {
        const response = await fetch(`/api/notifications?email=${session.user.email}`);
        if (!response.ok) throw new Error('Error al cargar notificaciones');
        
        const data = await response.json();
        setNotifications(data.notifications);
      } catch (error) {
        console.error('Error:', error);
        toast.error('Error al cargar las notificaciones');
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, [session?.user?.email]);

  const handleRequestPermission = async () => {
    try {
      const result = await requestNotificationPermission();
      if (result.success) {
        setNotificationStatus('granted');
        toast.success('Notificaciones activadas correctamente');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al activar las notificaciones');
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      const response = await fetch(`/api/notifications/${notificationId}/read`, {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Error al marcar como leída');

      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId 
            ? { ...notif, read: true }
            : notif
        )
      );

      toast.success('Notificación marcada como leída');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al marcar la notificación como leída');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Notificaciones</h2>
        <div className="flex items-center gap-2">
          {notificationStatus === "default" && (
            <button
              onClick={handleRequestPermission}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Bell className="h-5 w-5" />
              <span>Activar Notificaciones</span>
            </button>
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
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/notifications/settings">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Configuración de notificaciones</span>
            </Link>
          </Button>
        </div>
      </div>

      {notifications.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          <BellOff className="mx-auto h-12 w-12 mb-4" />
          <p>No tienes notificaciones</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id} className={`p-4 ${notification.read ? 'bg-muted' : 'bg-background'}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold">{notification.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{notification.body}</p>
                  <time className="text-xs text-muted-foreground mt-2 block">
                    {new Date(notification.timestamp).toLocaleString()}
                  </time>
                </div>
                {!notification.read && (
                  <button
                    onClick={() => handleMarkAsRead(notification.id)}
                    className="shrink-0 text-primary hover:text-primary/80"
                  >
                    <CheckCircle className="h-5 w-5" />
                    <span className="sr-only">Marcar como leída</span>
                  </button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 