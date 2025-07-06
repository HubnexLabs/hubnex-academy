
-- Add client assignment field to students table
ALTER TABLE public.students 
ADD COLUMN assigned_client TEXT,
ADD COLUMN client_assignment_history JSONB DEFAULT '[]'::jsonb;

-- Create activity_categories table
CREATE TABLE public.activity_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES public.users(id),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create time_tracking table
CREATE TABLE public.time_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.activity_categories(id),
  activity_name TEXT NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  notes TEXT,
  is_active BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default activity categories
INSERT INTO public.activity_categories (name, description) VALUES 
('Meetings', 'Client meetings, team meetings, and formal discussions'),
('Live Study/Training', 'Live training sessions, workshops, and guided learning'),
('Project Building', 'Hands-on project development and coding work'),
('Documentation/Reporting', 'Writing documentation, reports, and project summaries'),
('Client Communication', 'Email, calls, and informal communication with clients'),
('Self-Study/Research', 'Independent learning, research, and skill development'),
('Break/Away', 'Breaks, lunch, and time away from work activities'),
('Other', 'Miscellaneous activities not covered by other categories');

-- Enable RLS on new tables
ALTER TABLE public.activity_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.time_tracking ENABLE ROW LEVEL SECURITY;

-- RLS policies for activity_categories
CREATE POLICY "Everyone can view activity categories" 
  ON public.activity_categories 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Admins can manage activity categories" 
  ON public.activity_categories 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = (SELECT users.id FROM users WHERE users.email = ((current_setting('request.jwt.claims'::text, true))::json ->> 'email'::text))
    AND role = 'admin'
  ));

-- RLS policies for time_tracking
CREATE POLICY "Students can view their own time tracking" 
  ON public.time_tracking 
  FOR SELECT 
  USING (student_id IN (
    SELECT s.id FROM public.students s 
    JOIN public.users u ON s.user_id = u.id 
    WHERE u.email = ((current_setting('request.jwt.claims'::text, true))::json ->> 'email'::text)
  ));

CREATE POLICY "Students can manage their own time tracking" 
  ON public.time_tracking 
  FOR ALL 
  USING (student_id IN (
    SELECT s.id FROM public.students s 
    JOIN public.users u ON s.user_id = u.id 
    WHERE u.email = ((current_setting('request.jwt.claims'::text, true))::json ->> 'email'::text)
  ));

CREATE POLICY "Admins can view all time tracking" 
  ON public.time_tracking 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = (SELECT users.id FROM users WHERE users.email = ((current_setting('request.jwt.claims'::text, true))::json ->> 'email'::text))
    AND role = 'admin'
  ));

CREATE POLICY "Admins can manage all time tracking" 
  ON public.time_tracking 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = (SELECT users.id FROM users WHERE users.email = ((current_setting('request.jwt.claims'::text, true))::json ->> 'email'::text))
    AND role = 'admin'
  ));

-- Function to start time tracking
CREATE OR REPLACE FUNCTION public.start_time_tracking(
  p_student_id UUID,
  p_category_id UUID,
  p_activity_name TEXT,
  p_notes TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  tracking_id UUID;
BEGIN
  -- Stop any active tracking for this student
  UPDATE public.time_tracking 
  SET end_time = NOW(),
      duration_minutes = EXTRACT(EPOCH FROM (NOW() - start_time))/60,
      is_active = false,
      updated_at = NOW()
  WHERE student_id = p_student_id AND is_active = true;
  
  -- Start new tracking
  INSERT INTO public.time_tracking (
    student_id, category_id, activity_name, start_time, notes, is_active
  )
  VALUES (
    p_student_id, p_category_id, p_activity_name, NOW(), p_notes, true
  )
  RETURNING id INTO tracking_id;
  
  RETURN tracking_id;
END;
$$;

-- Function to stop time tracking
CREATE OR REPLACE FUNCTION public.stop_time_tracking(p_student_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.time_tracking 
  SET end_time = NOW(),
      duration_minutes = EXTRACT(EPOCH FROM (NOW() - start_time))/60,
      is_active = false,
      updated_at = NOW()
  WHERE student_id = p_student_id AND is_active = true;
  
  RETURN FOUND;
END;
$$;

-- Function to get student progress (months completed out of 6)
CREATE OR REPLACE FUNCTION public.get_student_progress(p_student_id UUID)
RETURNS TABLE(
  months_completed NUMERIC,
  progress_percentage NUMERIC,
  days_remaining INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  enrollment_dt DATE;
  months_elapsed NUMERIC;
  progress_pct NUMERIC;
  days_left INTEGER;
BEGIN
  SELECT enrollment_date INTO enrollment_dt
  FROM public.students 
  WHERE id = p_student_id;
  
  IF enrollment_dt IS NULL THEN
    RETURN QUERY SELECT 0::NUMERIC, 0::NUMERIC, 180::INTEGER;
    RETURN;
  END IF;
  
  -- Calculate months elapsed
  months_elapsed := EXTRACT(EPOCH FROM (CURRENT_DATE - enrollment_dt)) / (30.44 * 24 * 3600);
  
  -- Calculate progress percentage (capped at 100%)
  progress_pct := LEAST(months_elapsed / 6.0 * 100, 100);
  
  -- Calculate days remaining (minimum 0)
  days_left := GREATEST(180 - (CURRENT_DATE - enrollment_dt), 0);
  
  RETURN QUERY SELECT 
    ROUND(months_elapsed, 1) as months_completed,
    ROUND(progress_pct, 1) as progress_percentage,
    days_left as days_remaining;
END;
$$;

-- Function to get time tracking summary
CREATE OR REPLACE FUNCTION public.get_time_tracking_summary(p_student_id UUID)
RETURNS TABLE(
  category_name TEXT,
  total_hours NUMERIC,
  total_sessions INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ac.name as category_name,
    ROUND(COALESCE(SUM(tt.duration_minutes), 0) / 60.0, 1) as total_hours,
    COUNT(tt.id)::INTEGER as total_sessions
  FROM public.activity_categories ac
  LEFT JOIN public.time_tracking tt ON ac.id = tt.category_id AND tt.student_id = p_student_id
  WHERE ac.is_active = true
  GROUP BY ac.id, ac.name
  ORDER BY total_hours DESC;
END;
$$;
