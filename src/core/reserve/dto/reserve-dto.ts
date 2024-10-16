import { z } from 'zod';
import { ReservationStatus } from '../entities/reserve.entity';

export const ReserveSchema = z.object({
  user_id: z.number(), 
  court_id: z.string(),
  startDateTime: z.string().transform((value) => new Date(value)),
  endDateTime: z.string().transform((value) => new Date(value)),
  status: z.enum([ReservationStatus.PENDING, ReservationStatus.CONFIRMED, ReservationStatus.CANCELED]),
});

export type ReserveDto = z.infer<typeof ReserveSchema>;
