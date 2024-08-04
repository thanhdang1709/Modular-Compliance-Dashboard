import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './layout/header';
import Sidebar from './layout/sidebar';

const Layout: React.FC = () => {
    return (
        <div className={`h-screen overflow-y-scroll bg-background-light dark:bg-background-dark`}>
            <Header />
            <div className="flex h-screen overflow-hidden">
                <Sidebar />
                <div className="relative min-h-screen w-full overflow-auto bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-black">
                    <main className="flex-1 overflow-hidden pt-12"><Outlet /></main>
                </div>
            </div>
        </div>
    );
};

export default Layout;
