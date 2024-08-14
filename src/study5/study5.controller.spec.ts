import { Test, TestingModule } from '@nestjs/testing';
import { Study5Controller } from './study5.controller';

describe('Study5Controller', () => {
  let controller: Study5Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Study5Controller],
    }).compile();

    controller = module.get<Study5Controller>(Study5Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
