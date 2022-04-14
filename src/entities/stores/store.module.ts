import {Module} from '@nestjs/common';
import {DatabaseModule} from '../../database/database.module';
import {StoreController} from './controllers/store.controller';
import {StoreService} from './services/store.service';
import {StoreProviders} from './providers/store.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [StoreController],
  providers: [StoreService, ...StoreProviders]
})
export class StoreModule {}
