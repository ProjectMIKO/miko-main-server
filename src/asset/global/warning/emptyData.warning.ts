import { BadRequestException } from '@nestjs/common';

export class EmptyDataWarning extends BadRequestException {
}
