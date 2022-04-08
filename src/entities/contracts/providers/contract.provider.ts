import { Connection } from 'mongoose';
import ContractSchema from '../models/contract.model';
import config from '../../../config';
import QrSchema from 'src/entities/qr/models/qr.model';

export const ContractProviders = [
  {
    provide: config.CONTRACT_MODEL,
    useFactory: (connection: Connection) => connection.model('contracts', ContractSchema),
    inject: [config.DATABASE_CONNECTION],
  },{
    provide: config.QR_MODEL,
    useFactory: (connection: Connection) => connection.model('qr', QrSchema),
    inject: [config.DATABASE_CONNECTION],
  },
]