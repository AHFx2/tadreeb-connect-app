
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowRight, Users, UserPlus, Calendar, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SessionStudentManagementProps {
  onBack: () => void;
}

interface Session {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  level: string;
  maxStudents: number;
  enrolledStudents: Student[];
}

interface Student {
  id: string;
  name: string;
  level: string;
  parentName: string;
  parentPhone: string;
}

const SessionStudentManagement: React.FC<SessionStudentManagementProps> = ({ onBack }) => {
  // Mock data - في التطبيق الحقيقي ستأتي من قاعدة البيانات
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: '1',
      dayOfWeek: 0,
      startTime: '08:00',
      endTime: '09:00',
      level: 'beginner',
      maxStudents: 5,
      enrolledStudents: [
        { id: '1', name: 'أحمد محمد', level: 'beginner', parentName: 'محمد أحمد', parentPhone: '0501234567' },
        { id: '2', name: 'سارة علي', level: 'beginner', parentName: 'علي سارة', parentPhone: '0507654321' }
      ]
    },
    {
      id: '2',
      dayOfWeek: 1,
      startTime: '10:00',
      endTime: '11:00',
      level: 'intermediate',
      maxStudents: 4,
      enrolledStudents: [
        { id: '3', name: 'خالد عبدالله', level: 'intermediate', parentName: 'عبدالله خالد', parentPhone: '0509876543' }
      ]
    }
  ]);

  const [availableStudents] = useState<Student[]>([
    { id: '4', name: 'فاطمة أحمد', level: 'beginner', parentName: 'أحمد فاطمة', parentPhone: '0502468135' },
    { id: '5', name: 'عمر سالم', level: 'intermediate', parentName: 'سالم عمر', parentPhone: '0503691470' },
    { id: '6', name: 'نورا حسن', level: 'advanced', parentName: 'حسن نورا', parentPhone: '0508529637' },
    { id: '7', name: 'يوسف كريم', level: 'beginner', parentName: 'كريم يوسف', parentPhone: '0507418520' }
  ]);

  const [selectedSession, setSelectedSession] = useState<string>('');
  const [studentToAdd, setStudentToAdd] = useState<string>('');

  const days = [
    { id: 0, name: 'الأحد' },
    { id: 1, name: 'الاثنين' },
    { id: 2, name: 'الثلاثاء' },
    { id: 3, name: 'الأربعاء' },
    { id: 4, name: 'الخميس' },
    { id: 5, name: 'الجمعة' },
    { id: 6, name: 'السبت' },
  ];

  const levels = {
    'beginner': 'مبتدئ',
    'intermediate': 'متوسط',
    'advanced': 'متقدم'
  };

  const getDayName = (dayId: number) => {
    return days.find(day => day.id === dayId)?.name || '';
  };

  const getAvailableStudentsForSession = (sessionLevel: string) => {
    const session = sessions.find(s => s.id === selectedSession);
    if (!session) return [];

    const enrolledIds = session.enrolledStudents.map(s => s.id);
    return availableStudents.filter(student => 
      student.level === sessionLevel && !enrolledIds.includes(student.id)
    );
  };

  const handleAddStudentToSession = () => {
    if (!selectedSession || !studentToAdd) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار الحصة والطالب",
        variant: "destructive",
      });
      return;
    }

    const session = sessions.find(s => s.id === selectedSession);
    const student = availableStudents.find(s => s.id === studentToAdd);

    if (!session || !student) return;

    if (session.enrolledStudents.length >= session.maxStudents) {
      toast({
        title: "خطأ",
        description: "الحصة مكتملة العدد",
        variant: "destructive",
      });
      return;
    }

    setSessions(prev => prev.map(s => 
      s.id === selectedSession 
        ? { ...s, enrolledStudents: [...s.enrolledStudents, student] }
        : s
    ));

    setStudentToAdd('');
    toast({
      title: "تم إضافة الطالب",
      description: `تم إضافة ${student.name} للحصة بنجاح`,
    });
  };

  const handleRemoveStudentFromSession = (sessionId: string, studentId: string) => {
    setSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { 
            ...session, 
            enrolledStudents: session.enrolledStudents.filter(s => s.id !== studentId) 
          }
        : session
    ));

    const student = availableStudents.find(s => s.id === studentId) || 
                   sessions.find(s => s.id === sessionId)?.enrolledStudents.find(s => s.id === studentId);
    
    toast({
      title: "تم إزالة الطالب",
      description: `تم إزالة ${student?.name} من الحصة`,
    });
  };

  const selectedSessionData = sessions.find(s => s.id === selectedSession);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse mb-6">
        <Button 
          variant="outline" 
          onClick={onBack} 
          className="flex items-center justify-center sm:justify-start space-x-2 rtl:space-x-reverse w-full sm:w-auto"
        >
          <ArrowRight className="h-4 w-4" />
          <span>العودة</span>
        </Button>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center sm:text-right">إدارة طلاب الحصص</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* قائمة الحصص */}
        <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-center sm:justify-end space-x-2 rtl:space-x-reverse text-lg sm:text-xl">
              <span>الحصص المجدولة</span>
              <Calendar className="h-5 w-5 text-blue-500" />
            </CardTitle>
            <CardDescription className="text-center sm:text-right text-sm sm:text-base">
              اختر حصة لعرض وإدارة الطلاب المسجلين
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {sessions.map((session) => (
              <div 
                key={session.id} 
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedSession === session.id ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedSession(session.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {getDayName(session.dayOfWeek)} - {levels[session.level as keyof typeof levels]}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {session.startTime} - {session.endTime}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="text-xs">
                    {session.enrolledStudents.length}/{session.maxStudents} طلاب
                  </Badge>
                  <Badge 
                    variant={session.enrolledStudents.length >= session.maxStudents ? "destructive" : "default"}
                    className="text-xs"
                  >
                    {session.enrolledStudents.length >= session.maxStudents ? "مكتملة" : "متاحة"}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* إدارة طلاب الحصة المختارة */}
        <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-center sm:justify-end space-x-2 rtl:space-x-reverse text-lg sm:text-xl">
              <span>إدارة الطلاب</span>
              <Users className="h-5 w-5 text-green-500" />
            </CardTitle>
            <CardDescription className="text-center sm:text-right text-sm sm:text-base">
              {selectedSession ? 'إضافة وإزالة الطلاب من الحصة المختارة' : 'اختر حصة لإدارة الطلاب'}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {selectedSession && selectedSessionData ? (
              <>
                {/* إضافة طالب جديد */}
                <div className="space-y-3 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium flex items-center space-x-2 rtl:space-x-reverse">
                    <UserPlus className="h-4 w-4 text-green-600" />
                    <span>إضافة طالب للحصة</span>
                  </h4>
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <Select value={studentToAdd} onValueChange={setStudentToAdd}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="اختر طالباً" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableStudentsForSession(selectedSessionData.level).map((student) => (
                          <SelectItem key={student.id} value={student.id}>
                            {student.name} - {student.parentName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button 
                      onClick={handleAddStudentToSession}
                      disabled={!studentToAdd || selectedSessionData.enrolledStudents.length >= selectedSessionData.maxStudents}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      إضافة
                    </Button>
                  </div>
                </div>

                {/* قائمة الطلاب المسجلين */}
                <div className="space-y-3">
                  <h4 className="font-medium">الطلاب المسجلين ({selectedSessionData.enrolledStudents.length})</h4>
                  
                  {selectedSessionData.enrolledStudents.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">لا يوجد طلاب مسجلين في هذه الحصة</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-right">اسم الطالب</TableHead>
                          <TableHead className="text-right">ولي الأمر</TableHead>
                          <TableHead className="text-right">رقم الهاتف</TableHead>
                          <TableHead className="text-right">إجراءات</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedSessionData.enrolledStudents.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">{student.name}</TableCell>
                            <TableCell>{student.parentName}</TableCell>
                            <TableCell>{student.parentPhone}</TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRemoveStudentFromSession(selectedSession, student.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>اختر حصة من القائمة لإدارة الطلاب المسجلين</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SessionStudentManagement;
