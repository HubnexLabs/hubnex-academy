
-- Create a table to store career counselling form submissions
CREATE TABLE public.career_counselling_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  experience TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table for admin users
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to the leads table
ALTER TABLE public.career_counselling_leads ENABLE ROW LEVEL SECURITY;

-- Create policy for admin access to leads (we'll handle admin authentication separately)
CREATE POLICY "Admin can view all leads" 
  ON public.career_counselling_leads 
  FOR ALL 
  USING (true);

-- Enable RLS on admin users table
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policy for admin users
CREATE POLICY "Admin users can manage themselves" 
  ON public.admin_users 
  FOR ALL 
  USING (true);

-- Insert a default admin user (password: admin123 - you should change this)
INSERT INTO public.admin_users (email, password_hash) 
VALUES ('admin@hubnexacademy.com', '$2b$10$rQvGLnCKy4WyfJjR3PZG/eYxPK5m1vJ1QQwQYG5hXqKx3xKDl9Kq6');
