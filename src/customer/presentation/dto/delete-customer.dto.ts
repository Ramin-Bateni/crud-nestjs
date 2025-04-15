import { ApiProperty } from "@nestjs/swagger";
import { MetaDto } from "@/common";
export class DeleteCustomerDto {
  isDeleted: boolean;
} 

export class DeleteCustomerResponseDto {
    @ApiProperty({
      type: DeleteCustomerDto,
    })
    data!: DeleteCustomerDto | null;
  
    @ApiProperty({
      type: MetaDto,
    })
    meta!: MetaDto;
}