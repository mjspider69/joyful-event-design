
-- Add missing columns to existing tables for enhanced functionality
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_online BOOLEAN DEFAULT false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS first_call_used BOOLEAN DEFAULT false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS speciality TEXT[];

ALTER TABLE vendors ADD COLUMN IF NOT EXISTS is_approved BOOLEAN DEFAULT false;
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS is_online BOOLEAN DEFAULT false;
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS earnings NUMERIC DEFAULT 0;
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS contact_phone TEXT;
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS contact_email TEXT;

-- Create invoices table
CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  invoice_number TEXT UNIQUE NOT NULL,
  amount NUMERIC NOT NULL,
  tax_amount NUMERIC DEFAULT 0,
  total_amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'cancelled')),
  due_date DATE,
  issued_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create tickets table for customer support
CREATE TABLE IF NOT EXISTS public.tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  category TEXT DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create saved_vendors table
CREATE TABLE IF NOT EXISTS public.saved_vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(customer_id, vendor_id)
);

-- Create vendor_earnings table for detailed tracking
CREATE TABLE IF NOT EXISTS public.vendor_earnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  commission_rate NUMERIC DEFAULT 0.10,
  commission_amount NUMERIC NOT NULL,
  net_amount NUMERIC NOT NULL,
  payment_date TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'processing')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create vendor_availability table
CREATE TABLE IF NOT EXISTS public.vendor_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  is_available BOOLEAN DEFAULT true,
  max_bookings INTEGER DEFAULT 1,
  current_bookings INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(vendor_id, date)
);

-- Create chat_rooms table for organized messaging
CREATE TABLE IF NOT EXISTS public.chat_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  last_message_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(customer_id, vendor_id, booking_id)
);

-- Update chat_messages to reference chat_rooms
ALTER TABLE chat_messages ADD COLUMN IF NOT EXISTS chat_room_id UUID REFERENCES chat_rooms(id) ON DELETE CASCADE;

-- Create admin_settings table for homepage content management
CREATE TABLE IF NOT EXISTS public.admin_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES profiles(id),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create cultural_backdrops table for state-wise images
CREATE TABLE IF NOT EXISTS public.cultural_backdrops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  state_name TEXT NOT NULL,
  city_name TEXT,
  image_url TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_earnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE cultural_backdrops ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for invoices
CREATE POLICY "Users can view their own invoices" ON invoices
  FOR SELECT USING (customer_id = auth.uid());

CREATE POLICY "Vendors can view invoices for their bookings" ON invoices
  FOR SELECT USING (
    booking_id IN (SELECT id FROM bookings WHERE vendor_id = auth.uid())
  );

-- Create RLS policies for tickets
CREATE POLICY "Users can view their own tickets" ON tickets
  FOR SELECT USING (customer_id = auth.uid());

CREATE POLICY "Users can create their own tickets" ON tickets
  FOR INSERT WITH CHECK (customer_id = auth.uid());

CREATE POLICY "Users can update their own tickets" ON tickets
  FOR UPDATE USING (customer_id = auth.uid());

-- Create RLS policies for saved_vendors
CREATE POLICY "Users can manage their saved vendors" ON saved_vendors
  FOR ALL USING (customer_id = auth.uid());

-- Create RLS policies for vendor_earnings
CREATE POLICY "Vendors can view their own earnings" ON vendor_earnings
  FOR SELECT USING (vendor_id = auth.uid());

-- Create RLS policies for vendor_availability
CREATE POLICY "Vendors can manage their availability" ON vendor_availability
  FOR ALL USING (vendor_id = auth.uid());

CREATE POLICY "Public can view vendor availability" ON vendor_availability
  FOR SELECT USING (true);

-- Create RLS policies for chat_rooms
CREATE POLICY "Users can view their chat rooms" ON chat_rooms
  FOR SELECT USING (customer_id = auth.uid() OR vendor_id = auth.uid());

CREATE POLICY "Users can create chat rooms" ON chat_rooms
  FOR INSERT WITH CHECK (customer_id = auth.uid() OR vendor_id = auth.uid());

-- Create RLS policies for cultural_backdrops (public read)
CREATE POLICY "Anyone can view cultural backdrops" ON cultural_backdrops
  FOR SELECT USING (is_active = true);

-- Insert some default cultural backdrops
INSERT INTO cultural_backdrops (state_name, city_name, image_url, description) VALUES
  ('Rajasthan', 'Jaipur', 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f', 'Majestic Rajasthani architecture and desert forts'),
  ('Kerala', 'Kochi', 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944', 'Serene backwaters and traditional boats'),
  ('Punjab', 'Amritsar', 'https://images.unsplash.com/photo-1589739900243-493d3cc5b5c4', 'Golden Temple and vibrant Punjabi culture'),
  ('Tamil Nadu', 'Chennai', 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220', 'Ancient temples and Dravidian architecture'),
  ('Maharashtra', 'Mumbai', 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7', 'Modern cityscape with traditional elements'),
  ('West Bengal', 'Kolkata', 'https://images.unsplash.com/photo-1558431382-27e303142255', 'Cultural heritage and artistic traditions'),
  ('Gujarat', 'Ahmedabad', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96', 'Colorful festivals and traditional crafts'),
  ('Karnataka', 'Bangalore', 'https://images.unsplash.com/photo-1570126618953-d437176e8c79', 'Garden city with royal palaces'),
  ('Goa', 'Panaji', 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2', 'Coastal beauty and Portuguese influence'),
  ('Uttarakhand', 'Dehradun', 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23', 'Himalayan landscapes and spiritual ambiance');

-- Insert default admin settings
INSERT INTO admin_settings (key, value, description) VALUES
  ('hero_title', '"Plan Your Perfect Event with Aaroham"', 'Main hero section title'),
  ('hero_subtitle', '"From traditional weddings to modern celebrations, we bring your vision to life with the finest vendors across India."', 'Hero section subtitle'),
  ('featured_packages', '["premium_wedding", "sangeet_special", "reception_elegance"]', 'List of featured package IDs'),
  ('contact_info', '{"email": "aaroham.net@gmail.com", "phone": "+919176988931", "address": "India"}', 'Contact information'),
  ('social_links', '{"instagram": "https://www.instagram.com/aaroham_", "linkedin": "https://www.linkedin.com/groups/14719662/"}', 'Social media links')
ON CONFLICT (key) DO NOTHING;
