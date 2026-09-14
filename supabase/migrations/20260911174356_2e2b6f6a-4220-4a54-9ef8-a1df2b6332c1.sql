DROP POLICY IF EXISTS "Anyone can view active banks" ON public.banks;

CREATE POLICY "Public can view active banks"
ON public.banks FOR SELECT TO anon
USING (active = true);

CREATE POLICY "Users can view active banks, admins all"
ON public.banks FOR SELECT TO authenticated
USING (active = true OR public.has_role(auth.uid(), 'admin'::public.app_role));

GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;