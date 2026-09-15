CREATE POLICY "Callers can view orders"
ON public.orders FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'caller'::app_role));

CREATE POLICY "Callers can update orders"
ON public.orders FOR UPDATE TO authenticated
USING (has_role(auth.uid(), 'caller'::app_role))
WITH CHECK (has_role(auth.uid(), 'caller'::app_role));