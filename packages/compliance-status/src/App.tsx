import React from 'react';
import { useTaskStore, Task } from './store/store';
import { useSharedStore } from '@modular-compliance-dashboard/shared';
import { ComplianceStatusModule } from './modules/ComplianceStatusModule';
import { Amplify } from 'aws-amplify';
import awsconfig from '../../../src/aws-exports';
import { ComplianceStatusLocal } from './modules/ComplicanceStatusLocal';
Amplify.configure(awsconfig);
const existingConfig = Amplify.getConfig();

const App: React.FC = () => {
  const globalMessage = useSharedStore((state) => state.globalMessage);
  const setGlobalMessage = useSharedStore((state) => state.setGlobalMessage);
  return (
    <div className='p-[1rem]'>
      <ComplianceStatusLocal />
    </div>
  );
};

export default App;