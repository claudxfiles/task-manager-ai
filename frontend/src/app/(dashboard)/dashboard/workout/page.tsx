'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dumbbell, Plus, Save, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  sets: number;
  reps: number;
  weight?: number;
}

export default function WorkoutPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [newExercise, setNewExercise] = useState<Partial<Exercise>>({});

  const handleAddExercise = () => {
    if (!newExercise.name || !newExercise.muscleGroup) return;

    const exercise: Exercise = {
      id: Date.now().toString(),
      name: newExercise.name,
      muscleGroup: newExercise.muscleGroup,
      sets: newExercise.sets || 0,
      reps: newExercise.reps || 0,
      weight: newExercise.weight,
    };

    setExercises([...exercises, exercise]);
    setNewExercise({});
  };

  const handleDeleteExercise = (id: string) => {
    setExercises(exercises.filter(exercise => exercise.id !== id));
  };

  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <Dumbbell className="w-8 h-8" />
          Workout Tracker
        </h1>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Exercise</CardTitle>
              <CardDescription>Track your workout progress by adding exercises</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Exercise Name</Label>
                  <Input
                    id="name"
                    value={newExercise.name || ''}
                    onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                    placeholder="e.g. Bench Press"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="muscleGroup">Muscle Group</Label>
                  <Select
                    value={newExercise.muscleGroup}
                    onValueChange={(value) => setNewExercise({ ...newExercise, muscleGroup: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select muscle group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chest">Chest</SelectItem>
                      <SelectItem value="back">Back</SelectItem>
                      <SelectItem value="legs">Legs</SelectItem>
                      <SelectItem value="shoulders">Shoulders</SelectItem>
                      <SelectItem value="arms">Arms</SelectItem>
                      <SelectItem value="core">Core</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="sets">Sets</Label>
                  <Input
                    id="sets"
                    type="number"
                    value={newExercise.sets || ''}
                    onChange={(e) => setNewExercise({ ...newExercise, sets: parseInt(e.target.value) })}
                    placeholder="0"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="reps">Reps</Label>
                  <Input
                    id="reps"
                    type="number"
                    value={newExercise.reps || ''}
                    onChange={(e) => setNewExercise({ ...newExercise, reps: parseInt(e.target.value) })}
                    placeholder="0"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={newExercise.weight || ''}
                    onChange={(e) => setNewExercise({ ...newExercise, weight: parseInt(e.target.value) })}
                    placeholder="0"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleAddExercise} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Exercise
              </Button>
            </CardFooter>
          </Card>

          <div className="grid gap-4">
            {exercises.map((exercise) => (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{exercise.name}</CardTitle>
                    <CardDescription>{exercise.muscleGroup}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-semibold">Sets:</span> {exercise.sets}
                      </div>
                      <div>
                        <span className="font-semibold">Reps:</span> {exercise.reps}
                      </div>
                      <div>
                        <span className="font-semibold">Weight:</span> {exercise.weight || 0}kg
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => handleDeleteExercise(exercise.id)}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                    <Button variant="default">
                      <Save className="w-4 h-4 mr-2" />
                      Save Progress
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}