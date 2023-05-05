import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Pollution extends Document {
  @ApiProperty()
  @Prop()
  createdAt: Date;

  @ApiProperty()
  @Prop()
  ts: string;

  @ApiProperty()
  @Prop()
  aqius: number;

  @ApiProperty()
  @Prop()
  mainus: string;

  @ApiProperty()
  @Prop()
  aqicn: number;

  @ApiProperty()
  @Prop()
  maincn: string;
}

const PollutionSchema = SchemaFactory.createForClass(Pollution);
export type PollutionDocument = Pollution & Document;

export { PollutionSchema };
