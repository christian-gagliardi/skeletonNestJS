import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { AgentService } from '../services/agent.service';
import { AgentByIdInterface } from'../interfaces/agentById.interface';
import { AgentInterface } from '../interfaces/agent.interface';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { UpdateAgentDto } from '../interfaces/dto/updateAgent.dto';


@Controller()
export class AgentController {
  
  constructor(private readonly agentService: AgentService) {}

  @Get('/details/:id')
  getAgentDetails(@Param('id') id:AgentByIdInterface): Promise<AgentInterface>{
    try{
      return this.agentService.getAgentDetails(id);
    }catch(err){
      throw new HttpExceptionFilter({message: err})
    }
  }

  @Get('/list/:skip/:limit')
  async getAgent(
    @Param('skip') skip:number,
    @Param('limit') limit:number,
  ): Promise<AgentInterface[]>{
    try{
      return await this.agentService.getAgents(skip, limit);
    }catch(err){
      throw new HttpExceptionFilter({message: err})
    }
  }

  @Get('/contracts/:agentId/:skip/:limit')
  async getAgentContracts(
    @Param('agentId') agentId:string,
    @Param('skip') skip:number,
    @Param('limit') limit:number,
  ): Promise<AgentInterface[]>{
    //to improve this function we need to authenticate agent
    try{
      return await this.agentService.getAgentContract(agentId, skip, limit);
    }catch(err){
      throw new HttpExceptionFilter({message: err})
    }
  }

  @Get('/byName/:surname')
  async getAgentsByName(@Param('surname') surname:string  ): Promise<AgentInterface[]>{
    try{
      const result = await this.agentService.getAgentsByName(surname);
      return result
    }catch(err){
      throw new HttpExceptionFilter({message: err})
    }
  }

  @Put('/:id')
  updateAgent(@Param('id') id:AgentByIdInterface, @Body() agentInfos: UpdateAgentDto ): Promise<any> {
    try{
      return this.agentService.updateAgent(id, agentInfos);
    }catch(err){
      throw new HttpExceptionFilter({message: err})
    }
  }

}
