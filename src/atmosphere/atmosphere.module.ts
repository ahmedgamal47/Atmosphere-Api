import { Module } from '@nestjs/common';
import { AtmosphereService } from './atmosphere.service';
import { AtmosphereController } from './atmosphere.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { IqAir } from 'src/shared/providers/iqair-provider';
import { MongooseModule } from '@nestjs/mongoose';
import { Pollution, PollutionSchema } from '../shared/schema/pollution.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pollution.name, schema: PollutionSchema },
    ]),
    ConfigModule.forRoot(),
    HttpModule,
  ],
  controllers: [AtmosphereController],
  providers: [AtmosphereService, IqAir],
})
export class AtmosphereModule {}
