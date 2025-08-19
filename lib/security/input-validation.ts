import { z } from "zod"

// Email validation schema
export const emailSchema = z
  .string()
  .email("Invalid email address")
  .min(5, "Email must be at least 5 characters")
  .max(254, "Email must be less than 254 characters")
  .transform((email) => email.toLowerCase().trim())

// Password validation schema
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must be less than 128 characters")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    "Password must contain at least one lowercase letter, one uppercase letter, and one number",
  )

// Name validation schema
export const nameSchema = z
  .string()
  .min(1, "Name is required")
  .max(100, "Name must be less than 100 characters")
  .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes")
  .transform((name) => name.trim())

// Phone validation schema
export const phoneSchema = z
  .string()
  .optional()
  .refine((phone) => !phone || /^\+?[\d\s\-$$$$]+$/.test(phone), "Invalid phone number format")
  .transform((phone) => phone?.trim())

// URL validation schema
export const urlSchema = z
  .string()
  .optional()
  .refine((url) => !url || z.string().url().safeParse(url).success, "Invalid URL format")
  .transform((url) => url?.trim())

// Bio validation schema
export const bioSchema = z
  .string()
  .optional()
  .refine((bio) => !bio || bio.length <= 500, "Bio must be less than 500 characters")
  .transform((bio) => bio?.trim())

// Location validation schema
export const locationSchema = z
  .string()
  .optional()
  .refine((location) => !location || location.length <= 100, "Location must be less than 100 characters")
  .transform((location) => location?.trim())

// Sign up validation schema
export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  fullName: nameSchema.optional(),
})

// Sign in validation schema
export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
})

// Profile update validation schema
export const profileUpdateSchema = z.object({
  fullName: nameSchema.optional(),
  bio: bioSchema,
  phone: phoneSchema,
  location: locationSchema,
  websiteUrl: urlSchema,
})

// Password change validation schema
export const passwordChangeSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

// Sanitize HTML content
export function sanitizeHtml(input: string): string {
  return input
    .replace(/[<>]/g, "") // Remove HTML tags
    .replace(/javascript:/gi, "") // Remove javascript: URLs
    .replace(/on\w+=/gi, "") // Remove event handlers
    .trim()
}

// Sanitize user input
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[\x00-\x1F\x7F]/g, "") // Remove control characters
    .slice(0, 1000) // Limit length
}

// Validate and sanitize form data
export function validateAndSanitize<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): { success: true; data: T } | { success: false; errors: string[] } {
  try {
    const result = schema.parse(data)
    return { success: true, data: result }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map((err) => err.message),
      }
    }
    return {
      success: false,
      errors: ["Invalid input data"],
    }
  }
}
