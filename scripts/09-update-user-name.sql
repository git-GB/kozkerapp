-- Update user profile with correct name
-- Replace 'user-email@example.com' with the actual user's email
-- Replace 'Akshay jayesh' with the desired full name

UPDATE users 
SET full_name = 'Akshay jayesh'
WHERE email = 'user-email@example.com';

-- If the user doesn't exist in the users table yet, insert them
INSERT INTO users (id, email, full_name, created_at, updated_at)
SELECT 
    auth.uid(),
    'user-email@example.com',
    'Akshay jayesh',
    NOW(),
    NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE email = 'user-email@example.com'
);
