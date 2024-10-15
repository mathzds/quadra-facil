import { z } from "zod";
import { Courts } from "../entities/court.entity";

export const courtSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    address: z.string().min(1, { message: "Address is required." }),
    type: z.enum([
        Courts.TENNIS,
        Courts.BASKETBALL,
        Courts.VOLLEYBALL,
        Courts.SOCCER,
        Courts.FUTSAL
    ], {
        message: "Invalid court type.",
    }),
    available: z.boolean().optional()
});

export type CourtDto = z.infer<typeof courtSchema>;
