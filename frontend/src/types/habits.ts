export interface Habit {
  id: string;
  name: string;
  description: string;
  frequency: number;
  daysOfWeek: number[];
  timeOfDay: string;
  reminder: boolean;
  color: string;
  icon: string;
  streak: number;
  longestStreak: number;
  createdAt: string;
  updatedAt: string;
  completedDates: string[];
}

export interface HabitCompletion {
  habitId: string;
  date: string;
  completed: boolean;
} 