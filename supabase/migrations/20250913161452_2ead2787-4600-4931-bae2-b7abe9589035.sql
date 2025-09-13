-- Fix signup failure by allowing system to create profile rows and wiring the signup trigger
-- 1) Recreate handle_new_user as SECURITY DEFINER
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', 'User'),
    COALESCE((NEW.raw_user_meta_data ->> 'role')::user_role, 'visitor')
  );
  RETURN NEW;
END;
$$;

-- 2) Ensure the auth.users trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- 3) Allow Supabase Auth system role to insert profiles during signup
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'profiles'
      AND policyname = 'System can create profiles on signup'
  ) THEN
    CREATE POLICY "System can create profiles on signup"
    ON public.profiles
    FOR INSERT
    TO supabase_auth_admin
    WITH CHECK (true);
  END IF;
END $$;
