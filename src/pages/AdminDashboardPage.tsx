
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import AdminDashboard from '@/components/AdminDashboard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AdminDashboardPage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/admin-login');
        return;
      }

      // For now, allow any authenticated user to access admin dashboard
      // In production, you would check against a proper admin role system
      setUser(user);
      setLoading(false);
    };

    checkUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-maroon-900"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <AdminDashboard />
      <Footer />
    </>
  );
};

export default AdminDashboardPage;
