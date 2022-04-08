import { ApiProperty } from '@nestjs/swagger';

export class CreateContractDto {

    @ApiProperty({required: true})
    store: string

    @ApiProperty({required: true})
    qr: string
}


