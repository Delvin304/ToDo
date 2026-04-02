import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  dueDate?: string; // ISO String
  createdAt: string;
}

export interface Habit {
  id: string;
  title: string;
  frequency: 'daily' | 'weekly';
  targetDaysPerWeek?: number; // useful for weekly
  completedDates: string[]; // Set of YYYY-MM-DD strings
  createdAt: string;
}

interface AppState {
  tasks: Task[];
  habits: Habit[];
  theme: 'dark' | 'light';
  
  // Task Actions
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskComplete: (id: string) => void;
  reorderTasks: (tasks: Task[]) => void;

  // Habit Actions
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'completedDates'>) => void;
  toggleHabitComplete: (id: string, dateStr: string) => void;
  deleteHabit: (id: string) => void;

  // Global Actions
  toggleTheme: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      tasks: [],
      habits: [],
      theme: 'dark',

      // Tasks
      addTask: (taskData) => set((state) => ({
        tasks: [
          ...state.tasks,
          {
            ...taskData,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString()
          }
        ]
      })),
      
      updateTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map(t => t.id === id ? { ...t, ...updates } : t)
      })),

      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(t => t.id !== id)
      })),

      toggleTaskComplete: (id) => set((state) => ({
        tasks: state.tasks.map(t => 
          t.id === id ? { ...t, completed: !t.completed } : t
        )
      })),

      reorderTasks: (tasks) => set({ tasks }),

      // Habits
      addHabit: (habitData) => set((state) => ({
        habits: [
          ...state.habits,
          {
            ...habitData,
            id: crypto.randomUUID(),
            completedDates: [],
            createdAt: new Date().toISOString()
          }
        ]
      })),

      toggleHabitComplete: (id, dateStr) => set((state) => ({
        habits: state.habits.map(h => {
          if (h.id !== id) return h;
          const isCompleted = h.completedDates.includes(dateStr);
          return {
            ...h,
            completedDates: isCompleted 
              ? h.completedDates.filter(d => d !== dateStr) 
              : [...h.completedDates, dateStr]
          };
        })
      })),

      deleteHabit: (id) => set((state) => ({
        habits: state.habits.filter(h => h.id !== id)
      })),

      // Global
      toggleTheme: () => set((state) => ({
        theme: state.theme === 'dark' ? 'light' : 'dark'
      })),
    }),
    {
      name: 'productivity-app-storage',
    }
  )
);
