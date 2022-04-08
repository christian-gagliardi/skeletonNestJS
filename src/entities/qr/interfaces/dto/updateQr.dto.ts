import { ApiProperty } from '@nestjs/swagger';


export class UpdateQRDto {

    @ApiProperty({ required: true })
    _id: string;

    @ApiProperty()
    shortUrl?: string;

    @ApiProperty()
    redirectUrl: string;

    @ApiProperty()
    note?: string;

    @ApiProperty({ required: false, default: true })
    isPhaRedirect?: boolean=false;
    
    @ApiProperty()
    storeOwner: string;

    @ApiProperty()
    locked?: boolean=false;
}


