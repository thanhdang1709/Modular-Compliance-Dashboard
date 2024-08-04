
import React, { useState, useEffect } from 'react';
import { get } from 'aws-amplify/api';

interface Activity {
    id: string;
    timestamp: string;
    description: string;
    user: string;
}

export const RecentActivityModule: React.FC = () => {
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        fetchRecentActivities();
    }, []);

    const fetchRecentActivities = async () => {
        try {
            const response = get({
                apiName: 'ComplianceAPI',
                path: '/activity/recent',
                options: { headers: {} },
            })
            const data = await response.response;
        } catch (error) {
            console.error('Error fetching recent activities:', error);
        }
    };

    return (
        <div>
            <h2>Recent Activity</h2>
            <ul>
                {activities.map((activity) => (
                    <li key={activity.id}>
                        <p>{activity.description}</p>
                        <p>By: {activity.user}</p>
                        <p>At: {new Date(activity.timestamp).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};