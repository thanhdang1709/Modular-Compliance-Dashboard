import React from 'react';
const TaskOverview = React.lazy(() => import('taskOverview/App'));

interface TaskOverviewModuleProps {
  user: any;
}

const TaskOverviewWrapper: React.FC<TaskOverviewModuleProps> = ({user}) => (
    <React.Suspense fallback={<div>Loading...</div>}>
      <TaskOverview user={user}/>
    </React.Suspense>
);

export default TaskOverviewWrapper;