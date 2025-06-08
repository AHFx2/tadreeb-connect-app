
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
    studentName: '',
    studentAge: '',
    level: '',
    parentName: '',
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
    
    if (!formData.studentName || !formData.studentAge || !formData.level || 
        !formData.parentName || !formData.parentPhone || 
        formData.selectedDays.length === 0 || !formData.startTime || !formData.endTime) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    // Mock registration
    console.log("Student registration data:", formData);
    
    toast({
      title: "تم التسجيل بنجاح!",
      description: `تم تسجيل الطالب ${formData.studentName} بنجاح`,
    });

    // Reset form
    setFormData({
      studentName: '',
      studentAge: '',
      level: '',
      parentName: '',
      parentPhone: '',
      selectedDays: [],
      startTime: '',
      endTime: ''
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
        <Button variant="outline" onClick={onBack} className="flex items-center space-x-2 rtl:space-x-reverse">
          <ArrowRight className="h-4 w-4" />
          <span>العودة</span>
        </Button>
        <h2 className="text-2xl font-bold">تسجيل طالب جديد</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
            <User className="h-5 w-5 text-blue-500" />
            <span>بيانات الطالب</span>
          </CardTitle>
          <CardDescription>
            أدخل بيانات الطالب وحدد جدول التدريبات
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Student Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentName">اسم الطالب *</Label>
                <Input
                  id="studentName"
                  value={formData.studentName}
                  onChange={(e) => setFormData(prev => ({ ...prev, studentName: e.target.value }))}
                  placeholder="أدخل اسم الطالب"
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="studentAge">العمر *</Label>
                <Input
                  id="studentAge"
                  type="number"
                  value={formData.studentAge}
                  onChange={(e) => setFormData(prev => ({ ...prev, studentAge: e.target.value }))}
                  placeholder="العمر بالسنوات"
                  min="5"
                  max="80"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>المستوى *</Label>
              <Select value={formData.level} onValueChange={(value) => setFormData(prev => ({ ...prev, level: value }))}>
                <SelectTrigger className="text-right">
                  <SelectValue placeholder="اختر المستوى" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">مبتدئ</SelectItem>
                  <SelectItem value="intermediate">متوسط</SelectItem>
                  <SelectItem value="advanced">متقدم</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Parent Information */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2 rtl:space-x-reverse">
                <Phone className="h-5 w-5 text-green-500" />
                <span>بيانات ولي الأمر</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="parentName">اسم ولي الأمر *</Label>
                  <Input
                    id="parentName"
                    value={formData.parentName}
                    onChange={(e) => setFormData(prev => ({ ...prev, parentName: e.target.value }))}
                    placeholder="أدخل اسم ولي الأمر"
                    className="text-right"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentPhone">رقم الجوال *</Label>
                  <Input
                    id="parentPhone"
                    type="tel"
                    value={formData.parentPhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, parentPhone: e.target.value }))}
                    placeholder="05xxxxxxxx"
                    dir="ltr"
                  />
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2 rtl:space-x-reverse">
                <Calendar className="h-5 w-5 text-orange-500" />
                <span>جدول التدريبات</span>
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label className="mb-3 block">الأيام المخصصة للتدريب *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {days.map((day) => (
                      <div key={day.id} className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Checkbox
                          id={`day-${day.id}`}
                          checked={formData.selectedDays.includes(day.id)}
                          onCheckedChange={() => handleDayToggle(day.id)}
                        />
                        <Label htmlFor={`day-${day.id}`} className="cursor-pointer text-sm">
                          {day.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">وقت البداية *</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endTime">وقت النهاية *</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-medium py-3"
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
