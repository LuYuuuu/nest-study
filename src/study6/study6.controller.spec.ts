import { Test, TestingModule } from '@nestjs/testing';
import { Study6Controller } from './study6.controller';

describe('Study6Controller', () => {
  let controller: Study6Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Study6Controller],
    }).compile();

    controller = module.get<Study6Controller>(Study6Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
