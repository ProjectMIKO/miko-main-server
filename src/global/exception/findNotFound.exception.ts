import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';

export class FileNotFoundException extends NotFoundException {
  constructor() {
    super('File Not Found');
  }
}
