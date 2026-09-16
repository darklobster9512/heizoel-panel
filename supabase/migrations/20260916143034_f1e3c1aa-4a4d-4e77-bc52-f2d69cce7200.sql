CREATE OR REPLACE VIEW public.branding_names AS
  SELECT id, shop_name, company_name FROM public.brandings;

REVOKE ALL ON public.branding_names FROM PUBLIC, anon;
GRANT SELECT ON public.branding_names TO authenticated;
GRANT SELECT ON public.branding_names TO service_role;