
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Users, Phone } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const LoginForm: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'coach' | 'parent'>('coach');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال رقم الجوال",
        variant: "destructive",
      });
      return;
    }

    const success = await login(phone, role);
    if (success) {
      toast({
        title: "مرحباً!",
        description: "تم تسجيل الدخول بنجاح",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-green-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-2xl border-0 backdrop-blur-sm">
        <CardHeader className="space-y-4 text-center px-6 py-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Users className="h-8 w-8 text-white" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900">
              نادي اللياقة الرياضية
            </CardTitle>
            <CardDescription className="text-gray-600 text-base leading-relaxed">
              تسجيل الدخول إلى نظام إدارة التدريبات
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="px-6 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="phone" className="text-right flex items-center justify-end space-x-2 rtl:space-x-reverse text-base font-medium">
                <span>رقم الجوال</span>
                <Phone className="h-4 w-4" />
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="05xxxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="text-right text-base py-3 px-4 rounded-lg border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                dir="ltr"
              />
            </div>

            <div className="space-y-4">
              <Label className="text-right text-base font-medium">نوع الحساب</Label>
              <RadioGroup value={role} onValueChange={(value) => setRole(value as 'coach' | 'parent')} className="space-y-3">
                <div className="flex items-center space-x-3 rtl:space-x-reverse justify-end p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                  <Label htmlFor="coach" className="cursor-pointer text-base font-medium flex-1 text-right">مدرب</Label>
                  <RadioGroupItem value="coach" id="coach" className="w-5 h-5" />
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse justify-end p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                  <Label htmlFor="parent" className="cursor-pointer text-base font-medium flex-1 text-right">ولي أمر</Label>
                  <RadioGroupItem value="parent" id="parent" className="w-5 h-5" />
                </div>
              </RadioGroup>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold py-4 text-base rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
