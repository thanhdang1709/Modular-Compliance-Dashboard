import React, { lazy, Suspense, useEffect } from 'react';
import { useSharedStore, useThemeStore } from '@modular-compliance-dashboard/shared';

const Home: React.FC = () => {
  const globalMessage = useSharedStore((state: any) => state.globalMessage);
  const isDarkMode = useThemeStore((state: any) => state.isDarkMode);
  const toggleTheme = useThemeStore((state: any) => state.toggleTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (

    <div className='p-[1rem]'>
      <h1 className="text-2xl font-bold mb-4 text-red-500 m-8">Modular Compliance Dashboard</h1>
      
    </div>
  );
};

export default Home;