import { Module } from '@nestjs/common';
import { RunaiController } from './runai.controller';
import { RunaiService } from './runai.service';

@Module({
  controllers: [RunaiController],
  providers: [RunaiService]
})
export class RunaiModule {}
