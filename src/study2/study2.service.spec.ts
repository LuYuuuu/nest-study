import { Test, TestingModule } from '@nestjs/testing';
import { Study2Service } from './study2.service';

describe('Study2Service', () => {
  let service: Study2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Study2Service],
    }).compile();

    service = module.get<Study2Service>(Study2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
