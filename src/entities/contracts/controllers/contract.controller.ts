import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ContractService } from '../services/contract.service';
import { ContractByIdInterface } from'../interfaces/contractById.interface';
import { ContractInterface } from '../interfaces/contract.interface';
import { CreateContractDto } from '../interfaces/dto/createContract.dto';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';


@Controller()
export class ContractController {
  
  constructor(private readonly contractService: ContractService) {}

  @Post()
  buildNewContract(@Body() contractInfos: CreateContractDto): Promise<ContractInterface> {
    try{
      return this.contractService.buildNewContract(contractInfos);
    }catch(err){
      throw new HttpExceptionFilter({message: err})
    }
  }

  @Get('/:id')
  getContractDetails(@Param('id') id:ContractByIdInterface): Promise<ContractInterface>{
    try{
      return this.contractService.getContractDetails(id);
    }catch(err){
      throw new HttpExceptionFilter({message: err})
    }
  }

  @Get('/list/:skip/:limit')
  getContracts(@Param('skip') skip:number, @Param('limit') limit:number): Promise<ContractInterface[]>{
    try{
      return this.contractService.getContracts(skip, limit);
    }catch(err){
      throw new HttpExceptionFilter({message: err})
    }
  }
}
