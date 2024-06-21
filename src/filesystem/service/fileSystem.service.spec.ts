import { Test, TestingModule } from '@nestjs/testing';
import { FileSystemService } from './fileSystem.service';

describe('VoiceService', () => {
  let service: FileSystemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileSystemService],
    }).compile();

    service = module.get<FileSystemService>(FileSystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});