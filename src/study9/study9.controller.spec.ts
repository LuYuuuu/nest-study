import { Test, TestingModule } from '@nestjs/testing';
import { Study9Controller } from './study9.controller';

describe('Study9Controller', () => {
  let controller: Study9Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Study9Controller],
    }).compile();

    controller = module.get<Study9Controller>(Study9Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
