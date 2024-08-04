import React from 'react';
import { useTaskStore } from '@modular-compliance-dashboard/shared';

export const RecentActivityLocal: React.FC = () => {
  const { activities } = useTaskStore();

  return (
    <div>
      <h2>Recent Activity</h2>
      <ul>
        {activities.map(activity => (
          <li key={activity.id}>
            <p>{activity.description}</p>
            <p>User: {activity.user}</p>
            <p>Timestamp: {new Date(activity.timestamp).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};