import { Connection } from 'mongoose';
import AgentSchema from '../models/agent.model';
import config from '../../../config';

export const AgentProviders = [
  {
    provide: config.AGENT_MODEL,
    useFactory: (connection: Connection) => connection.model('agents', AgentSchema),
    inject: [config.DATABASE_CONNECTION],
  },
]