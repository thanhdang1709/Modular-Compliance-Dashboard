import { ColumnDef } from '@tanstack/react-table';
import { TaskFormValues } from '../forms/taskSchema';
import { CellAction } from './task-cell-action';
import { Button } from '../components/ui/button';

export const columns: ColumnDef<TaskFormValues>[] = [
  {
    accessorKey: 'title',
    header: 'Title'
  },
  {
    accessorKey: 'dueDate',
    header: 'Due Date'
  },
  {
    accessorKey: 'assignedPerson',
    header: 'Assigned To'
  },
  {
    accessorKey: 'status',
    header: 'Status'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];