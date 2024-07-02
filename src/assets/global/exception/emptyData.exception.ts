import { BadRequestException } from '@nestjs/common';

export class EmptyDataException extends BadRequestException {}
