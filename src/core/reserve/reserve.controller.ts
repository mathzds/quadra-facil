import { Controller, Post, Body, UseGuards, Request, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ReserveService } from './reserve.service';
import { ReserveSchema, ReserveDto } from './dto/reserve-dto';
import { JwtAuthGuard } from 'src/common/auth/auth.guard';
import { UserService } from '../user/user.service';
import { ReserveEntity } from './entities/reserve.entity';
import { CourtService } from '../court/court.service';

@UseGuards(JwtAuthGuard)
@Controller('reserve')
export class ReserveController {
  constructor(
    private readonly reserveService: ReserveService,
    private readonly userService: UserService,
    private readonly courtService: CourtService
  ) { }

  @Post()
  async createReserve(@Request() req, @Body() data: ReserveDto): Promise<ReserveEntity> {
    try {
      const validateData = ReserveSchema.parse(data);
      const user = await this.userService.findUserByEmail(req.user.sub);
      const court = await this.courtService.findByIdCourts(validateData.courtId);

      if (!user) throw new BadRequestException('User not found');
      if (!court) throw new BadRequestException('Court not found');

      const reserveData = {
        ...validateData,
        user: { id: user.id },
        court: { id: validateData.courtId }
      };

      const reserve = await this.reserveService.createReserve(reserveData);
      return reserve;
    } catch (error) {
      throw new InternalServerErrorException('An error occurred while creating the reservation');
    }
  }
}
