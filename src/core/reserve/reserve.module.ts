import { Module } from '@nestjs/common';
import { ReserveService } from './reserve.service';
import { ReserveController } from './reserve.controller';
import { UserModule } from '../user/user.module';
import { CourtModule } from '../court/court.module';

@Module({
  imports: [UserModule, CourtModule],
  controllers: [ReserveController],
  providers: [ReserveService],
})
export class ReserveModule { }