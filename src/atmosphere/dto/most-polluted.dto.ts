import { IsNumber, IsNotEmpty, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class MostPollutedDto {
  @IsDate()
  @ApiProperty()
  createdAt: Date;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  aqius: number;
}
