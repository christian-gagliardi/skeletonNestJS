import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus} from '@nestjs/common';
import {Response} from 'express';
import Logger from '../config/logger/log';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(public message?: object) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    console.log(this.message);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url
    });

    Logger.error(
      `statusCode: ${status}, timestamp: ${new Date().toISOString()}, path: ${request.url},`
    );
  }
}
export default HttpExceptionFilter;
