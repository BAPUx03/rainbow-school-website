-- Allow authenticated users to insert their own role (for initial admin setup)
CREATE POLICY "Users can insert their own role" 
ON public.user_roles 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- Allow admins to manage enrollments (update status)
CREATE POLICY "Admins can update enrollments" 
ON public.enrollments 
FOR UPDATE 
TO authenticated 
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to delete enrollments
CREATE POLICY "Admins can delete enrollments" 
ON public.enrollments 
FOR DELETE 
TO authenticated 
USING (public.has_role(auth.uid(), 'admin'));