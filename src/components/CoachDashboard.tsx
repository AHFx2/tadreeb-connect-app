
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Calendar, CheckSquare } from 'lucide-react';
import StudentRegistrationForm from '@/components/StudentRegistrationForm';
import AttendanceTracker from '@/components/AttendanceTracker';

const CoachDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'register' | 'attendance'>('overview');

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
      default:
        return (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">إجمالي الطلاب</p>
                      <p className="text-3xl font-bold">{mockStats.totalStudents}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">حصص اليوم</p>
                      <p className="text-3xl font-bold">{mockStats.todaysSessions}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-100">الحضور اليوم</p>
                      <p className="text-3xl font-bold">{mockStats.presentToday}</p>
                    </div>
                    <CheckSquare className="h-8 w-8 text-emerald-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">الغياب اليوم</p>
                      <p className="text-3xl font-bold">{mockStats.absentToday}</p>
                    </div>
                    <CheckSquare className="h-8 w-8 text-orange-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Plus className="h-5 w-5 text-blue-500" />
                    <span>تسجيل طالب جديد</span>
                  </CardTitle>
                  <CardDescription>
                    إضافة طالب جديد وتحديد جدول التدريبات الخاص به
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => setActiveTab('register')}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  >
                    تسجيل طالب جديد
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                    <CheckSquare className="h-5 w-5 text-green-500" />
                    <span>تسجيل الحضور والغياب</span>
                  </CardTitle>
                  <CardDescription>
                    متابعة حضور الطلاب وتسجيل حالات الغياب
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => setActiveTab('attendance')}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  >
                    تسجيل الحضور
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>جدول اليوم</CardTitle>
                <CardDescription>الحصص المجدولة لليوم الحالي</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { time: '08:00 - 09:00', student: 'أحمد محمد', level: 'متقدم', status: 'present' },
                    { time: '09:00 - 10:00', student: 'سارة علي', level: 'مبتدئ', status: 'present' },
                    { time: '10:00 - 11:00', student: 'محمد خالد', level: 'متوسط', status: 'absent' },
                    { time: '11:00 - 12:00', student: 'فاطمة أحمد', level: 'متقدم', status: 'pending' },
                  ].map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="text-sm">
                          <p className="font-medium">{session.student}</p>
                          <p className="text-gray-500">{session.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Badge variant="outline">{session.level}</Badge>
                        <Badge 
                          variant={
                            session.status === 'present' ? 'default' : 
                            session.status === 'absent' ? 'destructive' : 'secondary'
                          }
                        >
                          {session.status === 'present' ? 'حاضر' : 
                           session.status === 'absent' ? 'غائب' : 'في الانتظار'}
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
