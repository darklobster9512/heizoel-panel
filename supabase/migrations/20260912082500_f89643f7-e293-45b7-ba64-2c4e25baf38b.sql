CREATE POLICY "Anyone can upload application documents"
  ON storage.objects FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'application-documents');

CREATE POLICY "Admins can read application documents"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'application-documents' AND public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can delete application documents"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'application-documents' AND public.has_role(auth.uid(), 'admin'::public.app_role));