import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TaskOverviewLocal } from './TaskOverViewLocal';
import { useTaskStore } from '@modular-compliance-dashboard/shared';

jest.mock('@modular/compliance-dashboard-shared', () => ({
  useTaskStore: jest.fn(),
}));

describe('TaskOverviewLocal', () => {
  const mockTasks = [
    { id: '1', title: 'Task 1', dueDate: '2023-08-01', assignedPerson: 'John', status: 'pending' },
    { id: '2', title: 'Task 2', dueDate: '2023-08-02', assignedPerson: 'Jane', status: 'completed' },
  ];

  const mockAddTask = jest.fn();
  const mockUpdateTask = jest.fn();
  const mockDeleteTask = jest.fn();
  const mockFetchTasks = jest.fn();

  beforeEach(() => {
    (useTaskStore as unknown as jest.Mock).mockReturnValue({
      tasks: mockTasks,
      addTask: mockAddTask,
      updateTask: mockUpdateTask,
      deleteTask: mockDeleteTask,
      fetchTasks: mockFetchTasks,
    });
  });

  it('should render tasks', () => {
    render(<TaskOverviewLocal />);
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('should open add task modal when "Add New" is clicked', () => {
    render(<TaskOverviewLocal />);
    fireEvent.click(screen.getByText('Add New'));
    expect(screen.getByText('Add New Task')).toBeInTheDocument();
  });

  it('should add a new task', async () => {
    render(<TaskOverviewLocal />);
    fireEvent.click(screen.getByText('Add New'));
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByLabelText('Due Date'), { target: { value: '2023-09-01' } });
    fireEvent.change(screen.getByLabelText('Assigned To'), { target: { value: 'Bob' } });
    fireEvent.click(screen.getByText('Add Task'));

    await waitFor(() => {
      expect(mockAddTask).toHaveBeenCalledWith(expect.objectContaining({
        title: 'New Task',
        dueDate: '2023-09-01',
        assignedPerson: 'Bob',
        status: 'pending'
      }));
    });
  });

  it('should update a task status', async () => {
    render(<TaskOverviewLocal />);
    const actionsButton = screen.getAllByRole('button', { name: 'Open menu' })[0];
    fireEvent.click(actionsButton);
    fireEvent.click(screen.getByText('Complete'));

    await waitFor(() => {
      expect(mockUpdateTask).toHaveBeenCalledWith('1', { status: 'completed' });
    });
  });

  it('should delete a task', async () => {
    render(<TaskOverviewLocal />);
    const actionsButton = screen.getAllByRole('button', { name: 'Open menu' })[0];
    fireEvent.click(actionsButton);
    fireEvent.click(screen.getByText('Delete'));
    fireEvent.click(screen.getByText('Confirm'));

    await waitFor(() => {
      expect(mockDeleteTask).toHaveBeenCalledWith('1');
    });
  });

  it('should filter tasks', () => {
    render(<TaskOverviewLocal />);
    const searchInput = screen.getByPlaceholderText('Search tasks...');
    fireEvent.change(searchInput, { target: { value: 'Task 1' } });
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
  });
});