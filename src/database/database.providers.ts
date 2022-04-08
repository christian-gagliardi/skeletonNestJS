import * as mongoose from 'mongoose';
import config from '../config';

export const databaseProviders = [
  {
    provide: config.DATABASE_CONNECTION,
    useFactory: (): Promise<typeof mongoose> => mongoose.connect('mongodb://localhost/pharmabag'),
  },
];
