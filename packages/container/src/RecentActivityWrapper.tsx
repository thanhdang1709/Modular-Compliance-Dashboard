import React from 'react';
const RecentActivity = React.lazy(() => import('recentActivity/App'));

const RecentActivityWrapper: React.FC = () => (
    <React.Suspense fallback={<div>Loading...</div>}>
      <RecentActivity />
    </React.Suspense>
);

export default RecentActivityWrapper;