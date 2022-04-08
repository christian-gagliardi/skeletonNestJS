import { Connection } from 'mongoose';
import StoreSchema from '../models/store.model';
import config from '../../../config';

export const StoreProviders = [
  {
    provide: config.STORE_MODEL,
    useFactory: (connection: Connection) => connection.model('stores', StoreSchema),
    inject: [config.DATABASE_CONNECTION],
  },
]