import create from 'zustand';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  toggleTask: (id: number) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  toggleTask: (id) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ),
  })),
}));