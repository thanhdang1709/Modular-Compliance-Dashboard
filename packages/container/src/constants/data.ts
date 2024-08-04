import { Icons } from "@/components/ui/icons";

export interface NavItem {
    title: string;
    href?: string;
    disabled?: boolean;
    external?: boolean;
    icon?: keyof typeof Icons;
    label?: string;
    description?: string;
  }

export const navItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/',
        icon: 'dashboard',
        label: 'Dashboard'
    },

    {
        title: 'Task Overview',
        href: '/task-overview',
        icon: 'kanban',
        label: 'Task Overview'
    },
    {
        title: 'Compliance Status',
        href: '/compliance-status',
        icon: 'post',
        label: 'Compliance Status'
    },
    {
        title: 'Recent Activity',
        href: '/recent-activity',
        icon: 'user',
        label: 'Recent Activity'
    },
];
