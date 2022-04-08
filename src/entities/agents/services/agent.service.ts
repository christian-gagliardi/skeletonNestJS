import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import config from '../../../config/index';
import { AgentByIdInterface } from'../interfaces/agentById.interface';
import { AgentInterface } from '../interfaces/agent.interface';
import { UpdateAgentDto } from '../interfaces/dto/updateAgent.dto';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';


@Injectable()
export class AgentService {
  constructor(
    @Inject(config.AGENT_MODEL) private agentModel: Model<any>
  ) {}

  async getAgentDetails(id: AgentByIdInterface): Promise<AgentInterface> {
    try {
      return this.agentModel.findOne({_id:id}).exec();
    } catch (err) {
      throw new HttpExceptionFilter({message: err})
    }
  }

  async getAgentsByName(surname: string ): Promise<AgentInterface[]>{
    try {
      return this.agentModel.find({$text: {$search: surname}}).exec();
    } catch (err) {
      throw new HttpExceptionFilter({message: err})
    }
  }

  async getAgentContract(id: string, skip: number, limit: number): Promise<AgentInterface[]>{
    try {
      return this.agentModel.find({_id: id}, {contracts:1}).populate('contracts').skip(skip).limit(limit).lean();
    } catch (err) {
      throw new HttpExceptionFilter({message: err})
    }
  }

  async getAgents(skip: number, limit: number): Promise<AgentInterface[]>{
    try {
      return this.agentModel.find({}).skip(skip).limit(limit).exec();
    } catch (err) {
      throw new HttpExceptionFilter({message: err})
    }
  }

  async getAgentsByDistance(query:object, skip: number, limit: number): Promise<AgentInterface[]>{
    try {
      return this.agentModel.find(query).skip(skip).limit(limit).exec();
    } catch (err) {
      throw new HttpExceptionFilter({message: err})
    }
  }

  async updateAgent(id: AgentByIdInterface, agent: UpdateAgentDto): Promise<any> {
    try {
      const result = await this.agentModel.updateOne({_id: id}, {$set: agent}).exec();
      return result;
    } catch (err) {
      throw new HttpExceptionFilter({message: err})
    }
  }

}
