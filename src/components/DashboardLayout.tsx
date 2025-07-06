
import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { NotificationBell } from '@/components/NotificationBell';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  GraduationCap,
  LogOut,
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      current: location.pathname === '/admin',
    },
    {
      name: isAdmin ? 'Leads Management' : 'My Leads',
      href: '/admin/leads',
      icon: Users,
      current: location.pathname === '/admin/leads',
    },
    ...(isAdmin ? [{
      name: 'User Management',
      href: '/admin/users',
      icon: UserCheck,
      current: location.pathname === '/admin/users',
    }, {
      name: 'Students',
      href: '/admin/students',
      icon: GraduationCap,
      current: location.pathname === '/admin/students',
    }] : []),
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-card border-r border-border">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-primary">Codelabs Admin</h1>
            </div>
            <div className="mt-5 flex-grow flex flex-col">
              <nav className="flex-1 px-2 pb-4 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`${
                        item.current
                          ? 'bg-primary/10 text-primary border-r-2 border-primary'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      } group flex items-center px-3 py-2.5 text-sm font-medium rounded-l-lg transition-all duration-200`}
                    >
                      <Icon
                        className={`${
                          item.current ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                        } mr-3 flex-shrink-0 h-5 w-5 transition-colors duration-200`}
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          <header className="bg-card/50 backdrop-blur-sm shadow-sm border-b border-border">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center">
                <h2 className="text-lg font-semibold text-foreground">
                  Welcome back, {user?.full_name}
                </h2>
              </div>
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <NotificationBell />
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </header>

          {/* Main content area */}
          <main className="flex-1 overflow-y-auto">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
