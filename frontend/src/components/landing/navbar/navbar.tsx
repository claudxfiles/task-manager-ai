"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Brain, Menu, X } from "lucide-react";
import { signIn } from "next-auth/react";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-soul-purple to-soul-blue flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold">SoulDream</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#features"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Características
          </Link>
          <Link
            href="#how-it-works"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Cómo Funciona
          </Link>
          <Link
            href="#pricing"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Precios
          </Link>
          <Link
            href="#faq"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            FAQ
          </Link>
        </nav>

        {/* Actions */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          <ModeToggle />
          <Button variant="outline" onClick={() => signIn()}>
            Iniciar Sesión
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4">
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/pricing">Precios</Link>
                <Link href="/about">Acerca de</Link>
                <Button variant="outline" onClick={() => signIn()}>
                  Iniciar Sesión
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
} 