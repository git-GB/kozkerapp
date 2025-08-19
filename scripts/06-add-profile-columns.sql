-- Add missing profile columns to users table
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS website_url TEXT;

-- Update the updated_at column to current timestamp for existing users
UPDATE public.users SET updated_at = NOW() WHERE updated_at IS NULL;

-- Add comment to document the new columns
COMMENT ON COLUMN public.users.bio IS 'User biography/description (max 500 characters)';
COMMENT ON COLUMN public.users.phone IS 'User phone number';
COMMENT ON COLUMN public.users.location IS 'User location (city, country)';
COMMENT ON COLUMN public.users.website_url IS 'User personal website URL';
