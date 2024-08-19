import { z } from "zod";

// Define the schema for form validation
export const schema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

// Define the TypeScript type for the form data
export type SignupFormData = z.infer<typeof schema>;