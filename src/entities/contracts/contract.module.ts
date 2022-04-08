import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { ContractController } from './controllers/contract.controller';
import { ContractService } from './services/contract.service';
import { ContractProviders } from './providers/contract.provider';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [ContractController],
  providers: [
    ContractService,
    ...ContractProviders,
  ]
})
export class ContractModule {}