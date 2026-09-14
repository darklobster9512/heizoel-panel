CREATE TABLE public.telegram_recipients (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  label text NOT NULL,
  chat_id text NOT NULL UNIQUE,
  branding_id uuid REFERENCES public.brandings(id) ON DELETE SET NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_by uuid REFERENCES public.profiles(id),
  updated_by uuid REFERENCES public.profiles(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.telegram_recipients TO authenticated;
GRANT ALL ON public.telegram_recipients TO service_role;

ALTER TABLE public.telegram_recipients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view telegram recipients" ON public.telegram_recipients
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can create telegram recipients" ON public.telegram_recipients
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role) AND created_by = auth.uid() AND updated_by = auth.uid());
CREATE POLICY "Admins can update telegram recipients" ON public.telegram_recipients
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role) AND updated_by = auth.uid());
CREATE POLICY "Admins can delete telegram recipients" ON public.telegram_recipients
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX idx_telegram_recipients_branding ON public.telegram_recipients(branding_id);

CREATE TRIGGER update_telegram_recipients_updated_at
  BEFORE UPDATE ON public.telegram_recipients
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();