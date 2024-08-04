import React from 'react';
import { useTaskStore } from '@modular-compliance-dashboard/shared';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export const ComplianceStatusLocal: React.FC = () => {
  const { tasks } = useTaskStore();

  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in_progress').length;
  const overdueTasks = tasks.filter(task => task.status === 'overdue').length;
  const totalTasks = tasks.length;

  const data = [
    { name: 'Completed', value: completedTasks },
    { name: 'Pending', value: pendingTasks },
    { name: 'In Progress', value: inProgressTasks },
    { name: 'Overdue', value: overdueTasks },
  ];

  const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#FF0000'];

  return (
    <div>
      <h2>Compliance Status</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div>
        <p>Completed Tasks: {completedTasks} ({(completedTasks / totalTasks * 100).toFixed(2)}%)</p>
        <p>Pending Tasks: {pendingTasks} ({(pendingTasks / totalTasks * 100).toFixed(2)}%)</p>
        <p>In Progress Tasks: {inProgressTasks} ({(inProgressTasks / totalTasks * 100).toFixed(2)}%)</p>
        <p>Overdue Tasks: {overdueTasks} ({(overdueTasks / totalTasks * 100).toFixed(2)}%)</p>
      </div>
    </div>
  );
};