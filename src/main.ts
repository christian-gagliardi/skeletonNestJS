import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import helmet from 'helmet';
import mainLogger from './config/logger';
import Logger from './config/logger/log';
import HttpExceptionFilter from './filters/http-exception.filter';

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(mainLogger);
  app.use(helmet());
  await app.listen(process.env.PORT);
  Logger.info(`SERVER UP on port: ${process.env.PORT}`);
}
bootstrap();
