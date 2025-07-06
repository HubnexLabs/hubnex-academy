
-- Update the get_students_with_details function to include assigned_client
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
  created_at timestamp with time zone,
  assigned_client text
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
    s.created_at,
    s.assigned_client
  FROM public.students s
  JOIN public.users u ON s.user_id = u.id
  WHERE u.role = 'student'
  ORDER BY s.created_at DESC;
END;
$$;
