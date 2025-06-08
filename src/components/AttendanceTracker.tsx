
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowRight, CheckSquare, X, Search, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AttendanceTrackerProps {
  onBack: () => void;
}

const AttendanceTracker: React.FC<AttendanceTrackerProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, 'present' | 'absent' | 'visitor' | null>>({});

  // Mock students for today
  const mockStudents = [
    { id: '1', name: 'أحمد محمد', time: '08:00 - 09:00', level: 'متقدم', parentPhone: '0501234567', isScheduled: true },
    { id: '2', name: 'سارة علي', time: '09:00 - 10:00', level: 'مبتدئ', parentPhone: '0501234568', isScheduled: true },
    { id: '3', name: 'محمد خالد', time: '10:00 - 11:00', level: 'متوسط', parentPhone: '0501234569', isScheduled: true },
    { id: '4', name: 'فاطمة أحمد', time: '11:00 - 12:00', level: 'متقدم', parentPhone: '0501234570', isScheduled: true },
    { id: '5', name: 'عبدالله يوسف', time: '12:00 - 13:00', level: 'مبتدئ', parentPhone: '0501234571', isScheduled: true },
    { id: '6', name: 'نور سالم', time: 'غير مجدول', level: 'متوسط', parentPhone: '0501234572', isScheduled: false },
  ];

  const filteredStudents = mockStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const markAttendance = (studentId: string, status: 'present' | 'absent' | 'visitor') => {
    setAttendanceRecords(prev => ({
      ...prev,
      [studentId]: status
    }));

    const student = mockStudents.find(s => s.id === studentId);
    const statusText = status === 'present' ? 'حاضر' : status === 'absent' ? 'غائب' : 'زائر';
    
    toast({
      title: "تم تسجيل الحضور",
      description: `تم تسجيل ${student?.name} كـ ${statusText}`,
    });
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'present': return 'default';
      case 'absent': return 'destructive';
      case 'visitor': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusText = (status: string | null) => {
    switch (status) {
      case 'present': return 'حاضر ✅';
      case 'absent': return 'غائب ❌';
      case 'visitor': return 'زائر 👤';
      default: return 'في الانتظار ⏳';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
        <Button variant="outline" onClick={onBack} className="flex items-center space-x-2 rtl:space-x-reverse">
          <ArrowRight className="h-4 w-4" />
          <span>العودة</span>
        </Button>
        <h2 className="text-2xl font-bold">تسجيل الحضور والغياب</h2>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="البحث عن طالب..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-right pr-10"
            />
          </div>
        </div>
        
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-green-600">الحضور</p>
            <p className="text-2xl font-bold text-green-700">
              {Object.values(attendanceRecords).filter(status => status === 'present').length}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-red-600">الغياب</p>
            <p className="text-2xl font-bold text-red-700">
              {Object.values(attendanceRecords).filter(status => status === 'absent').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Students List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
            <Clock className="h-5 w-5 text-blue-500" />
            <span>طلاب اليوم</span>
          </CardTitle>
          <CardDescription>
            انقر على الأزرار لتسجيل حضور أو غياب الطلاب
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {filteredStudents.map((student) => {
              const currentStatus = attendanceRecords[student.id];
              
              return (
                <div 
                  key={student.id} 
                  className={`p-4 rounded-lg border transition-all ${
                    !student.isScheduled ? 'bg-yellow-50 border-yellow-200' : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                        <h3 className="font-semibold text-lg">{student.name}</h3>
                        {!student.isScheduled && (
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                            غير مجدول
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-600">
                        <span>📞 {student.parentPhone}</span>
                        <span>⏰ {student.time}</span>
                        <Badge variant="outline">{student.level}</Badge>
                        <Badge variant={getStatusColor(currentStatus)}>
                          {getStatusText(currentStatus)}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Button
                        size="sm"
                        variant={currentStatus === 'present' ? 'default' : 'outline'}
                        onClick={() => markAttendance(student.id, 'present')}
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        <CheckSquare className="h-4 w-4 mr-1" />
                        حاضر
                      </Button>
                      
                      <Button
                        size="sm"
                        variant={currentStatus === 'absent' ? 'destructive' : 'outline'}
                        onClick={() => markAttendance(student.id, 'absent')}
                      >
                        <X className="h-4 w-4 mr-1" />
                        غائب
                      </Button>

                      {!student.isScheduled && (
                        <Button
                          size="sm"
                          variant={currentStatus === 'visitor' ? 'secondary' : 'outline'}
                          onClick={() => markAttendance(student.id, 'visitor')}
                        >
                          زائر
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>لا توجد نتائج للبحث</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceTracker;
