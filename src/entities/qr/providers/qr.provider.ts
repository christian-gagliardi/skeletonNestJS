import { Connection } from 'mongoose';
import QrSchema from '../models/qr.model';
import config from '../../../config';
import StoreSchema from 'src/entities/stores/models/store.model';

export const QrProviders = [
  {
    provide: config.QR_MODEL,
    useFactory: (connection: Connection) => connection.model('qr', QrSchema),
    inject: [config.DATABASE_CONNECTION],
  },
  {
    provide: config.STORE_MODEL,
    useFactory: (connection: Connection) => connection.model('stores', StoreSchema),
    inject: [config.DATABASE_CONNECTION],
  },
]