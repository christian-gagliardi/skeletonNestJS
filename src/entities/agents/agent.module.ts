import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { AgentController } from './controllers/agent.controller';
import { AgentService } from './services/agent.service';
import { AgentProviders } from './providers/agent.provider';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [AgentController],
  providers: [
    AgentService,
    ...AgentProviders,
  ]
})
export class AgentModule {}