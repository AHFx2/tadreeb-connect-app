
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LogOut, Users, Calendar, CheckSquare } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 sm:py-6">
            <div className="flex items-center space-x-3 sm:space-x-4 rtl:space-x-reverse min-w-0 flex-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="text-right min-w-0">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate leading-tight">{title}</h1>
                <p className="text-sm sm:text-base text-blue-600 font-medium">نادي اللياقة الرياضية</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 sm:space-x-4 rtl:space-x-reverse flex-shrink-0">
              <div className="text-right hidden md:block">
                <p className="text-sm sm:text-base font-semibold text-gray-900">{user?.name}</p>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">
                  {user?.role === 'coach' ? 'مدرب' : 'ولي أمر'}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="flex items-center space-x-2 rtl:space-x-reverse text-sm px-3 py-2 sm:px-4 sm:py-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">تسجيل خروج</span>
                <span className="sm:hidden">خروج</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

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
