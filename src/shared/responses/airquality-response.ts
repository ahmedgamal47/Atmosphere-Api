import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import AirQualityDto from '../../atmosphere/dto/airquality.dto';
import { BaseResponse } from './base-response';

export class AirQualityResponse extends BaseResponse<AirQualityDto> {
  @ApiProperty()
  result: AirQualityDto;
}
