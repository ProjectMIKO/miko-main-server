import { Test, TestingModule } from '@nestjs/testing';
import { S3Controller } from './s3.controller';
import { S3Service } from '../service/s3.service';

describe('VoiceController', () => {
  let controller: S3Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [S3Controller],
      providers: [S3Service],
    }).compile();

    controller = module.get<S3Controller>(S3Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
