import React from 'react';
import { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { get, put } from 'aws-amplify/api';
import { TaskFormValues } from '../forms/taskSchema';
import { useToast } from '../components/ui/use-toast';
import { TaskOverviewTable } from '@/tables/task-overview-table';
import awsconfig from "../../../../src/aws-exports";

Amplify.configure(awsconfig);
const existingConfig = Amplify.getConfig();
console.log('existingConfig:', existingConfig);

export const TaskOverviewModule: React.FC = () => {
    const [tasks, setTasks] = useState<TaskFormValues[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = get({
                apiName: 'a3e50sq0ka',
                path: '/tasks',
            });

            console.log('Function response:', response);

            if (Array.isArray(response)) {
                const tasksData = response.map(task => ({
                    id: task.id,
                    title: task.title,
                    dueDate: task.dueDate,
                    assignedPerson: task.assignedPerson,
                    status: task.status as 'pending' | 'in_progress' | 'completed'
                }));
                // setTasks(tasksData );
            } else {
                console.error('Unexpected response format:', response);
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'Failed to fetch tasks.',
                });
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to fetch tasks.',
            });
        }
    };

    const handleStatusChange = async (taskId: string, newStatus: 'pending' | 'in_progress' | 'completed') => {
        try {
            const response =  put({
                apiName: 'ComplianceAPI', path: `/tasks/${taskId}`, options: {
                    body: { status: newStatus }
                }
            });
            console.log('Update response:', response);
            fetchTasks();
            toast({
                title: 'Success',
                description: 'Task status updated successfully.',
            });
        } catch (error) {
            console.error('Error updating task status:', error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to update task status.',
            });
        }
    };

    return (
        <div className='p-2 mt-4'>
            <TaskOverviewTable
                data={tasks}
                columns={[
                    { accessorKey: 'title', header: 'Title' },
                    { accessorKey: 'dueDate', header: 'Due Date' },
                    { accessorKey: 'assignedPerson', header: 'Assigned To' },
                    { accessorKey: 'status', header: 'Status' },
                    {
                        id: 'actions',
                        cell: ({ row }) => (
                            <button onClick={() => handleStatusChange(row.original.id || '', 'completed')}>
                                Mark Complete
                            </button>
                        ),
                    },
                ]}
            />
        </div>
    );
};