import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourtService } from './court.service';
import { CourtDto } from './dto/court-dto';
import { CourtEntity } from './entities/court.entity';

@Controller('court')
export class CourtController {
  constructor(private readonly courtService: CourtService) { }

  @Post()
  async createCourt(@Body() data: CourtDto): Promise<CourtEntity> {
    return await this.courtService.createCourt(data);
  }

  @Get()
  async findAllCourt(): Promise<CourtEntity[]> {
    return await this.courtService.findAllCourts();
  }

  @Get(":id")
  async findByIdCourt(@Param("id") id: number): Promise<CourtEntity> {
    return await this.courtService.findByIdCourts(id);
  }

  @Patch(":id")
  async updateCourt(@Param("id") id: number, @Body() data: Partial<CourtDto>): Promise<CourtEntity> {
    return await this.courtService.updateCourt(id, data);
  }

  @Delete(":id")
  async deleteCourt(@Param("id") id: number): Promise<void> {
    return await this.courtService.deleteCourt(id);
  }
}
