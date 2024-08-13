import { Test, TestingModule } from '@nestjs/testing';
import { Study4Controller } from './study4.controller';

describe('Study4Controller', () => {
  let controller: Study4Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Study4Controller],
    }).compile();

    controller = module.get<Study4Controller>(Study4Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
