import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  Settings, 
  LogOut,
  ShieldCheck,
  School,
  FileText,
  CreditCard,
  PenLine,
  AlertCircle
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  roles: string[];
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['SUPER_ADMIN', 'SCHOOL_OWNER', 'SCHOOL_ADMIN', 'TEACHER'],
  },
  {
    title: 'Schools',
    href: '/schools',
    icon: School,
    roles: ['SUPER_ADMIN'],
  },
  {
    title: 'Teachers',
    href: '/teachers',
    icon: Users,
    roles: ['SCHOOL_OWNER', 'SCHOOL_ADMIN'],
  },
  {
    title: 'Students',
    href: '/students',
    icon: GraduationCap,
    roles: ['SCHOOL_OWNER', 'SCHOOL_ADMIN', 'TEACHER'],
  },
  {
    title: 'Classes',
    href: '/classes',
    icon: BookOpen,
    roles: ['SCHOOL_OWNER', 'SCHOOL_ADMIN', 'TEACHER'],
  },
  {
    title: 'Subjects',
    href: '/subjects',
    icon: FileText,
    roles: ['SCHOOL_OWNER', 'SCHOOL_ADMIN'],
  },
  {
    title: 'Academic Sessions',
    href: '/sessions',
    icon: Calendar,
    roles: ['SCHOOL_OWNER', 'SCHOOL_ADMIN'],
  },
  {
    title: 'Scores',
    href: '/scores',
    icon: ShieldCheck,
    roles: ['SCHOOL_ADMIN', 'TEACHER'],
  },
  {
    title: 'Result Entry',
    href: '/result-entry',
    icon: PenLine,
    roles: ['TEACHER'],
  },
  {
    title: 'Payments',
    href: '/payments',
    icon: CreditCard,
    roles: ['SCHOOL_OWNER', 'SCHOOL_ADMIN'],
  },
  {
    title: 'Interventions',
    href: '/interventions',
    icon: AlertCircle,
    roles: ['SCHOOL_ADMIN', 'TEACHER'],
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['SUPER_ADMIN', 'SCHOOL_OWNER', 'SCHOOL_ADMIN', 'TEACHER'],
  },
];

export function Sidebar() {
  const { role, logout } = useAuthStore();
  
  const filteredNavItems = navItems.filter(item => role && item.roles.includes(role));

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-card text-card-foreground">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold text-primary">EduInsight</h1>
      </div>
      
      <ScrollArea className="flex-1 px-4 py-4">
        <nav className="space-y-1">
          {filteredNavItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                "text-muted-foreground"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.title}
            </a>
          ))}
        </nav>
      </ScrollArea>
      
      <div className="border-t p-4">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-muted-foreground hover:text-destructive"
          onClick={logout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}
