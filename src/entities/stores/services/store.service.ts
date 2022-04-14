import {Inject, Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import config from '../../../config/index';
import {StoreByIdInterface} from '../interfaces/storeById.interface';
import {StoreInterface} from '../interfaces/store.interface';
import {UpdateStoreDto} from '../interfaces/dto/updateStore.dto';
import {HttpExceptionFilter} from '../../../filters/http-exception.filter';

@Injectable()
export class StoreService {
  constructor(@Inject(config.STORE_MODEL) private storeModel: Model<any>) {}

  async getStoreDetails(id: string): Promise<StoreInterface> {
    try {
      return this.storeModel.findOne({_id: id}).exec();
    } catch (err) {
      throw new HttpExceptionFilter({message: err});
    }
  }

  async getStoresByName(name: string): Promise<StoreInterface[]> {
    try {
      return this.storeModel.find({$text: {$search: name}}).exec();
    } catch (err) {
      throw new HttpExceptionFilter({message: err});
    }
  }

  async getStoresByCityAndName(city: string, name: string): Promise<StoreInterface[]> {
    try {
      return this.storeModel.find({$text: {$search: name}, city: new RegExp(city, 'i')}).exec();
    } catch (err) {
      throw new HttpExceptionFilter({message: err});
    }
  }

  async getStores(skip: number, limit: number): Promise<StoreInterface[]> {
    try {
      return this.storeModel.find({}).skip(skip).limit(limit).exec();
    } catch (err) {
      throw new HttpExceptionFilter({message: err});
    }
  }

  async getStoresByCode(code: string): Promise<StoreInterface[]> {
    try {
      return this.storeModel.findOne({code}).exec();
    } catch (err) {
      throw new HttpExceptionFilter({message: err});
    }
  }

  async getStoresByDistance(query: object, skip: number, limit: number): Promise<StoreInterface[]> {
    try {
      return this.storeModel.find(query).skip(skip).limit(limit).exec();
    } catch (err) {
      throw new HttpExceptionFilter({message: err});
    }
  }

  async updateStore(id: StoreByIdInterface, store: UpdateStoreDto): Promise<any> {
    try {
      const result = await this.storeModel.updateOne({_id: id}, {$set: store}).exec();
      return result;
    } catch (err) {
      throw new HttpExceptionFilter({message: err});
    }
  }
}
