
import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

interface Session {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  level: string;
  maxStudents: number;
  currentStudents: number;
}

interface SessionSelectionProps {
  formData: {
    selectedSessions: string[];
  };
  onFormDataChange: (updates: Partial<SessionSelectionProps['formData']>) => void;
  studentLevel: string;
}

const SessionSelection: React.FC<SessionSelectionProps> = ({ formData, onFormDataChange, studentLevel }) => {
  // Mock sessions data - in real app this would come from props or API
  const availableSessions: Session[] = [
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
    },
    {
      id: '3',
      dayOfWeek: 2,
      startTime: '16:00',
      endTime: '17:00',
      level: 'beginner',
      maxStudents: 6,
      currentStudents: 1
    },
    {
      id: '4',
      dayOfWeek: 3,
      startTime: '09:00',
      endTime: '10:00',
      level: 'advanced',
      maxStudents: 3,
      currentStudents: 3
    }
  ];

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

  const handleSessionToggle = (sessionId: string) => {
    const newSelectedSessions = formData.selectedSessions.includes(sessionId)
      ? formData.selectedSessions.filter(id => id !== sessionId)
      : [...formData.selectedSessions, sessionId];
    
    onFormDataChange({ selectedSessions: newSelectedSessions });
  };

  // Filter sessions based on student level and availability
  const filteredSessions = availableSessions.filter(session => 
    session.level === studentLevel && session.currentStudents < session.maxStudents
  );

  return (
    <div className="border-t border-gray-200 pt-6 sm:pt-8">
      <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 flex items-center justify-center sm:justify-end space-x-2 rtl:space-x-reverse">
        <span>اختيار الحصص المتاحة</span>
        <Calendar className="h-5 w-5 text-orange-500" />
      </h3>
      
      <div className="space-y-4 sm:space-y-6">
        <div>
          <Label className="mb-3 block text-sm sm:text-base font-medium">
            الحصص المتاحة لمستوى {levels[studentLevel as keyof typeof levels]} *
          </Label>
          
          {filteredSessions.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">لا توجد حصص متاحة لهذا المستوى حالياً</p>
              <p className="text-sm text-gray-400 mt-1">يرجى المحاولة لاحقاً أو التواصل مع المدرب</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Checkbox
                      id={`session-${session.id}`}
                      checked={formData.selectedSessions.includes(session.id)}
                      onCheckedChange={() => handleSessionToggle(session.id)}
                    />
                    <div>
                      <Label htmlFor={`session-${session.id}`} className="cursor-pointer font-medium">
                        {getDayName(session.dayOfWeek)} - {session.startTime} إلى {session.endTime}
                      </Label>
                      <p className="text-sm text-gray-600">
                        المتاح: {session.maxStudents - session.currentStudents} من {session.maxStudents} مقاعد
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <Badge variant="outline" className="text-xs">
                      {levels[session.level as keyof typeof levels]}
                    </Badge>
                    <Badge 
                      variant={session.currentStudents >= session.maxStudents ? "destructive" : "default"}
                      className="text-xs"
                    >
                      {session.currentStudents >= session.maxStudents ? "مكتملة" : "متاحة"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionSelection;
