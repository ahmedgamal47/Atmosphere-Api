import { Injectable } from '@nestjs/common';
import CoordinatesDto from './dto/coordinates.dto';
import { IqAir } from '../shared/providers/iqair-provider';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pollution } from '../shared/schema/pollution.schema';
import MostPollutedDto from './dto/most-polluted.dto';

@Injectable()
export class AtmosphereService {
  constructor(
    @InjectModel(Pollution.name)
    private readonly pollutionModel: Model<Pollution>,
    private readonly iqAirService: IqAir,
  ) {}

  async getAirQuality(coordinates: CoordinatesDto) {
    return this.iqAirService.iqAirQuality(coordinates);
  }

  async savePollutionLevel({ longitude, latitude }: CoordinatesDto) {
    const airQuality = await this.iqAirService.iqAirQuality({
      longitude,
      latitude,
    });
    await this.pollutionModel.create({
      createdAt: new Date(),
      ...airQuality.pollution,
    });
  }

  async getMostPolluted(): Promise<MostPollutedDto> {
    return this.pollutionModel
      .findOne()
      .sort({ aqius: -1, createdAt: -1 })
      .select('aqius createdAt');
  }
}
