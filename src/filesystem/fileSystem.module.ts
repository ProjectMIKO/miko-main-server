import { Module } from '@nestjs/common';
import { FileSystemService } from './service/fileSystem.service';
import { FileSystemController } from './controller/fileSystem.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [FileSystemController],
  providers: [FileSystemService],
})
export class FileSystemModule {}
