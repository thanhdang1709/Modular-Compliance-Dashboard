import React from 'react';
import { useTaskStore, Task } from './store/store';
import { useSharedStore } from '@modular-compliance-dashboard/shared';
// import { TaskOverviewModule } from './modules/TaskOverViewModule';
import { TaskOverviewLocal } from './modules/TaskOverViewLocal';
// import { Amplify } from 'aws-amplify';
// import awsconfig from '../../../src/aws-exports';
// Amplify.configure(awsconfig);
// const existingConfig = Amplify.getConfig();
// Amplify.configure({
//   ...existingConfig,
//   API: {
//     ...existingConfig.API,
//     REST: {
//       ...existingConfig.API?.REST,
//       'ComplianceAPI': {
//         endpoint: "https://9592smcfhe.execute-api.ap-southeast-1.amazonaws.com/biwoco",
//         region: "ap-southeast-1"
//       }
//     }
//   },
// });

const App: React.FC = () => {
  // const tasks = useTaskStore((state) => state.tasks);
  // const addTask = useTaskStore((state) => state.addTask);
  // const toggleTask = useTaskStore((state) => state.toggleTask);

  const globalMessage = useSharedStore((state) => state.globalMessage);
  const setGlobalMessage = useSharedStore((state) => state.setGlobalMessage);

  const handleAddTask = () => {
    const newTask: Task = { id: Date.now(), title: 'New Task', completed: false };
    // addTask(newTask);
    setGlobalMessage('New task added in Task Overview');
  };

  return (
    <div className='p-[1rem]'>
      <TaskOverviewLocal />
    </div>
  );
};

export default App;