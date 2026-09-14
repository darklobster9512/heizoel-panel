CREATE TYPE public.branding_status AS ENUM ('draft', 'active');

CREATE TABLE public.brandings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  public_id uuid NOT NULL DEFAULT gen_random_uuid() UNIQUE,
  status public.branding_status NOT NULL DEFAULT 'draft',
  logo_path text,
  company_name text,
  shop_name text,
  street_address text,
  postal_code text,
  city text,
  registry_court text,
  commercial_register_number text,
  managing_director text,
  vat_id text,
  email text,
  domain text,
  resend_api_key text,
  resend_sender_email text,
  resend_sender_name text,
  seven_api_key text,
  seven_sender_name text,
  created_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  updated_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.brandings TO authenticated;
GRANT ALL ON public.brandings TO service_role;

ALTER TABLE public.brandings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view brandings"
ON public.brandings FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can create brandings"
ON public.brandings FOR INSERT TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'admin')
  AND created_by = auth.uid()
  AND updated_by = auth.uid()
);

CREATE POLICY "Admins can update brandings"
ON public.brandings FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (
  public.has_role(auth.uid(), 'admin')
  AND updated_by = auth.uid()
);

CREATE POLICY "Admins can delete brandings"
ON public.brandings FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.validate_branding()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.seven_sender_name IS NOT NULL AND char_length(NEW.seven_sender_name) > 11 THEN
    RAISE EXCEPTION 'Seven.io sender name may contain at most 11 characters';
  END IF;

  IF NEW.status = 'active' AND (
    NULLIF(btrim(NEW.logo_path), '') IS NULL OR
    NULLIF(btrim(NEW.company_name), '') IS NULL OR
    NULLIF(btrim(NEW.shop_name), '') IS NULL OR
    NULLIF(btrim(NEW.street_address), '') IS NULL OR
    NULLIF(btrim(NEW.postal_code), '') IS NULL OR
    NULLIF(btrim(NEW.city), '') IS NULL OR
    NULLIF(btrim(NEW.registry_court), '') IS NULL OR
    NULLIF(btrim(NEW.commercial_register_number), '') IS NULL OR
    NULLIF(btrim(NEW.managing_director), '') IS NULL OR
    NULLIF(btrim(NEW.vat_id), '') IS NULL OR
    NULLIF(btrim(NEW.email), '') IS NULL OR
    NULLIF(btrim(NEW.domain), '') IS NULL
  ) THEN
    RAISE EXCEPTION 'Active brandings require all company fields and a logo';
  END IF;

  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.validate_branding() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.validate_branding() TO service_role;

CREATE TRIGGER validate_branding_before_write
BEFORE INSERT OR UPDATE ON public.brandings
FOR EACH ROW EXECUTE FUNCTION public.validate_branding();

CREATE TRIGGER update_brandings_updated_at
BEFORE UPDATE ON public.brandings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE POLICY "Admins can view branding logos"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'branding-logos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can upload branding logos"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'branding-logos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update branding logos"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'branding-logos' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'branding-logos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete branding logos"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'branding-logos' AND public.has_role(auth.uid(), 'admin'));

CREATE INDEX brandings_status_updated_at_idx ON public.brandings (status, updated_at DESC);