
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import CustomerDashboard from '@/components/CustomerDashboard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CustomerDashboardPage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/customer-login');
        return;
      }

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
      <CustomerDashboard user={user} />
      <Footer />
    </>
  );
};

export default CustomerDashboardPage;
