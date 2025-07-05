
-- Drop existing tables to recreate with proper structure
DROP TABLE IF EXISTS public.career_counselling_leads CASCADE;
DROP TABLE IF EXISTS public.admin_users CASCADE;

-- Create user roles enum
CREATE TYPE public.user_role AS ENUM ('admin', 'sales_person');

-- Create lead status enum
CREATE TYPE public.lead_status AS ENUM ('fresh', 'in_progress', 'closed', 'lost');

-- Create lead source enum (can be expanded)
CREATE TYPE public.lead_source AS ENUM ('website', 'referral', 'social_media', 'advertisement', 'cold_call', 'email_campaign');

-- Users table for CRM (Admin and Sales Person)
CREATE TABLE public.users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role public.user_role NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  monthly_target DECIMAL(12,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Custom fields configuration table
CREATE TABLE public.custom_fields (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  field_name TEXT NOT NULL,
  field_type TEXT NOT NULL, -- text, number, date, dropdown
  is_required BOOLEAN DEFAULT false,
  options JSONB, -- for dropdown options
  created_by UUID REFERENCES public.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Leads table
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id TEXT NOT NULL UNIQUE, -- auto-generated readable ID
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  experience TEXT,
  lead_source public.lead_source NOT NULL,
  status public.lead_status NOT NULL DEFAULT 'fresh',
  assigned_to UUID REFERENCES public.users(id),
  deal_value DECIMAL(12,2) DEFAULT 0,
  custom_data JSONB DEFAULT '{}', -- stores custom field values
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Lead notes table
CREATE TABLE public.lead_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id),
  note TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Lead attachments table
CREATE TABLE public.lead_attachments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id),
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Lead history/audit log table
CREATE TABLE public.lead_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id),
  action TEXT NOT NULL, -- created, updated, assigned, status_changed, note_added, etc.
  details JSONB, -- stores what changed
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Reminders table
CREATE TABLE public.reminders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id),
  title TEXT NOT NULL,
  description TEXT,
  reminder_date TIMESTAMP WITH TIME ZONE NOT NULL,
  is_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Sales targets table
CREATE TABLE public.sales_targets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id),
  target_month INTEGER NOT NULL, -- 1-12
  target_year INTEGER NOT NULL,
  target_amount DECIMAL(12,2) NOT NULL,
  achieved_amount DECIMAL(12,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, target_month, target_year)
);

-- Function to generate lead ID
CREATE OR REPLACE FUNCTION generate_lead_id()
RETURNS TEXT AS $$
DECLARE
  new_id TEXT;
  counter INTEGER;
BEGIN
  -- Get the current count of leads + 1
  SELECT COUNT(*) + 1 INTO counter FROM public.leads;
  
  -- Format as CL-YYYY-NNNNNN (Codelabs-Year-Number)
  new_id := 'CL-' || EXTRACT(YEAR FROM NOW()) || '-' || LPAD(counter::TEXT, 6, '0');
  
  -- Check if it exists (shouldn't happen but safety first)
  WHILE EXISTS (SELECT 1 FROM public.leads WHERE lead_id = new_id) LOOP
    counter := counter + 1;
    new_id := 'CL-' || EXTRACT(YEAR FROM NOW()) || '-' || LPAD(counter::TEXT, 6, '0');
  END LOOP;
  
  RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- Function to log lead history
CREATE OR REPLACE FUNCTION log_lead_history()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.lead_history (lead_id, user_id, action, details)
    VALUES (NEW.id, NEW.assigned_to, 'created', jsonb_build_object('lead_data', row_to_json(NEW)));
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO public.lead_history (lead_id, user_id, action, details)
    VALUES (NEW.id, NEW.assigned_to, 'updated', jsonb_build_object('old_data', row_to_json(OLD), 'new_data', row_to_json(NEW)));
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate lead ID
CREATE OR REPLACE FUNCTION set_lead_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.lead_id IS NULL OR NEW.lead_id = '' THEN
    NEW.lead_id := generate_lead_id();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER trigger_set_lead_id
  BEFORE INSERT ON public.leads
  FOR EACH ROW EXECUTE FUNCTION set_lead_id();

CREATE TRIGGER trigger_log_lead_history
  AFTER INSERT OR UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION log_lead_history();

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_fields ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Allow all for now, will be refined with proper auth
CREATE POLICY "Allow all operations for authenticated users" ON public.users FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON public.leads FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON public.lead_notes FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON public.lead_attachments FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON public.lead_history FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON public.reminders FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON public.sales_targets FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON public.custom_fields FOR ALL USING (true);

-- Insert default admin user
INSERT INTO public.users (email, password_hash, full_name, role) 
VALUES ('admin@codelabs.com', '$2b$10$rQvGLnCKy4WyfJjR3PZG/eYxPK5m1vJ1QQwQYG5hXqKx3xKDl9Kq6', 'Admin User', 'admin');

-- Insert sample sales person
INSERT INTO public.users (email, password_hash, full_name, role, monthly_target) 
VALUES ('sales@codelabs.com', '$2b$10$rQvGLnCKy4WyfJjR3PZG/eYxPK5m1vJ1QQwQYG5hXqKx3xKDl9Kq6', 'Sales Person', 'sales_person', 100000.00);

-- Create some default custom fields
INSERT INTO public.custom_fields (field_name, field_type, is_required, options)
VALUES 
  ('Preferred Course', 'dropdown', true, '["Full Stack Web Development", "Data Science", "Mobile App Development", "Digital Marketing"]'),
  ('Budget Range', 'dropdown', false, '["Below 50k", "50k-100k", "100k-150k", "Above 150k"]'),
  ('Timeline', 'dropdown', false, '["Immediate", "Within 1 month", "Within 3 months", "Within 6 months"]');
