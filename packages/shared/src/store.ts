import create from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeStore {
  themeMode: 'light' | 'dark' | 'system';
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      themeMode: 'system',
      setThemeMode: (mode) => set({ themeMode: mode }),
      toggleTheme: () => {
        const { themeMode } = get();
        set({
          themeMode: themeMode === 'light' ? 'dark' : 'light',
        });
      },
    }),
    {
      name: 'theme-storage',
      // getStorage: () => sessionStorage,
    }
  )
);

const applyThemeMode = (themeMode: 'light' | 'dark' | 'system') => {
  if (themeMode === 'system') {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', isDarkMode);
  } else {
    document.documentElement.classList.toggle('dark', themeMode === 'dark');
  }
};


applyThemeMode(useThemeStore.getState().themeMode);
useThemeStore.subscribe((state) => applyThemeMode(state.themeMode));


interface SharedStore {
  globalMessage: string;
  setGlobalMessage: (message: string) => void;
}

export const useSharedStore = create<SharedStore>((set) => ({
  globalMessage: '',
  setGlobalMessage: (message) => set({ globalMessage: message }),
}));

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  assignedPerson: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
}

export interface Activity {
  id: string;
  timestamp: string;
  description: string;
  user: string;
}

interface TaskState {
  tasks: Task[];
  activities: Activity[];
  addTask: (task: Task) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  fetchTasks: () => void;
  addActivity: (activity: Activity) => void;
}

const createTaskStore = () => create<TaskState>((set) => ({
  tasks: [],
  activities: [],
  addTask: (task) => set((state) => {
    const newTasks = [...state.tasks, task];
    const newActivity = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      description: `Task "${task.title}" added`,
      user: 'System'
    };
    return {
      tasks: newTasks,
      activities: [newActivity, ...state.activities]
    };
  }),
  updateTask: (id, updatedTask) => set((state) => {
    const newTasks = state.tasks.map((task) =>
      task.id === id ? { ...task, ...updatedTask } : task
    );
    const updatedTaskDetails = newTasks.find(task => task.id === id);
    const newActivity = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      description: `Task "${updatedTaskDetails?.title}" updated. New status: ${updatedTaskDetails?.status}`,
      user: 'System'
    };
    return {
      tasks: newTasks,
      activities: [newActivity, ...state.activities]
    };
  }),
  deleteTask: (id) => set((state) => {
    const deletedTask = state.tasks.find(task => task.id === id);
    const newTasks = state.tasks.filter((task) => task.id !== id);
    const newActivity = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      description: `Task "${deletedTask?.title}" deleted`,
      user: 'System'
    };
    return {
      tasks: newTasks,
      activities: [newActivity, ...state.activities]
    };
  }),
  fetchTasks: () => set(() => ({
    tasks: [
      { id: '1', title: 'Review compliance policies', dueDate: '2024-08-01', assignedPerson: 'John Doe', status: 'pending' },
      { id: '2', title: 'Update security protocols', dueDate: '2024-07-15', assignedPerson: 'Jane Smith', status: 'in_progress' },
      { id: '3', title: 'Conduct staff training', dueDate: '2024-08-30', assignedPerson: 'Bob Johnson', status: 'completed' },
      { id: '4', title: 'Audit financial records', dueDate: '2024-07-01', assignedPerson: 'Alice Brown', status: 'overdue' },
      { id: '5', title: 'Implement new data protection measures', dueDate: '2024-09-15', assignedPerson: 'Charlie Wilson', status: 'pending' },
    ],
    activities: [
      { id: '1', timestamp: '2024-07-30T10:00:00Z', description: 'Task "Conduct staff training" completed', user: 'Bob Johnson' },
      { id: '2', timestamp: '2024-07-29T14:30:00Z', description: 'Task "Update security protocols" started', user: 'Jane Smith' },
      { id: '3', timestamp: '2024-07-28T09:15:00Z', description: 'New task "Implement new data protection measures" added', user: 'System' },
    ]
  })),
  addActivity: (activity) => set((state) => ({
    activities: [activity, ...state.activities]
  })),
}));

export const useTaskStore = createTaskStore();