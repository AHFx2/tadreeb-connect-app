
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, Plus, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ScheduleManagementProps {
  onBack: () => void;
}

interface Session {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  level: string;
  maxStudents: number;
  currentStudents: number;
}

const ScheduleManagement: React.FC<ScheduleManagementProps> = ({ onBack }) => {
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: '1',
      dayOfWeek: 0,
      startTime: '08:00',
      endTime: '09:00',
      level: 'beginner',
      maxStudents: 5,
      currentStudents: 3
    },
    {
      id: '2',
      dayOfWeek: 1,
      startTime: '10:00',
      endTime: '11:00',
      level: 'intermediate',
      maxStudents: 4,
      currentStudents: 2
    }
  ]);

  const [newSession, setNewSession] = useState({
    dayOfWeek: '',
    startTime: '',
    endTime: '',
    level: '',
    maxStudents: ''
  });

  const days = [
    { id: 0, name: 'الأحد' },
    { id: 1, name: 'الاثنين' },
    { id: 2, name: 'الثلاثاء' },
    { id: 3, name: 'الأربعاء' },
    { id: 4, name: 'الخميس' },
    { id: 5, name: 'الجمعة' },
    { id: 6, name: 'السبت' },
  ];

  const levels = [
    { value: 'beginner', label: 'مبتدئ' },
    { value: 'intermediate', label: 'متوسط' },
    { value: 'advanced', label: 'متقدم' }
  ];

  const handleAddSession = () => {
    if (!newSession.dayOfWeek || !newSession.startTime || !newSession.endTime || 
        !newSession.level || !newSession.maxStudents) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    const session: Session = {
      id: Date.now().toString(),
      dayOfWeek: parseInt(newSession.dayOfWeek),
      startTime: newSession.startTime,
      endTime: newSession.endTime,
      level: newSession.level,
      maxStudents: parseInt(newSession.maxStudents),
      currentStudents: 0
    };

    setSessions([...sessions, session]);
    setNewSession({
      dayOfWeek: '',
      startTime: '',
      endTime: '',
      level: '',
      maxStudents: ''
    });

    toast({
      title: "تم إضافة الحصة",
      description: "تم إضافة الحصة الجديدة بنجاح",
    });
  };

  const handleDeleteSession = (sessionId: string) => {
    setSessions(sessions.filter(session => session.id !== sessionId));
    toast({
      title: "تم حذف الحصة",
      description: "تم حذف الحصة بنجاح",
    });
  };

  const getDayName = (dayId: number) => {
    return days.find(day => day.id === dayId)?.name || '';
  };

  const getLevelName = (level: string) => {
    return levels.find(l => l.value === level)?.label || '';
  };

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
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center sm:text-right">إدارة الحصص</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* إضافة حصة جديدة */}
        <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-center sm:justify-end space-x-2 rtl:space-x-reverse text-lg sm:text-xl">
              <span>إضافة حصة جديدة</span>
              <Plus className="h-5 w-5 text-blue-500" />
            </CardTitle>
            <CardDescription className="text-center sm:text-right text-sm sm:text-base">
              أضف حصة تدريبية جديدة للجدول
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">اليوم *</Label>
                <Select value={newSession.dayOfWeek} onValueChange={(value) => setNewSession({...newSession, dayOfWeek: value})}>
                  <SelectTrigger className="text-right">
                    <SelectValue placeholder="اختر اليوم" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((day) => (
                      <SelectItem key={day.id} value={day.id.toString()}>{day.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">المستوى *</Label>
                <Select value={newSession.level} onValueChange={(value) => setNewSession({...newSession, level: value})}>
                  <SelectTrigger className="text-right">
                    <SelectValue placeholder="اختر المستوى" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime" className="text-sm font-medium">وقت البداية *</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={newSession.startTime}
                  onChange={(e) => setNewSession({...newSession, startTime: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime" className="text-sm font-medium">وقت النهاية *</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={newSession.endTime}
                  onChange={(e) => setNewSession({...newSession, endTime: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxStudents" className="text-sm font-medium">الحد الأقصى للطلاب *</Label>
              <Input
                id="maxStudents"
                type="number"
                min="1"
                max="10"
                value={newSession.maxStudents}
                onChange={(e) => setNewSession({...newSession, maxStudents: e.target.value})}
                placeholder="عدد الطلاب الأقصى"
              />
            </div>

            <Button 
              onClick={handleAddSession}
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
            >
              إضافة الحصة
            </Button>
          </CardContent>
        </Card>

        {/* قائمة الحصص الحالية */}
        <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-center sm:justify-end space-x-2 rtl:space-x-reverse text-lg sm:text-xl">
              <span>الحصص المتاحة</span>
              <Calendar className="h-5 w-5 text-orange-500" />
            </CardTitle>
            <CardDescription className="text-center sm:text-right text-sm sm:text-base">
              جميع الحصص المجدولة حالياً
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {sessions.length === 0 ? (
                <p className="text-center text-gray-500 py-8">لا توجد حصص مجدولة</p>
              ) : (
                sessions.map((session) => (
                  <div key={session.id} className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {getDayName(session.dayOfWeek)} - {getLevelName(session.level)}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {session.startTime} - {session.endTime}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteSession(session.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="text-xs">
                        {session.currentStudents}/{session.maxStudents} طلاب
                      </Badge>
                      <Badge 
                        variant={session.currentStudents >= session.maxStudents ? "destructive" : "default"}
                        className="text-xs"
                      >
                        {session.currentStudents >= session.maxStudents ? "مكتملة" : "متاحة"}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScheduleManagement;
