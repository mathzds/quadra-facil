import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/core/user/user.module';
import { CourtModule } from 'src/core/court/court.module';

@Module({
  imports: [UserModule, CourtModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
