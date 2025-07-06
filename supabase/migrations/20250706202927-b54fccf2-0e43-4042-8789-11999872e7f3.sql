
-- Add student role to user_role enum
ALTER TYPE user_role ADD VALUE 'student';

-- Create students table for additional student-specific information
CREATE TABLE public.students (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  phone_number text,
  enrollment_date date NOT NULL DEFAULT CURRENT_DATE,
  package_plan_name text,
  plan_details text,
  counsellor_name text,
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS on students table
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- Create policy for students table - only admins can manage students
CREATE POLICY "Admins can manage all students" 
  ON public.students 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = (
        SELECT id FROM public.users 
        WHERE email = ((current_setting('request.jwt.claims'::text, true))::json ->> 'email'::text)
      ) 
      AND role = 'admin'
    )
  );

-- Students can view their own data
CREATE POLICY "Students can view their own data" 
  ON public.students 
  FOR SELECT 
  USING (
    user_id = (
      SELECT id FROM public.users 
      WHERE email = ((current_setting('request.jwt.claims'::text, true))::json ->> 'email'::text)
    )
  );

-- Create function to handle student creation
CREATE OR REPLACE FUNCTION public.create_student(
  p_email text,
  p_password text,
  p_full_name text,
  p_phone_number text DEFAULT NULL,
  p_enrollment_date date DEFAULT CURRENT_DATE,
  p_package_plan_name text DEFAULT NULL,
  p_plan_details text DEFAULT NULL,
  p_counsellor_name text DEFAULT NULL,
  p_notes text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_user_id uuid;
BEGIN
  -- Create user record
  INSERT INTO public.users (email, password_hash, full_name, role, is_active)
  VALUES (p_email, p_password, p_full_name, 'student', true)
  RETURNING id INTO new_user_id;
  
  -- Create student record
  INSERT INTO public.students (
    user_id, phone_number, enrollment_date, package_plan_name, 
    plan_details, counsellor_name, notes
  )
  VALUES (
    new_user_id, p_phone_number, p_enrollment_date, p_package_plan_name,
    p_plan_details, p_counsellor_name, p_notes
  );
  
  RETURN new_user_id;
END;
$$;

-- Create function to get student details with user info
CREATE OR REPLACE FUNCTION public.get_students_with_details()
RETURNS TABLE (
  id uuid,
  user_id uuid,
  email text,
  full_name text,
  phone_number text,
  enrollment_date date,
  package_plan_name text,
  plan_details text,
  counsellor_name text,
  notes text,
  is_active boolean,
  created_at timestamp with time zone
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.id,
    s.user_id,
    u.email,
    u.full_name,
    s.phone_number,
    s.enrollment_date,
    s.package_plan_name,
    s.plan_details,
    s.counsellor_name,
    s.notes,
    u.is_active,
    s.created_at
  FROM public.students s
  JOIN public.users u ON s.user_id = u.id
  WHERE u.role = 'student'
  ORDER BY s.created_at DESC;
END;
$$;
