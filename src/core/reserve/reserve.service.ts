import { BadRequestException, Injectable } from '@nestjs/common';
import { ReservationStatus, ReserveEntity } from './entities/reserve.entity';
import BaseRepository from 'src/common/utils/base.repository';
import { ReserveDto } from './dto/reserve-dto';
import { LessThan, MoreThan } from 'typeorm';

@Injectable()
export class ReserveService extends BaseRepository<ReserveEntity> {
    constructor() {
        super(ReserveEntity);
    }

    async findAllReserves(): Promise<ReserveEntity[]> {
        return await this.repository.find();
    }

    async findReserveById(id: number): Promise<ReserveEntity> {
        const reserve = await this.repository.findOneBy({ id });
        if (!reserve) {
            throw new BadRequestException('Reserva inexistente');
        }
        return reserve;
    }

    async findReserveByRelatedUser(id: number): Promise<ReserveEntity> {
        const reserve = await this.repository.findOne({
            where: { id },
            relations: ['user']
        })
        if (!reserve) {
            throw new BadRequestException('Reserva inexistente');
        }
        return reserve
    }

    async createReserve(data: ReserveDto): Promise<ReserveEntity> {
        if (new Date(data.startDateTime) >= new Date(data.endDateTime)) {
            throw new BadRequestException('O horário de início deve ser anterior ao horário de término.');
        }

        const existingReserves = await this.repository.find({
            where: {
                court: { id: data.courtId },
                startDateTime: LessThan(data.endDateTime),
                endDateTime: MoreThan(data.startDateTime)
            }
        });

        if (existingReserves.length > 0) {
            throw new BadRequestException('A reserva já existe para esta quadra durante o horário selecionado.');
        }

        const reserve = this.repository.create(data);
        return await this.repository.save(reserve);
    }

    async confirmReserve(userId: number, reserveId: number): Promise<ReserveEntity> {
        const reserve = await this.findReserveByRelatedUser(reserveId);

        if (reserve.user.id !== userId) {
            throw new BadRequestException('Reserva não pertence ao usuário');
        }

        if (reserve.status === ReservationStatus.CONFIRMED) {
            throw new BadRequestException('Reserva já confirmada');
        }

        reserve.status = ReservationStatus.CONFIRMED;
        return await this.repository.save(reserve);
    }

    async cancelReserve(userId: number, reserveId: number): Promise<{ message: string }> {
        const reserve = await this.findReserveByRelatedUser(reserveId);

        if (reserve.user.id !== userId) {
            throw new BadRequestException('Reservation does not belong to the user');
        }

        await this.repository.delete(reserve.id);
        return { message: 'Reservation canceled successfully' };
    }
}
