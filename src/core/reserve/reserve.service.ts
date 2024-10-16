import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ReserveEntity } from './entities/reserve.entity';
import BaseRepository from 'src/common/utils/base.repository';
import { ReserveDto } from './dto/reserve-dto';
import { LessThan, MoreThan } from 'typeorm';
import { CourtEntity } from '../court/entities/court.entity';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class ReserveService extends BaseRepository<ReserveEntity> {
    constructor() {
        super(ReserveEntity);
    }

    async createReserve(data: ReserveDto): Promise<ReserveEntity> {
        const court = await this.repository.manager.findOne(CourtEntity, { where: { id: data.court_id } });
        const user = await this.repository.manager.findOne(UserEntity, { where: { id: data.user_id } });

        if (!court || !user) throw new NotFoundException('Court or User not found');

        const existingReservations = await this.repository.find({
            where: {
                court: { id: court.id },
                startDateTime: LessThan(data.endDateTime),
                endDateTime: MoreThan(data.startDateTime),
            },
        });

        if (existingReservations.length > 0) {
            throw new BadRequestException('Court is already reserved for the selected time.');
        }

        const reserve = this.repository.create({ ...data, court, user });
        return this.repository.save(reserve);
    }

    async findAllReserve(): Promise<ReserveEntity[]> {
        return await this.repository.find({
            relations: [
                "user",
                "court"
            ]
        })
    }

    async findOneReserve(id: string): Promise<ReserveEntity> {
        return await this.repository.findOne({
            where: { id },
            relations: [
                "user",
                "court"
            ]
        })
    }

    async updateReserve(id: string, data: Partial<ReserveDto>): Promise<ReserveEntity> {
        const existingReserve = await this.findOneReserve(id);
        if (!existingReserve) {
            throw new NotFoundException(`Reserve with ID ${id} not found`);
        }

        const updateReserve = this.repository.merge(existingReserve, data);
        return await this.repository.save(updateReserve);
    }


    async removeReserve(id: string): Promise<void> {
        const result = await this.repository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Reserve with ID ${id} not found`);
        }
    }
}
