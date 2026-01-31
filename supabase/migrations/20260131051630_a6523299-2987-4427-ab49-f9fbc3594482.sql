-- Create storage bucket for school images (teachers and gallery)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('school-images', 'school-images', true);

-- Create policy to allow anyone to view images (public bucket)
CREATE POLICY "Anyone can view school images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'school-images');

-- Create policy to allow authenticated admins to upload images
CREATE POLICY "Admins can upload school images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'school-images' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Create policy to allow authenticated admins to update images
CREATE POLICY "Admins can update school images"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'school-images' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Create policy to allow authenticated admins to delete images
CREATE POLICY "Admins can delete school images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'school-images' 
  AND public.has_role(auth.uid(), 'admin')
);