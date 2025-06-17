
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import StudentInfoSection from './StudentInfoSection';
import ParentInfoSection from './ParentInfoSection';
import ScheduleSection from './ScheduleSection';

interface StudentRegistrationFormProps {
  onBack: () => void;
}

const StudentRegistrationForm: React.FC<StudentRegistrationFormProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    studentFirstName: '',
    studentLastName: '',
    studentAge: '',
    level: '',
    parentFirstName: '',
    parentLastName: '',
    parentPhone: '',
    selectedDays: [] as number[],
    startTime: '',
    endTime: ''
  });

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.studentFirstName || !formData.studentLastName || !formData.studentAge || !formData.level || 
        !formData.parentFirstName || !formData.parentLastName || !formData.parentPhone || 
        formData.selectedDays.length === 0 || !formData.startTime || !formData.endTime) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    // Mock registration
    const fullStudentName = `${formData.studentFirstName} ${formData.studentLastName}`;
    console.log("Student registration data:", { ...formData, fullStudentName });
    
    toast({
      title: "تم التسجيل بنجاح!",
      description: `تم تسجيل الطالب ${fullStudentName} بنجاح`,
    });

    // Reset form
    setFormData({
      studentFirstName: '',
      studentLastName: '',
      studentAge: '',
      level: '',
      parentFirstName: '',
      parentLastName: '',
      parentPhone: '',
      selectedDays: [],
      startTime: '',
      endTime: ''
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse mb-6">
        <Button 
          variant="outline" 
          onClick={onBack} 
          className="flex items-center justify-center sm:justify-start space-x-2 rtl:space-x-reverse w-full sm:w-auto"
        >
          <ArrowRight className="h-4 w-4" />
          <span>العودة</span>
        </Button>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center sm:text-right">تسجيل طالب جديد</h2>
      </div>

      <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-center sm:justify-end space-x-2 rtl:space-x-reverse text-lg sm:text-xl">
            <span>بيانات الطالب</span>
            <User className="h-5 w-5 text-blue-500" />
          </CardTitle>
          <CardDescription className="text-center sm:text-right text-sm sm:text-base">
            أدخل بيانات الطالب وحدد جدول التدريبات
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6 sm:space-y-8">
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            <StudentInfoSection 
              formData={{
                studentFirstName: formData.studentFirstName,
                studentLastName: formData.studentLastName,
                studentAge: formData.studentAge,
                level: formData.level
              }}
              onFormDataChange={updateFormData}
            />

            <ParentInfoSection 
              formData={{
                parentFirstName: formData.parentFirstName,
                parentLastName: formData.parentLastName,
                parentPhone: formData.parentPhone
              }}
              onFormDataChange={updateFormData}
            />

            <ScheduleSection 
              formData={{
                selectedDays: formData.selectedDays,
                startTime: formData.startTime,
                endTime: formData.endTime
              }}
              onFormDataChange={updateFormData}
            />

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-medium h-12 sm:h-14 text-sm sm:text-base rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              تسجيل الطالب
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentRegistrationForm;
