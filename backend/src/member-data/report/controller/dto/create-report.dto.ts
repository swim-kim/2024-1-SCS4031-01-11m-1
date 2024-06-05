import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReportDto {
  @ApiProperty({
    example: "productId123129e83u2o1381312i1",
    description: "상품 id (uuid)"
  })
  @IsUUID()
  productId: string;

  @ApiProperty({
    example: "productId123129e83u2o1381312i1",
    description: "회의록 id (uuid)"
  })
  @IsUUID()
  minuteId: string;

  @ApiProperty({
    type: Date,
    example: "2024-01-03 00:00:00",
    description: "start date"
  })
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({
    type: Date,
    example: "2024-01-03 00:00:00",
    description: "end date"
  })
  @IsDate()
  @Type(() => Date)
  endDate: Date;
}