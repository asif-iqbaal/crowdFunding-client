import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  })

export const signupSchema = z.object({
    username: z.string().min(2, { message: "Name must be at least 2 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export const projectSchemas = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters long" }).max(100, { message: "Title must not exceed 100 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  description: z.string().min(50, { message: "Description must be at least 50 characters long" }).max(5000, { message: "Description must not exceed 5000 characters" }),
  fundingGoal: z.number().min(100, { message: "Funding goal must be at least $100" }).max(1000000, { message: "Funding goal must not exceed $1,000,000" }),
  duration: z.number().min(1, { message: "Duration must be at least 1 day" }).max(60, { message: "Duration must not exceed 60 days" }),
  image:  z
  .instanceof(File)
  .refine((file) => file.size <= 5 * 1024 * 1024, {  // Example: Max size of 5MB
    message: "File size should be 5MB or less",
  })
  .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
    message: "Only JPEG or PNG files are allowed",
  }).optional(),
})
export const projectSchema = z.object({
  title: z.string(),
  category: z.string(),
  description: z.string().min(5),
  fundingGoal: z.number().min(1000),
  duration: z.number().min(10),
  phone: z.number().min(10),
  image: z.instanceof(File).optional(),
});
