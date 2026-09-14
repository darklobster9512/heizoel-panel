CREATE TYPE public.order_status AS ENUM ('neu', 'in_bearbeitung', 'bestaetigt', 'geliefert', 'storniert');

CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text NOT NULL UNIQUE,
  branding_id uuid REFERENCES public.brandings(id) ON DELETE SET NULL,
  variant text NOT NULL DEFAULT 'standard',
  liters integer NOT NULL DEFAULT 0,
  delivery_points integer NOT NULL DEFAULT 1,
  hose text,
  truck text,
  price_per_100 numeric(10,2) NOT NULL DEFAULT 0,
  total numeric(12,2) NOT NULL DEFAULT 0,
  earliest_date date,
  slot_date date,
  slot_period text,
  email text NOT NULL,
  phone text,
  delivery_address jsonb NOT NULL DEFAULT '{}'::jsonb,
  billing_address jsonb,
  notes text,
  payment_method text,
  status public.order_status NOT NULL DEFAULT 'neu',
  internal_note text,
  placed_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX orders_branding_id_idx ON public.orders (branding_id);
CREATE INDEX orders_created_at_idx ON public.orders (created_at DESC);

GRANT SELECT, UPDATE, DELETE ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view orders" ON public.orders FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update orders" ON public.orders FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete orders" ON public.orders FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  candidate text;
  prefix text;
  i integer := 0;
BEGIN
  prefix := to_char(now() AT TIME ZONE 'Europe/Berlin', 'DDMM');
  LOOP
    candidate := prefix || '-' || lpad((floor(random() * 100000))::int::text, 5, '0');
    EXIT WHEN NOT EXISTS (SELECT 1 FROM public.orders WHERE order_number = candidate);
    i := i + 1;
    IF i > 50 THEN
      RAISE EXCEPTION 'Could not generate unique order number';
    END IF;
  END LOOP;
  RETURN candidate;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.generate_order_number() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.generate_order_number() TO service_role;