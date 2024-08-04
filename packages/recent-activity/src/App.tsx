import React from 'react';
import { useTaskStore, Task } from './store/store';
import { useSharedStore } from '@modular-compliance-dashboard/shared';
import { RecentActivityModule } from './modules/RecentActivityModule';
import { Amplify } from 'aws-amplify';
import awsconfig from '../../../src/aws-exports';
import { RecentActivityLocal } from './modules/RecentActivityLocal';
Amplify.configure(awsconfig);
const existingConfig = Amplify.getConfig();
Amplify.configure({
  ...existingConfig,
  API: {
    ...existingConfig.API,
    REST: {
      ...existingConfig.API?.REST,
      'ComplianceAPI': {
        endpoint: "https://9592smcfhe.execute-api.ap-southeast-1.amazonaws.com/biwoco",
        region: "ap-southeast-1"
      }
    }
  },
});

const App: React.FC = () => {

  const globalMessage = useSharedStore((state) => state.globalMessage);
  const setGlobalMessage = useSharedStore((state) => state.setGlobalMessage);


  return (
    <div className='p-[1rem]'>
      <RecentActivityLocal />
    </div>
  );
};

export default App;