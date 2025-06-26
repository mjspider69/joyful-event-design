
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface CulturalBackdropProps {
  location: string;
  className?: string;
}

export const CulturalBackdrop: React.FC<CulturalBackdropProps> = ({ location, className = '' }) => {
  const [backdrop, setBackdrop] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBackdrop();
  }, [location]);

  const fetchBackdrop = async () => {
    try {
      setLoading(true);
      
      // Try to find exact match first
      let query = supabase
        .from('cultural_backdrops')
        .select('*')
        .eq('is_active', true);

      // Check if location matches state name or city name
      const { data } = await query.or(`state_name.ilike.%${location}%,city_name.ilike.%${location}%`);

      if (data && data.length > 0) {
        setBackdrop(data[0]);
      } else {
        // Fallback to default Indian cultural image
        setBackdrop({
          image_url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da',
          description: 'Beautiful Indian cultural heritage'
        });
      }
    } catch (error) {
      console.error('Error fetching cultural backdrop:', error);
      // Set fallback image
      setBackdrop({
        image_url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da',
        description: 'Beautiful Indian cultural heritage'
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`bg-gradient-to-r from-coral-200 to-sage-200 animate-pulse ${className}`} />
    );
  }

  return (
    <div 
      className={`bg-cover bg-center bg-no-repeat relative ${className}`}
      style={{ 
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${backdrop?.image_url})` 
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      {backdrop?.description && (
        <div className="absolute bottom-4 left-4 text-white text-sm opacity-75">
          {backdrop.description}
        </div>
      )}
    </div>
  );
};
