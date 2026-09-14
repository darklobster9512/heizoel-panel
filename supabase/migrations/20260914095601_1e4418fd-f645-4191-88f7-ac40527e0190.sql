ALTER TABLE public.brandings
  ADD COLUMN account_holder text,
  ADD COLUMN iban text,
  ADD COLUMN bank_name text,
  ADD COLUMN bic text;