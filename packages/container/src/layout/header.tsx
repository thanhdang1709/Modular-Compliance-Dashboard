import React from 'react';
import { cn } from '../lib/utils';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './theme-toggle';
import { MobileSidebar } from './mobile-sidebar';
import { navItems } from '@/constants/data';

export default function Header() {
    const location = useLocation();
    const { hash, pathname, search } = location;

    return (
        <div className="supports-backdrop-blur:bg-background/70 fixed left-0 right-0 top-0 z-20 border-b bg-background/50 backdrop-blur">
            <nav className="flex h-14 items-center justify-between px-4">
                <div className="hidden lg:block">
                    <Link
                        to={'#'}
                        target="_blank"
                        className='relative'
                    >
                        <img src="https://biwoco.com/ff4c4978b7e81e3a961653de4f8e28e7.png" alt="" />
                    </Link>
                </div>
                <div className={cn('block lg:!hidden')}>
                    <MobileSidebar />
                </div>

                <div className="hidden lg:flex items-center md:space-x-4 xl:space-x-8">

                    {navItems.map((item, index) => {
                        return (
                            <Link
                                key={index}
                                to={item.href || '/'}
                                className={cn(
                                    'text-base font-bold transition-all duration-300 hover:text-lg hover:text-cyan-500 hover:shadow-neon',
                                    pathname === item.href ? 'gradient-text hover:gradient-text-hover' : 'transparent',
                                    item.disabled && 'cursor-not-allowed opacity-80'
                                )}
                            >
                                {item.label}
                            </Link>
                        )
                    })}

                </div>

                <div className="flex items-center gap-2">
                    {/* <UserNav /> */}
                    <ThemeToggle />
                </div>
            </nav>
        </div>
    );
}
