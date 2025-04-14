import { Module } from '@nestjs/common';
import { PuppiesService } from './puppies.service';
import { PuppiesResolver } from './puppies.resolver';
import { Puppy } from './entities/puppy.entity';
import { WaitingListEntry } from '../waiting-list-entry/entities/waiting-list-entry.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Puppy, WaitingListEntry])],
  providers: [PuppiesResolver, PuppiesService],
})
export class PuppiesModule {}
