
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User } from 'lucide-react';

interface StudentInfoSectionProps {
  formData: {
    studentFirstName: string;
    studentLastName: string;
    studentAge: string;
    level: string;
  };
  onFormDataChange: (updates: Partial<StudentInfoSectionProps['formData']>) => void;
}

const StudentInfoSection: React.FC<StudentInfoSectionProps> = ({ formData, onFormDataChange }) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 flex items-center justify-center sm:justify-end space-x-2 rtl:space-x-reverse">
        <span>بيانات الطالب</span>
        <User className="h-5 w-5 text-blue-500" />
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="space-y-2">
          <Label htmlFor="studentFirstName" className="text-sm sm:text-base font-medium">الاسم الأول *</Label>
          <Input
            id="studentFirstName"
            value={formData.studentFirstName}
            onChange={(e) => onFormDataChange({ studentFirstName: e.target.value })}
            placeholder="الاسم الأول للطالب"
            className="text-right h-10 sm:h-11 text-sm sm:text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="studentLastName" className="text-sm sm:text-base font-medium">الاسم الثاني *</Label>
          <Input
            id="studentLastName"
            value={formData.studentLastName}
            onChange={(e) => onFormDataChange({ studentLastName: e.target.value })}
            placeholder="الاسم الثاني للطالب"
            className="text-right h-10 sm:h-11 text-sm sm:text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="studentAge" className="text-sm sm:text-base font-medium">العمر *</Label>
          <Input
            id="studentAge"
            type="number"
            value={formData.studentAge}
            onChange={(e) => onFormDataChange({ studentAge: e.target.value })}
            placeholder="العمر بالسنوات"
            min="5"
            max="80"
            className="h-10 sm:h-11 text-sm sm:text-base"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm sm:text-base font-medium">المستوى *</Label>
        <Select value={formData.level} onValueChange={(value) => onFormDataChange({ level: value })}>
          <SelectTrigger className="text-right h-10 sm:h-11 text-sm sm:text-base">
            <SelectValue placeholder="اختر المستوى" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="beginner">مبتدئ</SelectItem>
            <SelectItem value="intermediate">متوسط</SelectItem>
            <SelectItem value="advanced">متقدم</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default StudentInfoSection;
