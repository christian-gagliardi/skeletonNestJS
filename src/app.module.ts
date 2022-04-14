import {Module} from '@nestjs/common';
import {RouterModule} from '@nestjs/core';
import {ConfigModule} from '@nestjs/config';
import {DatabaseModule} from './database/database.module';
import {appRoutes} from './app.routes';

// import {SentryModule} from '@ntegral/nestjs-sentry';
import {StoreModule} from './entities/stores/store.module';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: '.development.env', isGlobal: true}),
    // SentryModule.forRoot({
    //   debug: (process.env.NODE_ENV !== 'production') ? true : false,
    //   dsn: 'https://45740e3ae4864e77a01ad61a47ea3b7e@o115888.ingest.sentry.io/25956308132020',
    //   environment: (process.env.NODE_ENV === 'development') ? 'dev' : 'production',
    //   tracesSampleRate: 1.0,
    // }),
    DatabaseModule,
    StoreModule,
    RouterModule.register(appRoutes)
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
