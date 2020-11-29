
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if(value instanceof Object && this.isEmpty(value)) throw new HttpException('Validation failed, no body submitted', HttpStatus.BAD_REQUEST);
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new HttpException(`Validation failed: ${this.formatErrors(errors)}`, HttpStatus.BAD_REQUEST);
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatErrors(errors: any[]) {
    return errors.map(err => {
      for (let prop in err.constraints) {
        return err.constraints[prop];
      }
    }).join(', ');
  }

  private isEmpty(obj: any) {
    if (Object.keys(obj).length > 0) {
      return false;
    }
    return true;
  }
}