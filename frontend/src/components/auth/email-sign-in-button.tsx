"use client";

import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Link from "next/link";

export function EmailSignInButton() {
  return (
    <Button 
      variant="outline" 
      size="lg" 
      className="flex items-center gap-2 w-full sm:w-auto"
      asChild
    >
      <Link href="/auth/register">
        <Mail className="h-4 w-4" />
        <span>Continuar con Email</span>
      </Link>
    </Button>
  );
} 