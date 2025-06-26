
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: 'admin' | 'vendor' | 'customer';
}

export const ProtectedRoute = ({ 
  children, 
  requireAuth = true, 
  requiredRole 
}: ProtectedRouteProps) => {
  const { user, loading, profile } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-coral-500" />
      </div>
    );
  }

  if (requireAuth && !user) {
    return <Navigate to="/customer-login" replace />;
  }

  if (requiredRole && profile?.user_type !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
