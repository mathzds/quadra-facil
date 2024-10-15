import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string()
        .min(4, { message: "Name must be at least 4 characters long." })
        .max(50, { message: "Name must be at most 50 characters long." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long." }),
    number: z.string().length(11, { message: "Number must be exactly 11 characters long." }),
});

export type UserDto = z.infer<typeof createUserSchema>;
