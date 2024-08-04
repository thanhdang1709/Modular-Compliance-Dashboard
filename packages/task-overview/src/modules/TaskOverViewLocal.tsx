import React, { useEffect, useState } from 'react';
import { useTaskStore, Task } from '@modular-compliance-dashboard/shared';
import { TaskOverviewTable } from '@/tables/task-overview-table';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AddTaskModal } from './AddModal';
import { DataTable } from '@/components/ui/data-table';
import { CellAction } from '@/tables/task-cell-action';

export const TaskOverviewLocal: React.FC = () => {
  const { tasks, fetchTasks, updateTask, deleteTask } = useTaskStore();
  const [sortConfig, setSortConfig] = useState<{ key: keyof Task, direction: 'asc' | 'desc' } | null>(null);
  const [filterStatus, setFilterStatus] = useState<Task['status'] | 'all'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    updateTask(taskId, { status: newStatus });
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
  };

  const sortedTasks = React.useMemo(() => {
    let sortableTasks = [...tasks];
    if (sortConfig !== null) {
      sortableTasks.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableTasks;
  }, [tasks, sortConfig]);

  const filteredTasks = filterStatus === 'all' ? sortedTasks : sortedTasks.filter(task => task.status === filterStatus);

  const requestSort = (key: keyof Task) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="p-4">

      <div className="mt-40">
        <div className="flex items-center justify-between mb-4">
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>

          <div className="flex fex-col items-center space-x-4">
            <label className="text-gray-700 dark:text-gray-300">
              Filter by status: {' '}
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as Task['status'] | 'all')}
              className="form-select mt-1 block w-48 pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>

      </div>


      <DataTable
        data={filteredTasks}
        columns={[
          {
            accessorKey: 'title',
            header: 'Title',
            cell: (info) => info.getValue(),
            enableSorting: true,
          },
          {
            accessorKey: 'dueDate',
            header: 'Due Date',
            cell: (info) => info.getValue(),
            enableSorting: true,
          },
          {
            accessorKey: 'assignedPerson',
            header: 'Assigned To',
            cell: (info) => info.getValue(),
            enableSorting: true,
          },
          {
            accessorKey: 'status',
            header: 'Status',
            cell: (info) => info.getValue(),
            enableSorting: true,
          },
          {
            id: 'actions',
            cell: ({ row }) => CellAction({ data: row.original, }),
          },
        ]} searchKey={''}
      />
      <AddTaskModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
};