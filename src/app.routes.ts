import { Routes } from '@nestjs/core'
import { StoreModule } from './entities/stores/store.module';

export const appRoutes: Routes = [
    {
        path: 'api',
        children: [
            {
                path: 'store',
                module: StoreModule
            },
        ]
    },
];
