import * as z from 'zod';

export const taskSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Task title is required"),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  assignedPerson: z.string().optional(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']),
});

export type TaskFormValues = z.infer<typeof taskSchema>;