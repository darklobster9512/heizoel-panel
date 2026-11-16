CREATE OR REPLACE FUNCTION public.notify_lead_webhook()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public','extensions' AS $$
BEGIN
  PERFORM net.http_post(
    url := 'https://shopmanagement.lol/api/public/leads-ingest',
    headers := jsonb_build_object('Content-Type','application/json'),
    body := jsonb_build_object(
      'email', NEW.email,
      'first_name', coalesce(NEW.delivery_address->>'firstName',''),
      'last_name', coalesce(NEW.delivery_address->>'lastName',''),
      'source', 'landingpage'),
    timeout_milliseconds := 5000);
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING 'lead webhook failed: %', SQLERRM;
  RETURN NEW;
END; $$;
REVOKE EXECUTE ON FUNCTION public.notify_lead_webhook() FROM PUBLIC, anon, authenticated;