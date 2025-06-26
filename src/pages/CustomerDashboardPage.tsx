
import React from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import CustomerDashboard from '@/components/CustomerDashboard';

const CustomerDashboardPage: React.FC = () => {
  return (
    <ProtectedRoute requiredRole="customer">
      <CustomerDashboard />
    </ProtectedRoute>
  );
};

export default CustomerDashboardPage;
