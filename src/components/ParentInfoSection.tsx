
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Phone } from 'lucide-react';

interface ParentInfoSectionProps {
  formData: {
    parentFirstName: string;
    parentLastName: string;
    parentPhone: string;
  };
  onFormDataChange: (updates: Partial<ParentInfoSectionProps['formData']>) => void;
}

const ParentInfoSection: React.FC<ParentInfoSectionProps> = ({ formData, onFormDataChange }) => {
  return (
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
            onChange={(e) => onFormDataChange({ parentFirstName: e.target.value })}
            placeholder="الاسم الأول لولي الأمر"
            className="text-right h-10 sm:h-11 text-sm sm:text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="parentLastName" className="text-sm sm:text-base font-medium">الاسم الثاني *</Label>
          <Input
            id="parentLastName"
            value={formData.parentLastName}
            onChange={(e) => onFormDataChange({ parentLastName: e.target.value })}
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
            onChange={(e) => onFormDataChange({ parentPhone: e.target.value })}
            placeholder="05xxxxxxxx"
            dir="ltr"
            className="h-10 sm:h-11 text-sm sm:text-base"
          />
        </div>
      </div>
    </div>
  );
};

export default ParentInfoSection;
