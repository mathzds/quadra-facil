import { Injectable, NotFoundException } from '@nestjs/common';
import { CourtEntity } from './entities/court.entity';
import BaseRepository from 'src/common/utils/base.repository';
import { CourtDto } from './dto/court-dto';
import { courtSchema } from './dto/court-dto';


@Injectable()
export class CourtService extends BaseRepository<CourtEntity> {
    constructor() {
        super(CourtEntity);
    }

    async createCourt(data: CourtDto): Promise<CourtEntity> {
        const validateData = courtSchema.parse(data)
        const court = this.repository.create(validateData);
        return await this.repository.save(court);
    }

    async updateCourt(id: string, data: Partial<CourtDto>): Promise<CourtEntity> {
        await this.findByIdCourts(id)
        const updateCourt = this.repository.merge(await this.findByIdCourts(id), data);
        return await this.repository.save(updateCourt);
    }

    async deleteCourt(id: string): Promise<void> {
        const result = await this.findByIdCourts(id);
        await this.repository.remove(result);
    }

    async findAllCourts(): Promise<CourtEntity[]> {
        return await this.repository.find();
    }

    async findByIdCourts(id: string): Promise<CourtEntity> {
        const court = await this.repository.findOneBy({ id });
        if (!court) {
            throw new NotFoundException(`Court with ID ${id} not found`);
        }
        return court;
    }
}
