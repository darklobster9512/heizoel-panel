ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS status_changed_at timestamp with time zone;

UPDATE public.orders SET status_changed_at = updated_at WHERE status_changed_at IS NULL;

CREATE OR REPLACE FUNCTION public.set_order_status_changed_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    NEW.status_changed_at = now();
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_orders_status_changed_at ON public.orders;
CREATE TRIGGER set_orders_status_changed_at
BEFORE UPDATE ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.set_order_status_changed_at();