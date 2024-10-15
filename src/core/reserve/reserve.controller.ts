import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReserveService } from './reserve.service';
import { ReserveSchema } from './dto/reserve-dto';

@Controller('reserve')
export class ReserveController {
  constructor(private readonly reserveService: ReserveService) { }

  @Post()
  @Post()
  async create(@Body() body: unknown) {
      const parsedBody = ReserveSchema.parse(body);

      parsedBody.startDateTime = new Date(parsedBody.startDateTime);
      parsedBody.endDateTime = new Date(parsedBody.endDateTime);

      return this.reserveService.createReserve(parsedBody);
  }

  @Get()
  async findAll() {
    return this.reserveService.findAllReserve();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.reserveService.findOneReserve(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: unknown) {
    const parsedBody = ReserveSchema.partial().parse(body);
    return this.reserveService.updateReserve(id, parsedBody);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.reserveService.removeReserve(id);
  }
}
