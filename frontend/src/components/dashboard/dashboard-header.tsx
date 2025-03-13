"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  Menu, 
  X, 
  Settings, 
  LogOut, 
  User, 
  HelpCircle 
} from "lucide-react";
import Link from "next/link";
import { NotificationButton } from "./notification-button";

interface DashboardHeaderProps {
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
}

export function DashboardHeader({ onMenuToggle, isSidebarOpen }: DashboardHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Button variant="ghost" size="icon" onClick={onMenuToggle} className="shrink-0">
        {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        <span className="sr-only">Toggle Menu</span>
      </Button>
      
      <div className="flex-1">
        {isSearchOpen ? (
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar..."
              className="w-full md:w-[300px] bg-background"
              autoFocus
              onBlur={() => setIsSearchOpen(false)}
            />
          </div>
        ) : (
          <div className="hidden md:flex">
            <Link href="/dashboard" className="font-semibold">
              SoulDream
            </Link>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        {!isSearchOpen && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(true)}
            className="shrink-0"
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Buscar</span>
          </Button>
        )}
        
        <NotificationButton userId="user123" />
        
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/settings">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Configuración</span>
          </Link>
        </Button>
        
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/help">
            <HelpCircle className="h-5 w-5" />
            <span className="sr-only">Ayuda</span>
          </Link>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/user.png" alt="Usuario" />
                <AvatarFallback>US</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile" className="cursor-pointer flex w-full">
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="cursor-pointer flex w-full">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/auth/logout" className="cursor-pointer flex w-full text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
} 