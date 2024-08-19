import { z } from "zod";
export const schema = z.object({
    email: z.string().email({ message: "Enter a valid email" }),
    password: z.string().min(4, { message: "Password must be atleast 4 characters long" }),
});
