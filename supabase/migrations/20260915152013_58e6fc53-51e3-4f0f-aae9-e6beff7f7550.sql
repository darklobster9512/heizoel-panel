CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

CREATE OR REPLACE FUNCTION public.notify_order_confirmation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  app_url text := 'https://id-preview--485f594a-9180-4077-adda-eb24ffaadc89.lovable.app';
  hook_secret text := 'aeb99876a3b26e78260027e1c205510ca22fca6a4ad6fea1';
BEGIN
  PERFORM net.http_post(
    url := app_url || '/api/public/order-confirmation',
    headers := jsonb_build_object('Content-Type', 'application/json'),
    body := jsonb_build_object('orderId', NEW.id::text, 'secret', hook_secret),
    timeout_milliseconds := 5000
  );
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING 'order confirmation hook failed: %', SQLERRM;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_order_created_send_confirmation ON public.orders;
CREATE TRIGGER on_order_created_send_confirmation
AFTER INSERT ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.notify_order_confirmation();