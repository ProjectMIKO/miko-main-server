import { Test, TestingModule } from '@nestjs/testing';
import { VertexController } from './vertex.controller';
import { VertexService } from '../service/vertex.service';

describe('NodeController', () => {
  let controller: VertexController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VertexController],
      providers: [VertexService],
    }).compile();

    controller = module.get<VertexController>(VertexController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
