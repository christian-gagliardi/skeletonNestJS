import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import config from '../../../config/index';

import * as QRCode from 'qrcode';

import { QrByIdInterface } from'../interfaces/qrById.interface';
import { QrInterface } from '../interfaces/qr.interface';
import { CreateQRDto } from '../interfaces/dto/createQr.dto';
import { UpdateQRDto } from '../interfaces/dto/updateQr.dto';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';


@Injectable()
export class QrService {
  constructor(
    @Inject(config.QR_MODEL) private qrModel: Model<any>,
    @Inject(config.STORE_MODEL) private storeModel: Model<any>
  ) {}
  
  async buildNewQr(createQr:CreateQRDto): Promise<any>{
    try{      
      const qrCode = await this.storeModel.findOne({_id : createQr.storeOwner}, {code:1});
      if(!qrCode) throw new HttpExceptionFilter({message: 'buildNewQr: Store not found'});

      const context = {
        qrImage       : await this.#generateQr(`${process.env.BASE_URL}${qrCode.code}`),
        code          : qrCode.code,
        redirectUrl   : (createQr.redirectUrl.indexOf('https') == -1) ? `https://${createQr.redirectUrl}`: createQr.redirectUrl ,
        shortUrl      : `${process.env.BASE_URL}${qrCode.code}`,
        note          : createQr.note,
        locked          : (createQr.locked) ? createQr.locked : false,
        isPhaRedirect : (createQr.redirectUrl.indexOf(process.env.PHA_BASE_URL) > -1) ? true : false,
        storeOwner    : createQr.storeOwner,
      };
      
      const qr = new this.qrModel(context);
      const response = await qr.save();
      return response;
    }catch(err){
      console.log(err)
      throw new HttpExceptionFilter({message: err})
    }
  }

  async getQrDetails(id: QrByIdInterface): Promise<QrInterface> {
    try {
      return this.qrModel.findOne({_id:id}).exec();
    } catch (err) {
      console.log(err)
      throw new HttpExceptionFilter({message: err})
    }
  }

  async getQrDetailsByCode(code: QrByIdInterface): Promise<QrInterface> {
    try {
      return this.qrModel.findOne({code:code}).exec();
    } catch (err) {
      console.log(err)
      throw new HttpExceptionFilter({message: err})
    }
  }

  async getQrs(skip: number, limit: number): Promise<QrInterface[]>{
    try {
      return this.qrModel.find().skip(skip).limit(limit).exec();
    } catch (err) {
      console.log(err)
      throw new HttpExceptionFilter({message: err})
    }
  }

  async updateQr(id: QrByIdInterface, qr: UpdateQRDto): Promise<any> {
    try {
      
      const savedQr = await this.qrModel.findOne({_id: id, locked: false}, {code : 1}).exec();
      if(!savedQr) throw new HttpExceptionFilter({message: 'Qr not found or locked'});

      const context = {
        redirectUrl   : qr.redirectUrl,
        note          : qr.note,
        isPhaRedirect : (qr.redirectUrl.indexOf(process.env.PHA_BASE_URL) > -1) ? true : false,
        qrImage       : await this.#generateQr(`${process.env.BASE_URL}${savedQr.code}`),
        locked        : qr.locked
      }

      await this.qrModel.updateOne({_id: id}, {$set: context}).exec();
      
      return context.qrImage;
    } catch (err) {
      console.log(err)
      throw new HttpExceptionFilter({message: err})
    }
  }

  #generateQr (redirectUrl:string){
    return QRCode.toDataURL(redirectUrl)
  }
}
