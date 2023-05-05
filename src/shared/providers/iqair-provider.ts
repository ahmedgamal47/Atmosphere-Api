import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import CoordinatesDto from '../../atmosphere/dto/coordinates.dto';

@Injectable()
export class IqAir {
  private iqAir_apiKey = this.configService.get('iqAir_apiKey');
  private iqAir_baseUrl = this.configService.get('iqAir_baseUrl');
  private iqAir_nearest_endpoint = '/v2/nearest_city';
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  /**
   * retrieve air quality information from iqAir using lat and long
   * @param  {CoordinatesDto} coordinates
   */
  async iqAirQuality(coordinates: CoordinatesDto) {
    const iqAirApi = `${this.iqAir_baseUrl}${this.iqAir_nearest_endpoint}`;

    try {
      const response = await this.httpService
        .get(iqAirApi, {
          params: {
            key: this.iqAir_apiKey,
            lat: coordinates.latitude,
            lon: coordinates.longitude,
          },
        })
        .toPromise();
      return { pollution: response.data.data.current.pollution };
    } catch (e) {
      if (e.response.status === 400) {
        throw new HttpException('Invalid Coordinates', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(
          'Service Not Available',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }
    }
  }
}
