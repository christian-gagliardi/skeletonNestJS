import { ApiProperty } from '@nestjs/swagger';

export class CreateQRDto {
    @ApiProperty()
    shortUrl?: string

    @ApiProperty({required: true})
    redirectUrl: string

    @ApiProperty()
    note: string

    @ApiProperty({ required: false, default: true })
    isPhaRedirect?: boolean=false
    
    @ApiProperty({required: true})
    storeOwner: string

    @ApiProperty()
    qrImage:string

    @ApiProperty()
    code:string

    @ApiProperty()
    locked?: boolean=false;
}


