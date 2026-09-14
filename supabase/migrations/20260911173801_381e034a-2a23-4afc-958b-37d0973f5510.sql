CREATE TABLE public.banks (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  logo_key text,
  logo_url text,
  sort_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  eff_rate numeric(5,2) NOT NULL DEFAULT 3.99,
  min_amount integer NOT NULL DEFAULT 1000,
  max_amount integer NOT NULL DEFAULT 120000,
  min_term integer NOT NULL DEFAULT 12,
  max_term integer NOT NULL DEFAULT 120,
  payout_days integer NOT NULL DEFAULT 5,
  company_name text,
  street text,
  zip text,
  city text,
  documents text NOT NULL DEFAULT 'Kontoauszug, Gehaltsabrechnung',
  free_special_repayment boolean NOT NULL DEFAULT true,
  free_full_repayment boolean NOT NULL DEFAULT false,
  payment_break boolean NOT NULL DEFAULT true,
  online_upload boolean NOT NULL DEFAULT true,
  online_id boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.banks TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.banks TO authenticated;
GRANT ALL ON public.banks TO service_role;

ALTER TABLE public.banks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active banks" ON public.banks
  FOR SELECT TO anon, authenticated USING (active = true OR public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can insert banks" ON public.banks
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update banks" ON public.banks
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can delete banks" ON public.banks
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE TRIGGER update_banks_updated_at BEFORE UPDATE ON public.banks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.banks (name, logo_key, sort_order, eff_rate, min_amount, max_amount, min_term, max_term, payout_days, company_name, street, zip, city, documents, free_special_repayment, free_full_repayment, payment_break)
VALUES
  ('TARGOBANK', 'targobank', 1, 3.99, 1500, 80000, 12, 96, 5, 'TARGOBANK AG', 'Kasernenstraße 10', '40213', 'Düsseldorf', 'Kontoauszug, Gehaltsabrechnung', true, false, true),
  ('Vereinigte Volksbank Raiffeisenbank', 'vvrb', 2, 3.99, 2500, 50000, 12, 120, 6, 'Vereinigte Volksbank Raiffeisenbank eG', 'Am Marktplatz 3', '64646', 'Heppenheim', 'Kontoauszug, Gehaltsabrechnung', true, true, false),
  ('CreditPlus Bank', 'creditplus', 3, 3.99, 1500, 60000, 12, 84, 4, 'CreditPlus Bank AG', 'Augustenstraße 7', '70178', 'Stuttgart', 'Kontoauszug, Gehaltsabrechnung', true, false, true),
  ('ING', 'ingdiba', 4, 3.99, 5000, 75000, 12, 96, 3, 'ING-DiBa AG', 'Theodor-Heuss-Allee 2', '60486', 'Frankfurt am Main', 'Kontoauszug, Gehaltsabrechnung', true, true, false),
  ('Santander', 'santander', 5, 3.99, 1000, 75000, 12, 120, 5, 'Santander Consumer Bank AG', 'Santander-Platz 1', '41061', 'Mönchengladbach', 'Kontoauszug, Gehaltsabrechnung', true, false, true),
  ('Postbank', 'postbank', 6, 3.99, 3000, 80000, 12, 96, 6, 'Postbank – eine Niederlassung der Deutsche Bank AG', 'Taunusanlage 12', '60325', 'Frankfurt am Main', 'Kontoauszug, Gehaltsabrechnung', true, true, false),
  ('S-Kredit-per-Klick', 'skreditpartnerkredit', 7, 3.99, 2500, 50000, 12, 84, 4, 'S-Kreditpartner GmbH', 'Prinzregentenstraße 25', '10715', 'Berlin', 'Kontoauszug, Gehaltsabrechnung', true, false, true),
  ('Commerzbank', 'commerzbank', 8, 3.99, 3000, 80000, 12, 120, 5, 'Commerzbank AG', 'Kaiserstraße 16', '60311', 'Frankfurt am Main', 'Kontoauszug, Gehaltsabrechnung', true, true, true),
  ('auxmoney', 'auxmoney', 9, 3.99, 1000, 50000, 12, 84, 7, 'auxmoney GmbH', 'Kasernenstraße 67', '40213', 'Düsseldorf', 'Kontoauszug, Gehaltsabrechnung', true, false, false),
  ('HypoVereinsbank', 'hvb', 10, 3.99, 3000, 80000, 12, 120, 5, 'UniCredit Bank GmbH (HypoVereinsbank)', 'Arabellastraße 12', '81925', 'München', 'Kontoauszug, Gehaltsabrechnung', true, true, false),
  ('Bank of Scotland', 'bankofscotland', 11, 3.99, 1000, 50000, 12, 84, 5, 'Bank of Scotland, Niederlassung Berlin', 'Chausseestraße 111', '10115', 'Berlin', 'Kontoauszug, Gehaltsabrechnung', true, true, false),
  ('DKB', 'dkb', 12, 3.99, 2500, 65000, 12, 96, 4, 'Deutsche Kreditbank AG', 'Taubenstraße 7-9', '10117', 'Berlin', 'Kontoauszug, Gehaltsabrechnung', true, true, false),
  ('Consors Finanz', 'vonessen', 13, 3.99, 1500, 60000, 12, 96, 6, 'Consors Finanz BNP Paribas', 'Schwanthalerstraße 31', '80336', 'München', 'Kontoauszug, Gehaltsabrechnung', true, false, true),
  ('Deutsche Bank', 'deutschebank', 14, 3.99, 5000, 80000, 12, 84, 5, 'Deutsche Bank AG', 'Taunusanlage 12', '60325', 'Frankfurt am Main', 'Kontoauszug, Gehaltsabrechnung', true, true, false);