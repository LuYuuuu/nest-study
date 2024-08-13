import { Test, TestingModule } from '@nestjs/testing';
import { Study1Controller } from './study1.controller';

describe('Study1Controller', () => {
  let controller: Study1Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Study1Controller],
    }).compile();

    controller = module.get<Study1Controller>(Study1Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
