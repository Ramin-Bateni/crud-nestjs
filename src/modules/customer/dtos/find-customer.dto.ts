import { IsInt, IsOptional, Min } from 'class-validator';

export class FindCustomerDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  skip = 0;

  @IsOptional()
  @IsInt()
  @Min(1)
  take = 10;
}
