
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from 'lucide-react';

interface ScheduleSectionProps {
  formData: {
    selectedDays: number[];
    startTime: string;
    endTime: string;
  };
  onFormDataChange: (updates: Partial<ScheduleSectionProps['formData']>) => void;
}

const ScheduleSection: React.FC<ScheduleSectionProps> = ({ formData, onFormDataChange }) => {
  const days = [
    { id: 0, name: 'الأحد' },
    { id: 1, name: 'الاثنين' },
    { id: 2, name: 'الثلاثاء' },
    { id: 3, name: 'الأربعاء' },
    { id: 4, name: 'الخميس' },
    { id: 5, name: 'الجمعة' },
    { id: 6, name: 'السبت' },
  ];

  const handleDayToggle = (dayId: number) => {
    const newSelectedDays = formData.selectedDays.includes(dayId)
      ? formData.selectedDays.filter(id => id !== dayId)
      : [...formData.selectedDays, dayId];
    
    onFormDataChange({ selectedDays: newSelectedDays });
  };

  return (
    <div className="border-t border-gray-200 pt-6 sm:pt-8">
      <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 flex items-center justify-center sm:justify-end space-x-2 rtl:space-x-reverse">
        <span>جدول التدريبات</span>
        <Calendar className="h-5 w-5 text-orange-500" />
      </h3>
      
      <div className="space-y-4 sm:space-y-6">
        <div>
          <Label className="mb-3 block text-sm sm:text-base font-medium">الأيام المخصصة للتدريب *</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4">
            {days.map((day) => (
              <div key={day.id} className="flex items-center space-x-2 rtl:space-x-reverse p-2 sm:p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                <Checkbox
                  id={`day-${day.id}`}
                  checked={formData.selectedDays.includes(day.id)}
                  onCheckedChange={() => handleDayToggle(day.id)}
                />
                <Label htmlFor={`day-${day.id}`} className="cursor-pointer text-xs sm:text-sm font-medium">
                  {day.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <Label htmlFor="startTime" className="text-sm sm:text-base font-medium">وقت البداية *</Label>
            <Input
              id="startTime"
              type="time"
              value={formData.startTime}
              onChange={(e) => onFormDataChange({ startTime: e.target.value })}
              className="h-10 sm:h-11 text-sm sm:text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endTime" className="text-sm sm:text-base font-medium">وقت النهاية *</Label>
            <Input
              id="endTime"
              type="time"
              value={formData.endTime}
              onChange={(e) => onFormDataChange({ endTime: e.target.value })}
              className="h-10 sm:h-11 text-sm sm:text-base"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleSection;
