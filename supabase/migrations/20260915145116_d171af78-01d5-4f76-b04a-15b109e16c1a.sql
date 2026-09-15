CREATE OR REPLACE FUNCTION public.validate_branding()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
BEGIN
  IF NEW.seven_sender_name IS NOT NULL AND char_length(NEW.seven_sender_name) > 11 THEN
    RAISE EXCEPTION 'Seven.io sender name may contain at most 11 characters';
  END IF;

  IF NEW.status = 'active' AND (
    NULLIF(btrim(NEW.company_name), '') IS NULL OR
    NULLIF(btrim(NEW.shop_name), '') IS NULL OR
    NULLIF(btrim(NEW.street_address), '') IS NULL OR
    NULLIF(btrim(NEW.postal_code), '') IS NULL OR
    NULLIF(btrim(NEW.city), '') IS NULL OR
    NULLIF(btrim(NEW.registry_court), '') IS NULL OR
    NULLIF(btrim(NEW.commercial_register_number), '') IS NULL OR
    NULLIF(btrim(NEW.managing_director), '') IS NULL OR
    NULLIF(btrim(NEW.vat_id), '') IS NULL OR
    NULLIF(btrim(NEW.email), '') IS NULL OR
    NULLIF(btrim(NEW.domain), '') IS NULL
  ) THEN
    RAISE EXCEPTION 'Active brandings require all company fields';
  END IF;

  RETURN NEW;
END;
$function$;