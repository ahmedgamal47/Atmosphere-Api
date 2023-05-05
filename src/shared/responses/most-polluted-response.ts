import { ApiProperty } from '@nestjs/swagger';
import MostPollutedDto from 'src/atmosphere/dto/most-polluted.dto';
import { BaseResponse } from './base-response';

export class MostPollutedResponse extends BaseResponse<MostPollutedDto> {
  @ApiProperty()
  result: MostPollutedDto;
}
