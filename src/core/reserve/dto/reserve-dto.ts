import { z } from 'zod';
import { ReservationStatus } from '../entities/reserve.entity';

export const ReserveSchema = z.object({
  userId: z.number(),
  courtId: z.string().uuid(), 
  startDateTime: z.date(),
  endDateTime: z.date(),
  status: z.enum([ReservationStatus.PENDING, ReservationStatus.CONFIRMED, ReservationStatus.CANCELED]),
});

export type ReserveDto = z.infer<typeof ReserveSchema>;
