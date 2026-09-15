BEGIN;

CREATE TYPE public.order_status_new AS ENUM (
  'neu',
  'mailbox',
  'moechte_rechnung',
  'rechnung_versendet',
  'ueberwiesen',
  'angekommen',
  'exchanged'
);

ALTER TABLE public.orders ALTER COLUMN status DROP DEFAULT;

ALTER TABLE public.orders
  ALTER COLUMN status TYPE public.order_status_new
  USING (CASE status::text
    WHEN 'neu' THEN 'neu'
    WHEN 'in_bearbeitung' THEN 'mailbox'
    WHEN 'bestaetigt' THEN 'moechte_rechnung'
    WHEN 'geliefert' THEN 'angekommen'
    WHEN 'storniert' THEN 'exchanged'
    ELSE 'neu'
  END)::public.order_status_new;

DROP TYPE public.order_status;

ALTER TYPE public.order_status_new RENAME TO order_status;

ALTER TABLE public.orders ALTER COLUMN status SET DEFAULT 'neu'::public.order_status;

COMMIT;