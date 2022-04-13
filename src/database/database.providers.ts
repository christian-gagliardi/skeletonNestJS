import * as mongoose from 'mongoose';
import config from '../config';

export const databaseProviders = [
  {
    provide: config.DATABASE_CONNECTION,
    useFactory: (): Promise<typeof mongoose> => {
      console.log('process.env.MONGO_URL')
      console.log(process.env.MONGO_URL)
      return mongoose.connect(process.env.MONGO_URL)
    },
  },
];
