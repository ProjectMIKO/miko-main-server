import { Test, TestingModule } from '@nestjs/testing';
import { FileSystemController } from './fileSystem.controller';
import { FileSystemService } from '../service/fileSystem.service';

describe('VoiceController', () => {
  let controller: FileSystemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileSystemController],
      providers: [FileSystemService],
    }).compile();

    controller = module.get<FileSystemController>(FileSystemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
