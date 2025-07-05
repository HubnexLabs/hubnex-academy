
-- Make lead_id optional for inserts by adding a default value
-- This allows the trigger to generate the ID automatically
ALTER TABLE public.leads ALTER COLUMN lead_id SET DEFAULT '';

-- Update the trigger to ensure it always generates a lead_id
CREATE OR REPLACE FUNCTION public.set_lead_id()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  -- Always generate a new lead_id regardless of what's passed
  NEW.lead_id := generate_lead_id();
  RETURN NEW;
END;
$$;

-- Recreate the trigger to ensure it fires on insert
DROP TRIGGER IF EXISTS set_lead_id_trigger ON public.leads;
CREATE TRIGGER set_lead_id_trigger
  BEFORE INSERT ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION set_lead_id();
