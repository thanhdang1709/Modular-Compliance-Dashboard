import React, { useState } from 'react';
import { navItems } from '@/constants/data';
import { cn } from '@/lib/utils';
import { ChevronLeft, Icon } from 'lucide-react';
import { useSidebar } from '@/hooks/useSidebar';
import { DashboardNav } from './dashboard-nav';
import { signOut } from 'aws-amplify/auth';
import { Icons } from '@/components/ui/icons';

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();
  const [status, setStatus] = useState(false);

  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };
  return (
    <nav
      className={cn(
        `relative hidden h-screen flex-none border-r z-10 md:block top-8`,
        status && 'duration-500',
        !isMinimized ? 'w-72' : 'w-[72px]',
        className
      )}
    >
      <ChevronLeft
        className={cn(
          'absolute -right-3 top-20 cursor-pointer rounded-full border bg-background text-3xl text-foreground',
          isMinimized && 'rotate-180'
        )}
        onClick={handleToggle}
      />
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <DashboardNav items={navItems} />
            <button onClick={() => signOut()} className="w-full px-3 py-2 text-left text-sm font-medium text-gray-500 rounded-md hover:bg-gray-100">
              <Icons.logOut className="w-5 h-5 mr-2" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
