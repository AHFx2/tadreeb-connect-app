
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Calendar, CheckSquare, TrendingUp, Settings } from 'lucide-react';
import StudentRegistrationForm from '@/components/StudentRegistrationForm';
import AttendanceTracker from '@/components/AttendanceTracker';
import ScheduleManagement from '@/components/ScheduleManagement';

const CoachDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'register' | 'attendance' | 'schedule'>('overview');

  const mockStats = {
    totalStudents: 24,
    todaysSessions: 6,
    presentToday: 18,
    absentToday: 3
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'register':
        return <StudentRegistrationForm onBack={() => setActiveTab('overview')} />;
      case 'attendance':
        return <AttendanceTracker onBack={() => setActiveTab('overview')} />;
      case 'schedule':
        return <ScheduleManagement onBack={() => setActiveTab('overview')} />;
      default:
        return (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-blue-100 text-xs sm:text-sm font-medium">إجمالي الطلاب</p>
                      <p className="text-2xl sm:text-3xl font-bold">{mockStats.totalStudents}</p>
                    </div>
                    <div className="bg-blue-400/20 p-2 sm:p-3 rounded-xl">
                      <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-100" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-green-100 text-xs sm:text-sm font-medium">حصص اليوم</p>
                      <p className="text-2xl sm:text-3xl font-bold">{mockStats.todaysSessions}</p>
                    </div>
                    <div className="bg-green-400/20 p-2 sm:p-3 rounded-xl">
                      <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-green-100" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-emerald-100 text-xs sm:text-sm font-medium">الحضور اليوم</p>
                      <p className="text-2xl sm:text-3xl font-bold">{mockStats.presentToday}</p>
                    </div>
                    <div className="bg-emerald-400/20 p-2 sm:p-3 rounded-xl">
                      <CheckSquare className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-100" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-orange-100 text-xs sm:text-sm font-medium">الغياب اليوم</p>
                      <p className="text-2xl sm:text-3xl font-bold">{mockStats.absentToday}</p>
                    </div>
                    <div className="bg-orange-400/20 p-2 sm:p-3 rounded-xl">
                      <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-orange-100" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3 rtl:space-x-reverse text-lg">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Plus className="h-5 w-5 text-blue-600" />
                    </div>
                    <span>تسجيل طالب جديد</span>
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    إضافة طالب جديد وتحديد جدول التدريبات الخاص به
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    onClick={() => setActiveTab('register')}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-base py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
                  >
                    تسجيل طالب جديد
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3 rtl:space-x-reverse text-lg">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <CheckSquare className="h-5 w-5 text-green-600" />
                    </div>
                    <span>تسجيل الحضور والغياب</span>
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    متابعة حضور الطلاب وتسجيل حالات الغياب
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    onClick={() => setActiveTab('attendance')}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-base py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
                  >
                    تسجيل الحضور
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3 rtl:space-x-reverse text-lg">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <Settings className="h-5 w-5 text-orange-600" />
                    </div>
                    <span>إدارة الحصص</span>
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    إضافة وتعديل الحصص التدريبية في الجدول
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    onClick={() => setActiveTab('schedule')}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-base py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
                  >
                    إدارة الحصص
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Today's Schedule */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </div>
                  <span>جدول اليوم</span>
                </CardTitle>
                <CardDescription className="text-base">الحصص المجدولة لليوم الحالي</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { time: '08:00 - 09:00', student: 'أحمد محمد', level: 'متقدم', status: 'present' },
                    { time: '09:00 - 10:00', student: 'سارة علي', level: 'مبتدئ', status: 'present' },
                    { time: '10:00 - 11:00', student: 'محمد خالد', level: 'متوسط', status: 'absent' },
                    { time: '11:00 - 12:00', student: 'فاطمة أحمد', level: 'متقدم', status: 'pending' },
                  ].map((session, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl border hover:bg-gray-100 transition-colors space-y-3 sm:space-y-0">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse min-w-0 flex-1">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Users className="h-5 w-5 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-900 truncate text-base">{session.student}</p>
                          <p className="text-gray-600 text-sm font-medium">{session.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end space-x-3 rtl:space-x-reverse">
                        <Badge variant="outline" className="text-sm px-3 py-1">{session.level}</Badge>
                        <Badge 
                          variant={
                            session.status === 'present' ? 'default' : 
                            session.status === 'absent' ? 'destructive' : 'secondary'
                          }
                          className="text-sm px-3 py-1"
                        >
                          {session.status === 'present' ? 'حاضر ✅' : 
                           session.status === 'absent' ? 'غائب ❌' : 'في الانتظار ⏳'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <Layout title="لوحة تحكم المدرب">
      {renderContent()}
    </Layout>
  );
};

export default CoachDashboard;
