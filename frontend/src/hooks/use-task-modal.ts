import { create } from "zustand"
import { Task, TaskStatus } from "@/types/task"

interface TaskModalStore {
  isOpen: boolean
  task?: Task
  defaultStatus?: TaskStatus
  openModal: (options?: { task?: Task; defaultStatus?: TaskStatus }) => void
  closeModal: () => void
}

export const useTaskModal = create<TaskModalStore>((set) => ({
  isOpen: false,
  task: undefined,
  defaultStatus: undefined,
  openModal: (options) =>
    set({ isOpen: true, task: options?.task, defaultStatus: options?.defaultStatus }),
  closeModal: () => set({ isOpen: false, task: undefined, defaultStatus: undefined }),
})) 