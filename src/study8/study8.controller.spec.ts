import { Test, TestingModule } from '@nestjs/testing';
import { Study8Controller } from './study8.controller';

describe('Study8Controller', () => {
  let controller: Study8Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Study8Controller],
    }).compile();

    controller = module.get<Study8Controller>(Study8Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
