import { Test, TestingModule } from '@nestjs/testing';
import { AtmosphereController } from './atmosphere.controller';
import { AtmosphereService } from './atmosphere.service';
import { AirQualityResponse } from '../shared/responses/airquality-response';
import { IqAir } from '../shared/providers/iqair-provider';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../test/util';
import { MongooseModule } from '@nestjs/mongoose';
import { Pollution, PollutionSchema } from '../shared/schema/pollution.schema';

describe('AtmosphereController', () => {
  let controller: AtmosphereController;
  let service: AtmosphereService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: Pollution.name, schema: PollutionSchema },
        ]),
        ConfigModule.forRoot(),
        HttpModule,
      ],
      controllers: [AtmosphereController],
      providers: [IqAir, AtmosphereService],
    }).compile();

    controller = module.get<AtmosphereController>(AtmosphereController);
    service = module.get<AtmosphereService>(AtmosphereService);
  });

  describe('getAirQuality', () => {
    it('should return air quality for valid latitude and longitude', async () => {
      const coordinates = { latitude: 51.5074, longitude: -0.1278 };
      const result = await controller.getAirQuality(coordinates);
      expect(result).toBeInstanceOf(AirQualityResponse);
    });

    it('should throw an exception for invalid latitude and longitude', async () => {
      const coordinates = { latitude: 0, longitude: 0 };
      await expect(controller.getAirQuality(coordinates)).rejects.toThrow();
    });
  });

  afterAll(async () => {
    await closeInMongodConnection();
    await module.close();
  });
});
