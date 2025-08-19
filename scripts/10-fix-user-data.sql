-- Fix user data for akshayjayeshjp@gmail.com
-- This script ensures the user has a proper record in the users table

-- First, let's check if the user exists and update/insert accordingly
INSERT INTO users (
  id,
  email,
  full_name,
  created_at,
  updated_at,
  subscription_tier
)
SELECT 
  auth.uid(),
  'akshayjayeshjp@gmail.com',
  'Akshay Jayesh',
  NOW(),
  NOW(),
  'free'
WHERE NOT EXISTS (
  SELECT 1 FROM users WHERE email = 'akshayjayeshjp@gmail.com'
);

-- Update existing record if it exists but full_name is empty
UPDATE users 
SET 
  full_name = 'Akshay Jayesh',
  updated_at = NOW()
WHERE email = 'akshayjayeshjp@gmail.com' 
  AND (full_name IS NULL OR full_name = '');

-- Alternative: If you know the exact user ID from auth.users, you can use:
-- UPDATE users 
-- SET 
--   full_name = 'Akshay Jayesh',
--   updated_at = NOW()
-- WHERE id = 'USER_ID_HERE';
