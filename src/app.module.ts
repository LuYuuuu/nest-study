import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Study1Controller } from './study1/study1.controller';
import { Study2Controller } from './study2/study2.controller';
import { Study2Service } from './study2/study2.service';
import { Study3Service } from './study3/study3.service';
import { Study3Controller } from './study3/study3.controller';
import { Study4Service } from './study4/study4.service';
import { Study4Controller } from './study4/study4.controller';

@Module({
  imports: [],
  controllers: [AppController, Study1Controller, Study2Controller, Study3Controller, Study4Controller],
  providers: [AppService, Study2Service, Study3Service, Study4Service],
})
export class AppModule {}
