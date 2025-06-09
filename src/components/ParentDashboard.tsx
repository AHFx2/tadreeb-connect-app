
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, Clock, Bell, CheckSquare } from 'lucide-react';

const ParentDashboard: React.FC = () => {
  // Mock data for parent's children
  const mockChildren = [
    {
      id: '1',
      name: 'أحمد محمد',
      age: 12,
      level: 'متقدم',
      nextSession: '2024-01-15 08:00',
      weeklySchedule: [
        { day: 'الأحد', time: '08:00 - 09:00' },
        { day: 'الثلاثاء', time: '08:00 - 09:00' },
        { day: 'الخميس', time: '08:00 - 09:00' },
      ],
      recentAttendance: [
        { date: '2024-01-14', status: 'present' },
        { date: '2024-01-12', status: 'present' },
        { date: '2024-01-10', status: 'absent' },
        { date: '2024-01-07', status: 'present' },
      ]
    }
  ];

  const getAttendanceColor = (status: string) => {
    return status === 'present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getAttendanceText = (status: string) => {
    return status === 'present' ? 'حاضر ✅' : 'غائب ❌';
  };

  return (
    <Layout title="لوحة تحكم ولي الأمر">
      <div className="space-y-4 sm:space-y-6">
        {/* Children Overview */}
        {mockChildren.map((child) => (
          <div key={child.id} className="space-y-4 sm:space-y-6">
            {/* Student Info Card */}
            <Card className="bg-gradient-to-r from-blue-50 to-green-50">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse text-base sm:text-lg">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                  <span>{child.name}</span>
                </CardTitle>
                <CardDescription className="text-sm">
                  العمر: {child.age} سنة • المستوى: {child.level}
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Next Session Alert */}
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Bell className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <h3 className="font-semibold text-orange-900 text-sm sm:text-base">الحصة القادمة</h3>
                    <p className="text-orange-700 text-xs sm:text-sm">
                      غداً الأحد في تمام الساعة 8:00 صباحاً
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Schedule & Recent Attendance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <Card>
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse text-base sm:text-lg">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                    <span>الجدول الأسبوعي</span>
                  </CardTitle>
                  <CardDescription className="text-sm">
                    أوقات التدريبات المجدولة أسبوعياً
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {child.weeklySchedule.map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="font-medium text-sm">{session.day}</span>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                          <span className="text-green-700 text-xs sm:text-sm">{session.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Attendance */}
              <Card>
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse text-base sm:text-lg">
                    <CheckSquare className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                    <span>سجل الحضور الأخير</span>
                  </CardTitle>
                  <CardDescription className="text-sm">
                    آخر 4 حصص تدريبية
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {child.recentAttendance.map((record, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600 text-xs sm:text-sm">{record.date}</span>
                        <Badge className={`${getAttendanceColor(record.status)} text-xs`}>
                          {getAttendanceText(record.status)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Attendance Statistics */}
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-base sm:text-lg">إحصائيات الحضور</CardTitle>
                <CardDescription className="text-sm">آخر 30 يوم</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  <div className="text-center p-3 sm:p-4 bg-green-50 rounded-lg">
                    <p className="text-lg sm:text-2xl font-bold text-green-600">85%</p>
                    <p className="text-xs sm:text-sm text-green-700">معدل الحضور</p>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-lg">
                    <p className="text-lg sm:text-2xl font-bold text-blue-600">12</p>
                    <p className="text-xs sm:text-sm text-blue-700">حصص حضر</p>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-red-50 rounded-lg">
                    <p className="text-lg sm:text-2xl font-bold text-red-600">2</p>
                    <p className="text-xs sm:text-sm text-red-700">حصص غاب</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Coach */}
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-base sm:text-lg">التواصل مع المدرب</CardTitle>
                <CardDescription className="text-sm">
                  لأي استفسارات أو طلبات خاصة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 rtl:space-x-reverse">
                  <Button className="bg-green-500 hover:bg-green-600 text-sm py-2">
                    📱 واتساب
                  </Button>
                  <Button variant="outline" className="text-sm py-2">
                    📞 اتصال
                  </Button>
                  <Button variant="outline" className="text-sm py-2">
                    ✉️ رسالة
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ParentDashboard;
