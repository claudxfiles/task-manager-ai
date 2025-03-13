"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { NotificationManager } from "@/components/notifications/notification-manager";
import { Bell } from "lucide-react";
import { toast } from "sonner";
import { NotificationsList } from "@/components/dashboard/notifications-list";

export default function NotificationsPage() {
  const [userId, setUserId] = useState("user123");
  const [title, setTitle] = useState("SoulDream - Recordatorio");
  const [body, setBody] = useState("¡No olvides completar tus tareas de hoy!");
  const [url, setUrl] = useState("/dashboard");
  const [loading, setLoading] = useState(false);

  const sendNotification = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/notifications/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          title,
          body,
          data: {
            url,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Notificación enviada correctamente");
      } else {
        toast.error(`Error: ${data.error || "No se pudo enviar la notificación"}`);
      }
    } catch (error) {
      console.error("Error al enviar la notificación:", error);
      toast.error("Error al enviar la notificación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <NotificationsList />
    </div>
  );
} 