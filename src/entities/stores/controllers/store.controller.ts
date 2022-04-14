import {Body, Controller, Get, Param, Put} from '@nestjs/common';
import {StoreService} from '../services/store.service';
import {StoreByIdInterface} from '../interfaces/storeById.interface';
import {StoreInterface} from '../interfaces/store.interface';
import {HttpExceptionFilter} from '../../../filters/http-exception.filter';
import {UpdateStoreDto} from '../interfaces/dto/updateStore.dto';

@Controller()
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get('/details/:id')
  getStoreDetails(@Param('id') id: string): Promise<StoreInterface> {
    try {
      return this.storeService.getStoreDetails(id);
    } catch (err) {
      throw new HttpExceptionFilter({message: err});
    }
  }

  @Get('/list/:skip/:limit')
  async getStores(
    @Param('skip') skip: number,
    @Param('limit') limit: number
  ): Promise<StoreInterface[]> {
    try {
      return await this.storeService.getStores(skip, limit);
    } catch (err) {
      throw new HttpExceptionFilter({message: err});
    }
  }

  @Get('/byDistance/:latitude/:longitude/:skip/:limit')
  async getStoresByDistance(
    @Param('longitude') longitude: number,
    @Param('latitude') latitude: number,
    @Param('skip') skip: number,
    @Param('limit') limit: number
  ): Promise<StoreInterface[]> {
    const query = {
      location: {
        $nearSphere: {
          $geometry: {type: 'Point', coordinates: [longitude, latitude]},
          $minDistance: 0,
          $maxDistance: 30000
        }
      }
    };
    try {
      return this.storeService.getStoresByDistance(query, skip, limit);
    } catch (err) {
      throw new HttpExceptionFilter({message: err});
    }
  }

  @Get('/byName/:name')
  async getStoresByName(@Param('name') name: string): Promise<StoreInterface[]> {
    try {
      const result = await this.storeService.getStoresByName(name);
      return result;
    } catch (err) {
      throw new HttpExceptionFilter({message: err});
    }
  }

  @Get('/byCityAndName/:city/:name')
  async getStoresByCityAndName(
    @Param('city') city: string,
    @Param('name') name: string
  ): Promise<StoreInterface[]> {
    try {
      const result = await this.storeService.getStoresByCityAndName(city, name);
      return result;
    } catch (err) {
      throw new HttpExceptionFilter({message: err});
    }
  }

  @Get('/byCode/:code')
  async getStoresByCode(@Param('code') code: string): Promise<StoreInterface[]> {
    try {
      const result = await this.storeService.getStoresByCode(code);
      return result;
    } catch (err) {
      throw new HttpExceptionFilter({message: err});
    }
  }

  @Put('/:id')
  updateStore(@Param('id') id: StoreByIdInterface, @Body() store: UpdateStoreDto): Promise<any> {
    try {
      return this.storeService.updateStore(id, store);
    } catch (err) {
      throw new HttpExceptionFilter({message: err});
    }
  }
}
