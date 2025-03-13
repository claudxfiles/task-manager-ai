"use client";

import { motion } from "framer-motion";
import { Brain, User } from "lucide-react";

interface ChatMessageProps {
  content: string;
  sender: "user" | "ai";
  timestamp: string;
  isLoading?: boolean;
  isTask?: boolean;
}

export function ChatMessage({ content, sender, timestamp, isLoading, isTask }: ChatMessageProps) {
  return (
    <motion.div
      className={`flex gap-3 ${
        sender === "user" ? "justify-end" : "justify-start"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {sender === "ai" && (
        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-soul-purple to-soul-blue flex items-center justify-center">
          <Brain className="w-4 h-4 text-white" />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          sender === "user"
            ? "bg-primary text-primary-foreground"
            : isTask 
              ? "bg-muted border-l-4 border-soul-purple" 
              : "bg-muted"
        }`}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        ) : (
          <>
            <div className="text-sm whitespace-pre-line">{content}</div>
            <p className="text-xs opacity-70 mt-1">{timestamp}</p>
          </>
        )}
      </div>
      {sender === "user" && (
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <User className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
    </motion.div>
  );
} 