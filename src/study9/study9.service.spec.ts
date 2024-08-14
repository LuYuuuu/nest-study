import { Test, TestingModule } from '@nestjs/testing';
import { Study9Service } from './study9.service';

describe('Study9Service', () => {
  let service: Study9Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Study9Service],
    }).compile();

    service = module.get<Study9Service>(Study9Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
