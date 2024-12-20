// src/types/Task.ts
export interface Task {
    id: number;
    title: string;
    description: string;
    status: 'task' | 'in-progress' | 'done';
  }
  