import React from 'react';
import { useState, useEffect } from 'react';
import { get } from 'aws-amplify/api';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ComplianceStatus {
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export const ComplianceStatusModule: React.FC = () => {
  const [status, setStatus] = useState<ComplianceStatus | null>(null);

  useEffect(() => {
    fetchComplianceStatus();
  }, []);

  const fetchComplianceStatus = async () => {
    try {
      const response = get({
        apiName: 'ComplianceAPI',
        path: '/compliance/status',
        options: { headers: {} },
      });
      await response.response;
    } catch (error) {
      console.error('Error fetching compliance status:', error);
    }
  };

  if (!status) return <div>Loading...</div>;

  const data = [
    { name: 'Completed', value: status.completedTasks },
    { name: 'Pending', value: status.pendingTasks },
    { name: 'Overdue', value: status.overdueTasks },
  ];

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
        </PieChart>
      </ResponsiveContainer>
      <div>
        <p>Completed Tasks: {status.completedTasks}</p>
        <p>Pending Tasks: {status.pendingTasks}</p>
        <p>Overdue Tasks: {status.overdueTasks}</p>
      </div>
    </div>
  );
};