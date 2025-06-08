
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
      <Card className="w-full max-w-md mx-auto shadow-2xl border-0">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
            <Users className="h-8 w-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              نادي اللياقة الرياضية
            </CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              تسجيل الدخول إلى نظام إدارة التدريبات
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-right flex items-center justify-end space-x-2 rtl:space-x-reverse">
                <span>رقم الجوال</span>
                <Phone className="h-4 w-4" />
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="05xxxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="text-right"
                dir="ltr"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-right">نوع الحساب</Label>
              <RadioGroup value={role} onValueChange={(value) => setRole(value as 'coach' | 'parent')}>
                <div className="flex items-center space-x-2 rtl:space-x-reverse justify-end">
                  <Label htmlFor="coach" className="cursor-pointer">مدرب</Label>
                  <RadioGroupItem value="coach" id="coach" />
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse justify-end">
                  <Label htmlFor="parent" className="cursor-pointer">ولي أمر</Label>
                  <RadioGroupItem value="parent" id="parent" />
                </div>
              </RadioGroup>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-medium py-3"
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
