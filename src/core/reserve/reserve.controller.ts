import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ReserveService } from './reserve.service';
import { ReserveSchema, ReserveDto } from './dto/reserve-dto';
import { JwtAuthGuard } from 'src/common/auth/auth.guard';
import { UserService } from '../user/user.service';

@UseGuards(JwtAuthGuard)
@Controller('reserve')
export class ReserveController {
  constructor(
    private readonly reserveService: ReserveService,
    private readonly userServices: UserService
  ) { }

  @Post()
  async create(@Body() body: ReserveDto, @Request() req) {
    const user = await this.userServices.findUserByEmail(req.user.sub).then(user => user.id);

    if (!user) throw new BadRequestException('User not found.')

    if (!body.startDateTime || !body.endDateTime) {
      throw new BadRequestException('Start and end times must be provided.');
    }

    const parsedBody = ReserveSchema.parse({
      user_id: user,
      court_id: body.court_id,
      startDateTime: body.startDateTime,
      endDateTime: body.endDateTime,
      status: body.status
    });

    try {
      return this.reserveService.createReserve(parsedBody).then((reserve) => {
        return reserve
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create reservation.');
    }
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
  async update(@Param('id') id: string, @Body() body: Partial<ReserveDto>) {
    const parsedBody = ReserveSchema.partial().parse(body);
    return this.reserveService.updateReserve(id, parsedBody);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.reserveService.removeReserve(id);
  }
}
