DROP VIEW IF EXISTS public.branding_names;

CREATE OR REPLACE FUNCTION public.branding_names()
RETURNS TABLE (id uuid, shop_name text, company_name text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT b.id, b.shop_name, b.company_name
  FROM public.brandings b
  WHERE public.has_role(auth.uid(), 'admin'::app_role)
     OR public.has_role(auth.uid(), 'caller'::app_role)
$$;

REVOKE ALL ON FUNCTION public.branding_names() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.branding_names() TO authenticated;
GRANT EXECUTE ON FUNCTION public.branding_names() TO service_role;