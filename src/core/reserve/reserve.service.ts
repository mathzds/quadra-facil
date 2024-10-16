import { BadRequestException, Injectable } from '@nestjs/common';
import { ReserveEntity } from './entities/reserve.entity';
import BaseRepository from 'src/common/utils/base.repository';
import { ReserveDto } from './dto/reserve-dto';
import { LessThan, MoreThan } from 'typeorm';

@Injectable()
export class ReserveService extends BaseRepository<ReserveEntity> {
    constructor() {
        super(ReserveEntity);
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
}
