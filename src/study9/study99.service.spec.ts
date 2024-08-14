import { Test, TestingModule } from '@nestjs/testing';
import { Study99Service } from '../study9/study99.service';

describe('Study99Service', () => {
  let service: Study99Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Study99Service],
    }).compile();

    service = module.get<Study99Service>(Study99Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
