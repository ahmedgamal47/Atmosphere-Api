import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AirQualityResponse } from '../shared/responses/airquality-response';
import { AtmosphereService } from './atmosphere.service';
import CoordinatesDto from './dto/coordinates.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MostPollutedResponse } from 'src/shared/responses/most-polluted-response';

@ApiTags('Atmosphere')
@Controller({
  version: '1',
  path: '/atmosphere',
})
export class AtmosphereController {
  constructor(private readonly atmosphereService: AtmosphereService) {}

  @ApiResponse({
    status: 200,
    description: 'Get air quality by latitude and longitude',
    type: AirQualityResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid latitude and longitude',
  })
  @ApiQuery({ name: 'latitude', type: 'number', required: true })
  @ApiQuery({ name: 'longitude', type: 'number', required: true })
  @Get('quality')
  async getAirQuality(
    @Query() coordinates: CoordinatesDto,
  ): Promise<AirQualityResponse> {
    const result = await this.atmosphereService.getAirQuality(coordinates);
    return new AirQualityResponse(result);
  }

  @ApiResponse({
    status: 200,
    description: 'Get paris most polluted datetime',
    type: AirQualityResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid latitude and longitude',
  })
  @Get('most-polluted')
  async getMostPolluted(): Promise<MostPollutedResponse> {
    const result = await this.atmosphereService.getMostPolluted();
    return new MostPollutedResponse(result);
  }

  /**
   * request air quality information for specific location every 1 minute and store it in database
   */
  @Cron(CronExpression.EVERY_MINUTE)
  async schedualeParisPollution() {
    await this.atmosphereService.savePollutionLevel({
      latitude: 48.856613,
      longitude: 2.352222,
    });
  }
}
