CREATE TABLE public.caller_brandings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  branding_id uuid NOT NULL REFERENCES public.brandings(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, branding_id)
);

GRANT SELECT ON public.caller_brandings TO authenticated;
GRANT ALL ON public.caller_brandings TO service_role;
ALTER TABLE public.caller_brandings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage caller brandings"
ON public.caller_brandings FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Caller can view own brandings"
ON public.caller_brandings FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE TABLE public.caller_settings (
  user_id uuid PRIMARY KEY,
  visible_from date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.caller_settings TO authenticated;
GRANT ALL ON public.caller_settings TO service_role;
ALTER TABLE public.caller_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage caller settings"
ON public.caller_settings FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Caller can view own settings"
ON public.caller_settings FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE TRIGGER update_caller_settings_updated_at
BEFORE UPDATE ON public.caller_settings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();