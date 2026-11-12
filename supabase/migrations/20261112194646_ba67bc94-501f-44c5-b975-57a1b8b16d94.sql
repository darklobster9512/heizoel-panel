CREATE OR REPLACE FUNCTION public.notify_lead_webhook()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public','extensions' AS $$
BEGIN
  PERFORM net.http_post(
    url := 'https://panel.datenbank.to/api/leads/webhook',
    headers := jsonb_build_object('Content-Type','application/json'),
    body := jsonb_build_object(
      'email', NEW.email,
      'first_name', coalesce(NEW.delivery_address->>'firstName',''),
      'last_name', coalesce(NEW.delivery_address->>'lastName',''),
      'source', 'heizoel-shop'),
    timeout_milliseconds := 5000);
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING 'lead webhook failed: %', SQLERRM;
  RETURN NEW;
END; $$;
CREATE TRIGGER on_order_created_send_lead AFTER INSERT ON public.orders FOR EACH ROW EXECUTE FUNCTION public.notify_lead_webhook();