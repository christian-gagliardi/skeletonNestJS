import * as request from 'supertest';
import {Test} from '@nestjs/testing';
import {AppModule} from '../src/app.module';
import {INestApplication} from '@nestjs/common';

describe('Store', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({imports: [AppModule]}).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET list of stores`, async () => {
    const response = await request(app.getHttpServer()).get('/api/store/list/0/5');
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(5);
    expect(response.statusCode).toBe(200);
  });

  it('/Get /details/:id', async () => {
    const response = await request(app.getHttpServer()).get(
      '/api/store/details/5f5a4faf51853f00188a333b'
    );
    expect(response.statusCode).toBe(200);
    expect(!Array.isArray(response.body));
    expect(response.body.city).toBe('Pescara');
    expect(response.body.code).toBe('4353');
    expect(response.body._id).toBe('5f5a4faf51853f00188a333b');
  });

  it('/Get /byDistance/:latitude/:longitude/:skip/:limit', async () => {
    const response = await request(app.getHttpServer()).get(
      '/api/store/byDistance/42.44786/14.20262/0/5'
    );
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body));
    expect(response.body).toHaveLength(5);
    expect(response.body[0]._id).toBe('5f5a4faf51853f00188a333b');
  });

  it('/Get /byName/:name', async () => {
    const response = await request(app.getHttpServer()).get('/api/store/byName/esposito');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body));
  });

  it('/Get /byCityAndName/:city/:name', async () => {
    const response = await request(app.getHttpServer()).get(
      '/api/store/byCityAndName/pescara/esposito'
    );
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body));
    expect(response.body).toHaveLength(1);
    expect(response.body[0]._id).toBe('5f5a4faf51853f00188a33e0');
  });

  it('/Get /byCode/:code', async () => {
    const response = await request(app.getHttpServer()).get('/api/store/byCode/4362');
    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe('5f5a4faf51853f00188a33e0');
    expect(response.body.cap).toBe('65121');
  });

  it('/Put /:id', async () => {
    const updateR = await request(app.getHttpServer())
      .put('/api/store/5f5a4faf51853f00188a333b')
      .send({city: 'PESCARa'});
    expect(updateR.statusCode).toBe(200);

    const storeUpdated = await request(app.getHttpServer()).get(
      '/api/store/details/5f5a4faf51853f00188a333b'
    );
    expect(storeUpdated.body._id).toBe('5f5a4faf51853f00188a333b');
    expect(storeUpdated.body.code).toBe('4353');
    expect(storeUpdated.body.city).toBe('PESCARa');

    const updateStore2R = await request(app.getHttpServer())
      .put('/api/store/5f5a4faf51853f00188a333b')
      .send({city: 'Pescara'});
    expect(updateStore2R.statusCode).toBe(200);

    const response = await request(app.getHttpServer()).get(
      '/api/store/details/5f5a4faf51853f00188a333b'
    );
    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe('5f5a4faf51853f00188a333b');
    expect(response.body.code).toBe('4353');
    expect(response.body.city).toBe('Pescara');
  });

  afterAll(async () => {
    await app.close();
  });
});
