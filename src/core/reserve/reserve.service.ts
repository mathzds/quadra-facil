import { Injectable, NotFoundException } from '@nestjs/common';
import { ReserveEntity } from './entities/reserve.entity';
import BaseRepository from 'src/common/utils/base.repository';
import { ReserveDto } from './dto/reserve-dto';

@Injectable()
export class ReserveService extends BaseRepository<ReserveEntity> {
    constructor() {
        super(ReserveEntity);
    }

    async createReserve(data: ReserveDto): Promise<ReserveEntity> {
        const reserve = this.repository.create(data);
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
