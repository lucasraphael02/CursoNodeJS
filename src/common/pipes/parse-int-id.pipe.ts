import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

//Pipes são executados logo antes dos métodos do controllers
@Injectable()
export class ParseIntIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param' || metadata.data !== 'id') {
      return value;
    }

    const parseIntValue = Number(value);

    if (isNaN(parseIntValue)) {
      throw new BadRequestException(
        'ParseIntIdPipe espera uma string numérica',
      );
    }

    if (parseIntValue < 0) {
      throw new BadRequestException(
        'ParseIntIdPipe espera uma número maior do que zero',
      );
    }

    return parseIntValue;
  }
}
