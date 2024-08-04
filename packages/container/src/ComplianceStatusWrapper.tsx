import React from 'react';
const ComplainceStatus = React.lazy(() => import('complianceStatus/App'));

const ComplainceStatusWrapper: React.FC = () => (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ComplainceStatus />
    </React.Suspense>
);

export default ComplainceStatusWrapper;