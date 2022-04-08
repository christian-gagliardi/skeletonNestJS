import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { QrController } from './controllers/qr.controller';
import { QrService } from './services/qr.service';
import { QrProviders } from './providers/qr.provider';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [QrController],
  providers: [
    QrService,
    ...QrProviders,
  ]
})
export class QrModule {}