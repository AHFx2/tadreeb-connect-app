
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 relative">
      {/* Logout Button - Fixed Position */}
      <div className="fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={logout}
          className="flex items-center space-x-2 rtl:space-x-reverse text-sm px-3 py-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors bg-white/80 backdrop-blur-sm border-gray-200 shadow-sm"
        >
          <LogOut className="h-4 w-4" />
          <span>خروج</span>
        </Button>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="space-y-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
