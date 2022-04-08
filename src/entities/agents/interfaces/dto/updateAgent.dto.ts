import { ApiProperty } from '@nestjs/swagger';

export class UpdateAgentDto {
    @ApiProperty({default: null})
    note            : String;

    @ApiProperty({required: true})
    phone           : String;

    @ApiProperty({required: true})
    email           : String;

    @ApiProperty({ default: true})
    active          : Boolean;

    @ApiProperty({required: true})
    surname            : String;

    @ApiProperty({required: true})
    name            : String;
}

