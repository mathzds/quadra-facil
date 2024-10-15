import { Module } from '@nestjs/common';
import { CourtService } from './court.service';
import { CourtController } from './court.controller';

@Module({
  controllers: [CourtController],
  providers: [CourtService],
  exports: [CourtService]
})
export class CourtModule { }
