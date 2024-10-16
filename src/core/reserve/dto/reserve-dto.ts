import { z } from 'zod';
import { ReservationStatus } from '../entities/reserve.entity';

export const ReserveSchema = z.object({
  courtId: z.number().optional(),
  startDateTime: z.string().transform((value) => new Date(value)),
  endDateTime: z.string().transform((value) => new Date(value)),
  status: z.enum([ReservationStatus.PENDING, ReservationStatus.CONFIRMED, ReservationStatus.CANCELED]),
});

export type ReserveDto = z.infer<typeof ReserveSchema>;
