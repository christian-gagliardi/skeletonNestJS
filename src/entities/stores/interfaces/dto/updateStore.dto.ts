import {ApiProperty} from '@nestjs/swagger';

export class UpdateStoreDto {
  @ApiProperty({required: true})
  location: {type: string; coordinates: [number]};

  @ApiProperty({default: null})
  description: string;

  @ApiProperty({default: null})
  note: string;

  @ApiProperty({required: true})
  phone: string;

  @ApiProperty({required: true})
  email: string;

  @ApiProperty({default: true})
  active: boolean;

  @ApiProperty({required: true})
  code: string;

  @ApiProperty({required: true})
  name: string;

  @ApiProperty({required: true})
  address: string;

  @ApiProperty({required: true})
  city: string;

  @ApiProperty({required: true})
  cap: string;

  @ApiProperty({default: false})
  isVirtual: boolean;

  @ApiProperty({default: null})
  whatsapp: string;

  @ApiProperty({default: null})
  doctor: string;

  @ApiProperty({default: false})
  pro: boolean;

  @ApiProperty({default: null})
  display_name: string;

  @ApiProperty({default: null})
  region: string;

  @ApiProperty({default: '+39'})
  whatsapp_prefix: string;
}
