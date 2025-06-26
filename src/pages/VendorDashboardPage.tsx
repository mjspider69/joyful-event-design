
import React from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import VendorDashboard from '@/components/VendorDashboard';

const VendorDashboardPage: React.FC = () => {
  return (
    <ProtectedRoute requiredRole="vendor">
      <VendorDashboard />
    </ProtectedRoute>
  );
};

export default VendorDashboardPage;
