import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import config from '../../../config/index';


import { ContractByIdInterface } from'../interfaces/contractById.interface';
import { ContractInterface } from '../interfaces/contract.interface';
import { CreateContractDto } from '../interfaces/dto/createContract.dto';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import * as utils from 'src/utils';

@Injectable()
export class ContractService {
  constructor(
    @Inject(config.QR_MODEL) private qrModel: Model<any>,
    @Inject(config.CONTRACT_MODEL) private contractModel: Model<any>,
  ) {}
  
  async buildNewContract(createContract:CreateContractDto): Promise<any>{
    try{
      const qrOwner = await this.qrModel.findOne({_id: createContract.qr}, {storeOwner: 1, locked: 1}).lean()
      
      if(qrOwner.storeOwner != createContract.store) throw new HttpExceptionFilter({message: 'buildNewContract: Incorrect owner'});
      if(qrOwner.locked) throw new HttpExceptionFilter({message: 'buildNewContract: Already locked'});

      const results = await this.qrModel.updateOne({_id: createContract.qr}, {$set: {locked: true}});
      if(results.modifiedCount !== 1) throw new HttpExceptionFilter({message: 'buildNewContract: couldn\'t lock qr'});

      const contract = new this.contractModel(createContract);
      const response = await contract.save();
      console.log('SENEMAIL');
      const sendEmail = await utils.sendEmail(createContract);
      console.log(sendEmail);
      
      
      return response;
    }catch(err){
      console.log(err)
      throw new HttpExceptionFilter({message: err})
    }
  }

  async getContractDetails(id: ContractByIdInterface): Promise<ContractInterface> {
    try {
      return this.contractModel.findOne({_id:id}).exec();
    } catch (err) {
      console.log(err)
      throw new HttpExceptionFilter({message: err})
    }
  }

  async getContracts(skip: number, limit: number): Promise<ContractInterface[]>{
    try {
      return this.contractModel.find().skip(skip).limit(limit).exec();
    } catch (err) {
      console.log(err)
      throw new HttpExceptionFilter({message: err})
    }
  }
}
