import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
  } from '@nestjs/common';
  import { validate } from 'class-validator';
  import { plainToInstance } from 'class-transformer';
  
  @Injectable()
  export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
      if (!metatype || !this.toValidate(metatype)) {
        return value;
      }
  
      if (typeof value === 'string') {
        try {
          value = JSON.parse(value);
        } catch (error) {
          throw new BadRequestException('Invalid JSON format');
        }
      }
  
      const object = plainToInstance(metatype, value);
      const errors = await validate(object);
      // console.log(errors);
      if (errors.length > 0) {
        const errorMessages = errors
          .map((err) => {
            return Object.values(err.constraints ?? {}).join(', ');
          })
          .join('; ');
        throw new BadRequestException(`Validation failed: ${errorMessages}`);
      }
      return value; 
    }
  
    private toValidate(metatype: Function): boolean {
      const types: Function[] = [String, Boolean, Number, Array, Object];
      return !types.includes(metatype);
    }
  }