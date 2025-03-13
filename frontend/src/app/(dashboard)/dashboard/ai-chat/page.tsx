"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Send } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Textarea } from "@/components/ui/textarea";

interface Message {
  id: number;
  content: string;
  sender: "user" | "ai";
  timestamp: string;
}

const formatTime = () => {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
};

const initialMessages = [{
  id: 1,
  content: "¡Hola! Soy tu asistente personal de SoulDream. Cuéntame sobre tu meta y te crearé un plan detallado para alcanzarla.",
  sender: "ai",
  timestamp: formatTime(),
}];

export default function AiChatPage() {
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useLocalStorage("chat_messages", initialMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      content: inputMessage,
      sender: "user",
      timestamp: formatTime(),
    };

    setMessages([...messages, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage = {
        id: Date.now(),
        content: "Entiendo tu meta. Déjame ayudarte a crear un plan detallado para alcanzarla.",
        sender: "ai",
        timestamp: formatTime(),
      };
      setMessages([...messages, userMessage, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const clearConversation = () => {
    setMessages(initialMessages);
  };

  if (!mounted) return null;

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Chat con IA</h1>
          <p className="text-muted-foreground">
            Conversa con tu asistente personal para planificar y alcanzar tus metas
          </p>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Borrar conversación?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Se borrará toda la conversación actual.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={clearConversation}>
                Borrar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-lg border bg-background">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                message.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <span className="text-xs opacity-70 mt-2 block">
                {message.timestamp}
              </span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg p-4 bg-muted">
              <p className="text-sm">Escribiendo...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="mt-4">
        <div className="flex gap-2">
          <Textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="flex-1"
            rows={1}
          />
          <Button type="submit" size="icon" disabled={!inputMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
} 