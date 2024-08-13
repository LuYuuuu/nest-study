import { Test, TestingModule } from '@nestjs/testing';
import { Study3Service } from './study3.service';

describe('Study3Service', () => {
  let service: Study3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Study3Service],
    }).compile();

    service = module.get<Study3Service>(Study3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
