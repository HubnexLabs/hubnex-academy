
-- Add monthly targets tracking for sales persons
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS current_month_target numeric DEFAULT 0;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS current_month_achieved numeric DEFAULT 0;

-- Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL DEFAULT 'info', -- 'info', 'success', 'warning', 'error'
  is_read boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create policy for users to see their own notifications
CREATE POLICY "Users can view their own notifications" 
  ON public.notifications 
  FOR SELECT 
  USING (user_id = (SELECT id FROM public.users WHERE email = current_setting('request.jwt.claims', true)::json->>'email'));

-- Create policy for inserting notifications
CREATE POLICY "Allow inserting notifications" 
  ON public.notifications 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy for updating notifications (mark as read)
CREATE POLICY "Users can update their own notifications" 
  ON public.notifications 
  FOR UPDATE 
  USING (user_id = (SELECT id FROM public.users WHERE email = current_setting('request.jwt.claims', true)::json->>'email'));

-- Create function to automatically create notification
CREATE OR REPLACE FUNCTION public.create_notification(
  p_user_id uuid,
  p_title text,
  p_message text,
  p_type text DEFAULT 'info'
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  notification_id uuid;
BEGIN
  INSERT INTO public.notifications (user_id, title, message, type)
  VALUES (p_user_id, p_title, p_message, p_type)
  RETURNING id INTO notification_id;
  
  RETURN notification_id;
END;
$$;

-- Create trigger function for lead status changes
CREATE OR REPLACE FUNCTION public.notify_lead_changes()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Notify when lead is assigned
  IF OLD.assigned_to IS NULL AND NEW.assigned_to IS NOT NULL THEN
    PERFORM public.create_notification(
      NEW.assigned_to,
      'New Lead Assigned',
      'Lead ' || NEW.lead_id || ' (' || NEW.name || ') has been assigned to you.',
      'info'
    );
  END IF;
  
  -- Notify when lead status changes to closed
  IF OLD.status != 'closed' AND NEW.status = 'closed' THEN
    PERFORM public.create_notification(
      NEW.assigned_to,
      'Deal Closed!',
      'Congratulations! Lead ' || NEW.lead_id || ' has been closed with value ₹' || COALESCE(NEW.deal_value, 0) || '.',
      'success'
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create the trigger
DROP TRIGGER IF EXISTS lead_status_change_notification ON public.leads;
CREATE TRIGGER lead_status_change_notification
  AFTER UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_lead_changes();

-- Function to update monthly achievements when deals are closed
CREATE OR REPLACE FUNCTION public.update_monthly_achievements()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update achieved amount when lead is closed
  IF NEW.status = 'closed' AND NEW.assigned_to IS NOT NULL THEN
    UPDATE public.users 
    SET current_month_achieved = (
      SELECT COALESCE(SUM(deal_value), 0)
      FROM public.leads 
      WHERE assigned_to = NEW.assigned_to 
        AND status = 'closed'
        AND EXTRACT(MONTH FROM updated_at) = EXTRACT(MONTH FROM NOW())
        AND EXTRACT(YEAR FROM updated_at) = EXTRACT(YEAR FROM NOW())
    )
    WHERE id = NEW.assigned_to;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for monthly achievements
DROP TRIGGER IF EXISTS update_achievements_on_close ON public.leads;
CREATE TRIGGER update_achievements_on_close
  AFTER UPDATE ON public.leads
  FOR EACH ROW
  WHEN (NEW.status = 'closed')
  EXECUTE FUNCTION public.update_monthly_achievements();
