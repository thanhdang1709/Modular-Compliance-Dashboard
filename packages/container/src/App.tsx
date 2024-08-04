import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useSharedStore, useThemeStore,useTaskStore } from '@modular-compliance-dashboard/shared';
import TaskOverviewWrapper from './TaskOverviewWrapper';
import ComplainceStatusWrapper from './ComplianceStatusWrapper';
import RecentActivityWrapper from './RecentActivityWrapper';
import './globals.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Home from './pages/home';
import Layout from './layout';
import { AuthUser, getCurrentUser } from 'aws-amplify/auth';

const App: React.FC = () => {
  const globalMessage = useSharedStore((state: any) => state.globalMessage);
  const isDarkMode = useThemeStore((state: any) => state.isDarkMode);
  const toggleTheme = useThemeStore((state: any) => state.toggleTheme);
  const [user, setUser] = useState<AuthUser>();
  useTaskStore((state: any) => state.tasks);
  useEffect(() => {
    async function getUser() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (e) {
        console.log('Not signed in');
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <Router >
      <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="task-overview" element={<TaskOverviewWrapper user={user} />} />
            <Route path="compliance-status" element={<ComplainceStatusWrapper />} />
            <Route path="recent-activity" element={<RecentActivityWrapper />} />
            <Route path="*" element={<div className='item-center p-[5rem]'>Not Found</div>} />
          </Route>
        </Routes>

      </div>
    </Router>
  );
};

export default withAuthenticator(App);