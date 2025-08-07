import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // เงื่อนไขจาก query error ถ้าเจอก็เอามาใส่ได้อีก
    // let message = "QueryFailedError: Query error";
    const message = exception.message;
    // if (exception.message.includes('Cannot insert the value NULL')) {
    //   message = 'Invalid data: Cannot insert the value NULL';
    // } else if (exception.message.includes('duplicate key value violates unique constraint')) {
    //   message = 'Duplicate key error: A record with this value already exists';
    // } else if (exception.message.includes('foreign key constraint')) {
    //   message = 'Foreign key error: The specified foreign key does not exist';
    // }
    console.log('QueryFailedError:', exception.message);
    // สามารถเพิ่มเงื่อนไขอื่น ๆ ได้อีก

    const errorResponse = {
      statusCode: HttpStatus.BAD_REQUEST,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    };

    response.status(HttpStatus.BAD_REQUEST).json(errorResponse);
  }
}
