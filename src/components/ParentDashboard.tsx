
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, Clock, Bell, CheckSquare, MessageCircle, Phone, Mail } from 'lucide-react';

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
    return status === 'present' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200';
  };

  const getAttendanceText = (status: string) => {
    return status === 'present' ? 'حاضر ✅' : 'غائب ❌';
  };

  return (
    <Layout title="لوحة تحكم ولي الأمر">
      <div className="space-y-6">
        {/* Children Overview */}
        {mockChildren.map((child) => (
          <div key={child.id} className="space-y-6">
            {/* Student Info Card */}
            <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-0 shadow-lg">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center space-x-3 rtl:space-x-reverse text-xl">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <span>{child.name}</span>
                </CardTitle>
                <CardDescription className="text-base font-medium">
                  العمر: {child.age} سنة • المستوى: {child.level}
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Next Session Alert */}
            <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="bg-orange-100 p-3 rounded-xl">
                    <Bell className="h-7 w-7 text-orange-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-orange-900 text-lg">الحصة القادمة</h3>
                    <p className="text-orange-700 text-base font-medium">
                      غداً الأحد في تمام الساعة 8:00 صباحاً
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Schedule & Recent Attendance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-md">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3 rtl:space-x-reverse text-lg">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Calendar className="h-5 w-5 text-green-600" />
                    </div>
                    <span>الجدول الأسبوعي</span>
                  </CardTitle>
                  <CardDescription className="text-base">
                    أوقات التدريبات المجدولة أسبوعياً
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {child.weeklySchedule.map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100 hover:bg-green-100 transition-colors">
                        <span className="font-semibold text-gray-900 text-base">{session.day}</span>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Clock className="h-4 w-4 text-green-600" />
                          <span className="text-green-700 font-medium">{session.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Attendance */}
              <Card className="border-0 shadow-md">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3 rtl:space-x-reverse text-lg">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <CheckSquare className="h-5 w-5 text-blue-600" />
                    </div>
                    <span>سجل الحضور الأخير</span>
                  </CardTitle>
                  <CardDescription className="text-base">
                    آخر 4 حصص تدريبية
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {child.recentAttendance.map((record, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border hover:bg-gray-100 transition-colors">
                        <span className="text-gray-700 font-medium">{record.date}</span>
                        <Badge className={`${getAttendanceColor(record.status)} text-sm px-3 py-1 border`}>
                          {getAttendanceText(record.status)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Attendance Statistics */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">إحصائيات الحضور</CardTitle>
                <CardDescription className="text-base">آخر 30 يوم</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                    <p className="text-3xl font-bold text-green-600 mb-1">85%</p>
                    <p className="text-green-700 font-medium">معدل الحضور</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                    <p className="text-3xl font-bold text-blue-600 mb-1">12</p>
                    <p className="text-blue-700 font-medium">حصص حضر</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border border-red-100">
                    <p className="text-3xl font-bold text-red-600 mb-1">2</p>
                    <p className="text-red-700 font-medium">حصص غاب</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Coach */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">التواصل مع المدرب</CardTitle>
                <CardDescription className="text-base">
                  لأي استفسارات أو طلبات خاصة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Button className="bg-green-500 hover:bg-green-600 text-base py-3 shadow-md hover:shadow-lg transition-all flex items-center space-x-2 rtl:space-x-reverse">
                    <MessageCircle className="h-4 w-4" />
                    <span>واتساب</span>
                  </Button>
                  <Button variant="outline" className="text-base py-3 hover:bg-blue-50 border-2 flex items-center space-x-2 rtl:space-x-reverse">
                    <Phone className="h-4 w-4" />
                    <span>اتصال</span>
                  </Button>
                  <Button variant="outline" className="text-base py-3 hover:bg-purple-50 border-2 flex items-center space-x-2 rtl:space-x-reverse">
                    <Mail className="h-4 w-4" />
                    <span>رسالة</span>
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
