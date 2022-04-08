import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseFilters } from '@nestjs/common';
import { QrService } from '../services/qr.service';
import { QrByIdInterface } from'../interfaces/qrById.interface';
import { QrInterface } from '../interfaces/qr.interface';
import { CreateQRDto } from '../interfaces/dto/createQr.dto';
import { UpdateQRDto } from '../interfaces/dto/updateQr.dto';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';


@Controller()
export class QrController {
  
  constructor(private readonly qrService: QrService) {}

  @Post()
  buildNewQr(@Body() qrInfos: CreateQRDto): Promise<QrInterface> {
    try{
      return this.qrService.buildNewQr(qrInfos);
    }catch(err){
      throw new HttpExceptionFilter({message: err})
    }
  }

  @Get('/:id')
  getQrDetails(@Param('id') id:QrByIdInterface): Promise<QrInterface>{
    try{
      return this.qrService.getQrDetails(id);
    }catch(err){
      throw new HttpExceptionFilter({message: err})
    }
  }

  @Get('byCode/:code')
  async getQrDetailsByCode(@Param('code') code:QrByIdInterface): Promise<QrInterface | Object>{
    try{
      const response = await this.qrService.getQrDetailsByCode(code);
      const result = (!response) ? {} : response;
      return result 
      
    }catch(err){
      console.log(err);
      
      throw new HttpExceptionFilter({message: err})
    }
  }

  @Get('/:skip/:limit')
  getQrs(@Param('skip') skip:number, @Param('limit') limit:number): Promise<QrInterface[]>{
    try{
      return this.qrService.getQrs(skip, limit);
    }catch(err){
      throw new HttpExceptionFilter({message: err})
    }
  }

  @Put('/:id')
  updateQr(@Param('id') id:QrByIdInterface, @Body() qrInfos: any ): Promise<any> {
    try{
      return this.qrService.updateQr(id, qrInfos);
    }catch(err){
      throw new HttpExceptionFilter({message: err})
    }
  }

}
