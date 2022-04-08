import { ApiProperty } from '@nestjs/swagger';

export class UpdateStoreDto {
    @ApiProperty({required: true})
    location        : Object;

    @ApiProperty({default: null})
    description     : String;

    @ApiProperty({default: null})
    note            : String;

    @ApiProperty({required: true})
    phone           : String;

    @ApiProperty({required: true})
    email           : String;

    @ApiProperty({ default: true})
    active          : Boolean;

    @ApiProperty({required: true})
    code            : String;

    @ApiProperty({required: true})
    name            : String;

    @ApiProperty({required: true})
    address         : String;

    @ApiProperty({required: true})
    city            : String;

    @ApiProperty({required: true})
    cap             : String;

    @ApiProperty({ default: false})
    isVirtual       : Boolean;

    @ApiProperty({default: null})
    whatsapp        : String;

    @ApiProperty({default: null})
    doctor          : String;

    @ApiProperty({ default: false})
    pro             : Boolean;

    @ApiProperty({default: null})
    display_name    : String;

    @ApiProperty({default: null})
    region          : String;

    @ApiProperty({default: '+39'})
    whatsapp_prefix : String;

}

