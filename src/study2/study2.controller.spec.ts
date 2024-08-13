import { Test, TestingModule } from '@nestjs/testing';
import { Study2Controller } from './study2.controller';

describe('Study2Controller', () => {
  let controller: Study2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Study2Controller],
    }).compile();

    controller = module.get<Study2Controller>(Study2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
