import {ObjectId} from 'mongoose';

export interface StoreInterface {
  id?: ObjectId;
  location: {type: string; coordinates: [number]};
  description?: string;
  note?: string;
  phone: string;
  email: string;
  active?: boolean;
  code: string;
  name: string;
  address: string;
  city: string;
  cap: string;
  isVirtual?: boolean;
  whatsapp?: string;
  doctor?: string;
  pro?: boolean;
  display_name?: string;
  region?: string;
  whatsapp_prefix?: string;
  __v?: number;
}
