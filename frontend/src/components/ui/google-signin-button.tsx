"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Image from "next/image";

interface GoogleSignInButtonProps {
  className?: string;
  callbackUrl?: string;
  text?: string;
}

export function GoogleSignInButton({
  className = "",
  callbackUrl = "/dashboard",
  text = "Continuar con Google"
}: GoogleSignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      await signIn("google", { callbackUrl });
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      type="button"
      disabled={isLoading}
      className={`w-full flex items-center justify-center gap-2 ${className}`}
      onClick={handleClick}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <div className="flex items-center justify-center gap-2">
          <Image 
            src="/google-logo.svg" 
            alt="Google" 
            width={18} 
            height={18} 
            className="h-4 w-4" 
          />
          {text}
        </div>
      )}
    </Button>
  );
} 