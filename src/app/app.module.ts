import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/core/user/user.module';
import { CourtModule } from 'src/core/court/court.module';
import { ReserveModule } from 'src/core/reserve/reserve.module';
import { AuthModule } from 'src/common/auth/auth.module';

@Module({
  imports: [UserModule, CourtModule, ReserveModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
