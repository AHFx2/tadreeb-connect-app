
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/LoginForm';
import CoachDashboard from '@/components/CoachDashboard';
import ParentDashboard from '@/components/ParentDashboard';

const Index = () => {
  const { user } = useAuth();

  if (!user) {
    return <LoginForm />;
  }

  if (user.role === 'coach') {
    return <CoachDashboard />;
  }

  return <ParentDashboard />;
};

export default Index;
