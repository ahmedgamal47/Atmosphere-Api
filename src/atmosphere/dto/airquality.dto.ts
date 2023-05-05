import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class PollutionDto {
  @ApiProperty()
  @IsDate()
  ts: Date;

  @ApiProperty()
  @IsNumber()
  aqius: number;

  @ApiProperty()
  @IsString()
  mainus: string;

  @ApiProperty()
  @IsNumber()
  aqicn: number;

  @ApiProperty()
  @IsString()
  maincn: string;
}

export default class AirQualityDto {
  @ApiProperty()
  pollution: PollutionDto;
}
