import { Test, TestingModule } from '@nestjs/testing';
import { Study3Controller } from './study3.controller';

describe('Study3Controller', () => {
  let controller: Study3Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Study3Controller],
    }).compile();

    controller = module.get<Study3Controller>(Study3Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
