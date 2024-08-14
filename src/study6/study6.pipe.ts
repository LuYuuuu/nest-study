import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class Study6Pipe implements PipeTransform {
  // value 就是接口传过来的值
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('我是管道输出 :>> ', value);
    value.id = 100;
    return value;
  }
}
