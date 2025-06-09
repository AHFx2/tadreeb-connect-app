
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckSquare, Calendar, User } from 'lucide-react';

interface AttendanceTrackerProps {
  onBack: () => void;
}

const AttendanceTracker: React.FC<AttendanceTrackerProps> = ({ onBack }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Mock students data for today's sessions
  const mockStudents = [
    {
      id: '1',
      name: 'أحمد محمد',
      level: 'متقدم',
      time: '08:00 - 09:00',
      status: null,
      parentPhone: '0501234567'
    },
    {
      id: '2', 
      name: 'سارة علي',
      level: 'مبتدئ',
      time: '09:00 - 10:00',
      status: 'present',
      parentPhone: '0507654321'
    },
    {
      id: '3',
      name: 'محمد خالد', 
      level: 'متوسط',
      time: '10:00 - 11:00',
      status: 'absent',
      parentPhone: '0509876543'
    },
    {
      id: '4',
      name: 'فاطمة أحمد',
      level: 'متقدم', 
      time: '11:00 - 12:00',
      status: null,
      parentPhone: '0502468135'
    }
  ];

  const [students, setStudents] = useState(mockStudents);

  const markAttendance = (studentId: string, status: 'present' | 'absent') => {
    setStudents(prev => prev.map(student => 
      student.id === studentId ? { ...student, status } : student
    ));
  };

  const getStatusBadge = (status: string | null) => {
    if (status === 'present') {
      return <Badge className="bg-green-100 text-green-800">حاضر ✅</Badge>;
    } else if (status === 'absent') {
      return <Badge className="bg-red-100 text-red-800">غائب ❌</Badge>;
    } else {
      return <Badge variant="outline">في الانتظار</Badge>;
    }
  };

  const todayStats = {
    total: students.length,
    present: students.filter(s => s.status === 'present').length,
    absent: students.filter(s => s.status === 'absent').length,
    pending: students.filter(s => s.status === null).length
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="flex items-center space-x-2 rtl:space-x-reverse text-sm"
          >
            <ArrowRight className="h-4 w-4" />
            <span>العودة</span>
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
          <label className="text-sm font-medium">التاريخ:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="bg-blue-50">
          <CardContent className="p-3 sm:p-4">
            <div className="text-center">
              <p className="text-lg sm:text-2xl font-bold text-blue-600">{todayStats.total}</p>
              <p className="text-xs sm:text-sm text-blue-700">إجمالي الطلاب</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50">
          <CardContent className="p-3 sm:p-4">
            <div className="text-center">
              <p className="text-lg sm:text-2xl font-bold text-green-600">{todayStats.present}</p>
              <p className="text-xs sm:text-sm text-green-700">حاضر</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50">
          <CardContent className="p-3 sm:p-4">
            <div className="text-center">
              <p className="text-lg sm:text-2xl font-bold text-red-600">{todayStats.absent}</p>
              <p className="text-xs sm:text-sm text-red-700">غائب</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50">
          <CardContent className="p-3 sm:p-4">
            <div className="text-center">
              <p className="text-lg sm:text-2xl font-bold text-orange-600">{todayStats.pending}</p>
              <p className="text-xs sm:text-sm text-orange-700">في الانتظار</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students List */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse text-lg">
            <CheckSquare className="h-5 w-5 text-blue-500" />
            <span>تسجيل الحضور والغياب</span>
          </CardTitle>
          <CardDescription className="text-sm">
            اضغط على الأزرار لتسجيل حضور أو غياب الطلاب
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-3 sm:space-y-4">
          {students.map((student) => (
            <div
              key={student.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg space-y-3 sm:space-y-0"
            >
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <User className="h-8 w-8 text-gray-400 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{student.name}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <p className="text-xs sm:text-sm text-gray-500">{student.time}</p>
                    <Badge variant="outline" className="text-xs">{student.level}</Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end space-x-3 rtl:space-x-reverse">
                <div className="flex-shrink-0">
                  {getStatusBadge(student.status)}
                </div>
                
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <Button
                    size="sm"
                    className="bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm px-2 sm:px-3"
                    onClick={() => markAttendance(student.id, 'present')}
                    disabled={student.status === 'present'}
                  >
                    حاضر ✅
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="text-xs sm:text-sm px-2 sm:px-3"
                    onClick={() => markAttendance(student.id, 'absent')}
                    disabled={student.status === 'absent'}
                  >
                    غائب ❌
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Button 
          className="w-full sm:flex-1 bg-blue-500 hover:bg-blue-600 text-sm sm:text-base py-2 sm:py-3"
        >
          💾 حفظ سجل الحضور
        </Button>
        <Button 
          variant="outline" 
          className="w-full sm:flex-1 text-sm sm:text-base py-2 sm:py-3"
        >
          📱 إرسال تقرير لأولياء الأمور
        </Button>
      </div>
    </div>
  );
};

export default AttendanceTracker;
