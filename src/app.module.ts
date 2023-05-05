import { Module } from '@nestjs/common';
import { AtmosphereModule } from './atmosphere/atmosphere.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    AtmosphereModule,
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_HOST'),
      }),
    }),
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
