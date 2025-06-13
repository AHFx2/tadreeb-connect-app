
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, User, Phone, Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

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
    setFormData(prev => ({
      ...prev,
      selectedDays: prev.selectedDays.includes(dayId)
        ? prev.selectedDays.filter(id => id !== dayId)
        : [...prev.selectedDays, dayId]
    }));
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
            {/* Student Information */}
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="studentFirstName" className="text-sm sm:text-base font-medium">الاسم الأول *</Label>
                  <Input
                    id="studentFirstName"
                    value={formData.studentFirstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, studentFirstName: e.target.value }))}
                    placeholder="الاسم الأول للطالب"
                    className="text-right h-10 sm:h-11 text-sm sm:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="studentLastName" className="text-sm sm:text-base font-medium">الاسم الثاني *</Label>
                  <Input
                    id="studentLastName"
                    value={formData.studentLastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, studentLastName: e.target.value }))}
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
                    onChange={(e) => setFormData(prev => ({ ...prev, studentAge: e.target.value }))}
                    placeholder="العمر بالسنوات"
                    min="5"
                    max="80"
                    className="h-10 sm:h-11 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm sm:text-base font-medium">المستوى *</Label>
                <Select value={formData.level} onValueChange={(value) => setFormData(prev => ({ ...prev, level: value }))}>
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

            {/* Parent Information */}
            <div className="border-t border-gray-200 pt-6 sm:pt-8">
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 flex items-center justify-center sm:justify-end space-x-2 rtl:space-x-reverse">
                <span>بيانات ولي الأمر</span>
                <Phone className="h-5 w-5 text-green-500" />
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="parentFirstName" className="text-sm sm:text-base font-medium">الاسم الأول *</Label>
                  <Input
                    id="parentFirstName"
                    value={formData.parentFirstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, parentFirstName: e.target.value }))}
                    placeholder="الاسم الأول لولي الأمر"
                    className="text-right h-10 sm:h-11 text-sm sm:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentLastName" className="text-sm sm:text-base font-medium">الاسم الثاني *</Label>
                  <Input
                    id="parentLastName"
                    value={formData.parentLastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, parentLastName: e.target.value }))}
                    placeholder="الاسم الثاني لولي الأمر"
                    className="text-right h-10 sm:h-11 text-sm sm:text-base"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                  <Label htmlFor="parentPhone" className="text-sm sm:text-base font-medium">رقم الجوال *</Label>
                  <Input
                    id="parentPhone"
                    type="tel"
                    value={formData.parentPhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, parentPhone: e.target.value }))}
                    placeholder="05xxxxxxxx"
                    dir="ltr"
                    className="h-10 sm:h-11 text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>

            {/* Schedule */}
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
                      onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                      className="h-10 sm:h-11 text-sm sm:text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endTime" className="text-sm sm:text-base font-medium">وقت النهاية *</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                      className="h-10 sm:h-11 text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>
            </div>

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
