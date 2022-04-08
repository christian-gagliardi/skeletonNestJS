import { Routes } from '@nestjs/core'
import { QrModule } from './entities/qr/qr.module';
import { StoreModule } from './entities/stores/store.module';
import { ContractModule } from './entities/contracts/contract.module';
import { AgentModule } from './entities/agents/agent.module';

export const appRoutes: Routes = [
    {
        path: 'api',
        children: [
            {
                path: 'qr',
                module: QrModule
            },
            {
                path: 'store',
                module: StoreModule
            },
            {
                path: 'contract',
                module: ContractModule
            },
            {
                path: 'agent',
                module: AgentModule
            },
        ]
    },
];
