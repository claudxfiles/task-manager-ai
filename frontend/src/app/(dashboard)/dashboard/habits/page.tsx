"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Progress } from "@/components/ui/progress";

interface Habit {
  id: string;
  name: string;
  icon: string;
  color: string;
  completedToday: boolean;
  lastCompleted?: string;
}

const EMOJIS = ["🏃", "🧘", "📚", "💪", "🎨", "🎵", "💻", "🌱", "💧", "🍎", "✍️", "🎯", "⚡️", "🌟", "🎮", "🚴", "🧠", "📝", "🎭", "🌅"];
const COLORS = ["#FF5733", "#33FF57", "#3357FF", "#FF33F5", "#33FFF5", "#F5FF33", "#FF3333", "#33FF33"];

export default function HabitsPage() {
  const [habits, setHabits] = useLocalStorage<Habit[]>("habits", []);
  const [showForm, setShowForm] = useState(false);
  const [newHabit, setNewHabit] = useState<Partial<Habit>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showColors, setShowColors] = useState(false);

  // Calcular el progreso diario
  const calculateDailyProgress = () => {
    if (habits.length === 0) return 0;
    const completedToday = habits.filter(habit => habit.completedToday).length;
    return Math.round((completedToday / habits.length) * 100);
  };

  const toggleHabitCompletion = (habitId: string) => {
    setHabits(prevHabits =>
      prevHabits.map(habit => {
        if (habit.id === habitId) {
          const now = new Date().toISOString();
          return {
            ...habit,
            completedToday: !habit.completedToday,
            lastCompleted: !habit.completedToday ? now : habit.lastCompleted
          };
        }
        return habit;
      })
    );
  };

  // Reset completedToday at midnight
  useEffect(() => {
    const checkDate = () => {
      const now = new Date();
      const lastReset = localStorage.getItem('lastReset');
      const today = now.toDateString();

      if (lastReset !== today) {
        setHabits(prevHabits =>
          prevHabits.map(habit => ({
            ...habit,
            completedToday: false
          }))
        );
        localStorage.setItem('lastReset', today);
      }
    };

    checkDate();
    const interval = setInterval(checkDate, 1000 * 60); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const handleSave = () => {
    if (!newHabit.name || !newHabit.icon) return;

    if (editingId) {
      setHabits(prevHabits =>
        prevHabits.map(habit =>
          habit.id === editingId
            ? { ...habit, ...newHabit as Habit }
            : habit
        )
      );
    } else {
      const habit: Habit = {
        id: Date.now().toString(),
        name: newHabit.name,
        icon: newHabit.icon || "⭐️",
        color: newHabit.color || COLORS[0],
        completedToday: false
      };
      setHabits(prev => [...prev, habit]);
    }

    setNewHabit({});
    setShowForm(false);
    setEditingId(null);
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== id));
  };

  const editHabit = (habit: Habit) => {
    setNewHabit(habit);
    setEditingId(habit.id);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <motion.h1 
          className="text-2xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Mis Hábitos
        </motion.h1>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus size={20} /> Nuevo Hábito
        </Button>
      </div>

      {/* Barra de progreso diario */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-2">Progreso Diario</h2>
        <Progress value={calculateDailyProgress()} className="h-3" />
        <p className="text-sm text-muted-foreground mt-2">
          {calculateDailyProgress()}% de hábitos completados hoy
        </p>
      </Card>

      {showForm && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              {editingId ? "Editar Hábito" : "Nuevo Hábito"}
            </h2>
            <Button variant="ghost" size="icon" onClick={() => {
              setShowForm(false);
              setNewHabit({});
              setEditingId(null);
            }}>
              <X size={20} />
            </Button>
          </div>

          <div className="space-y-4">
            <Input
              type="text"
              value={newHabit.name || ""}
              onChange={(e) => setNewHabit(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Nombre del hábito"
              className="mb-4"
              autoComplete="off"
              spellCheck="false"
              autoCorrect="off"
            />

            <div className="space-y-2">
              <Button 
                type="button"
                variant="outline" 
                onClick={() => setShowEmojis(!showEmojis)}
                className="w-full justify-start"
              >
                {newHabit.icon || "Seleccionar emoji"} 
              </Button>
              
              {showEmojis && (
                <div className="grid grid-cols-10 gap-2 p-2 border rounded-lg">
                  {EMOJIS.map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => {
                        setNewHabit(prev => ({ ...prev, icon: emoji }));
                        setShowEmojis(false);
                      }}
                      className="p-2 hover:bg-muted rounded-lg text-lg"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Button 
                type="button"
                variant="outline" 
                onClick={() => setShowColors(!showColors)}
                className="w-full justify-start"
                style={{ color: newHabit.color }}
              >
                {newHabit.color ? "Color seleccionado" : "Seleccionar color"}
              </Button>
              
              {showColors && (
                <div className="grid grid-cols-8 gap-2">
                  {COLORS.map(color => (
                    <button
                      key={color}
                      onClick={() => {
                        setNewHabit(prev => ({ ...prev, color }));
                        setShowColors(false);
                      }}
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => {
                setShowForm(false);
                setNewHabit({});
                setEditingId(null);
              }}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                Guardar
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {habits.map(habit => (
          <Card 
            key={habit.id}
            className={`p-4 flex items-center justify-between transition-opacity ${
              habit.completedToday ? 'opacity-50' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl" style={{ color: habit.color }}>
                {habit.icon}
              </span>
              <span className="font-medium">{habit.name}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={habit.completedToday ? "outline" : "default"}
                size="icon"
                onClick={() => toggleHabitCompletion(habit.id)}
              >
                <Check size={20} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => editHabit(habit)}
              >
                <Pencil size={20} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteHabit(habit.id)}
              >
                <Trash2 size={20} />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 