
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
      <div className="space-y-6">
        {/* Children Overview */}
        {mockChildren.map((child) => (
          <div key={child.id} className="space-y-6">
            {/* Student Info Card */}
            <Card className="bg-gradient-to-r from-blue-50 to-green-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                  <User className="h-5 w-5 text-blue-500" />
                  <span>{child.name}</span>
                </CardTitle>
                <CardDescription>
                  العمر: {child.age} سنة • المستوى: {child.level}
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Next Session Alert */}
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Bell className="h-8 w-8 text-orange-500" />
                  <div>
                    <h3 className="font-semibold text-orange-900">الحصة القادمة</h3>
                    <p className="text-orange-700">
                      غداً الأحد في تمام الساعة 8:00 صباحاً
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Schedule */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Calendar className="h-5 w-5 text-green-500" />
                    <span>الجدول الأسبوعي</span>
                  </CardTitle>
                  <CardDescription>
                    أوقات التدريبات المجدولة أسبوعياً
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {child.weeklySchedule.map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="font-medium">{session.day}</span>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Clock className="h-4 w-4 text-green-600" />
                          <span className="text-green-700">{session.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Attendance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                    <CheckSquare className="h-5 w-5 text-blue-500" />
                    <span>سجل الحضور الأخير</span>
                  </CardTitle>
                  <CardDescription>
                    آخر 4 حصص تدريبية
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {child.recentAttendance.map((record, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">{record.date}</span>
                        <Badge className={getAttendanceColor(record.status)}>
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
              <CardHeader>
                <CardTitle>إحصائيات الحضور</CardTitle>
                <CardDescription>آخر 30 يوم</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">85%</p>
                    <p className="text-sm text-green-700">معدل الحضور</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">12</p>
                    <p className="text-sm text-blue-700">حصص حضر</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <p className="text-2xl font-bold text-red-600">2</p>
                    <p className="text-sm text-red-700">حصص غاب</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Coach */}
            <Card>
              <CardHeader>
                <CardTitle>التواصل مع المدرب</CardTitle>
                <CardDescription>
                  لأي استفسارات أو طلبات خاصة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-3 rtl:space-x-reverse">
                  <Button className="bg-green-500 hover:bg-green-600">
                    📱 واتساب
                  </Button>
                  <Button variant="outline">
                    📞 اتصال
                  </Button>
                  <Button variant="outline">
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
