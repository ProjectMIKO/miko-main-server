import { HttpException, HttpStatus } from '@nestjs/common';

export class FileNotFoundException extends HttpException {
  constructor() {
    super('File Not Found', HttpStatus.BAD_REQUEST);
  }
}
