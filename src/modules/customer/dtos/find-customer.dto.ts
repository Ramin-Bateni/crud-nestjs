import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';

export class FindCustomerDto {
  @ApiPropertyOptional({
    description: 'number of results to skip',
    type: Number,
    example: 0,
    writeOnly: true,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  skip = 0;

  @ApiPropertyOptional({
    description: 'number of results to take',
    type: Number,
    example: 10,
    writeOnly: true,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  take = 10;
}
