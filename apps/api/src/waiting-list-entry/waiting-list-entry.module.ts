import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaitingListEntry } from './entities/waiting-list-entry.entity';
import { WaitingListEntryService } from './waiting-list-entry.service';
import { WaitingListEntryResolver } from './waiting-list-entry.resolver';
import { Puppy } from '../puppies/entities/puppy.entity';
import { WaitingList } from '../waiting-list/entities/waiting-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WaitingListEntry, Puppy, WaitingList])],
  providers: [WaitingListEntryService, WaitingListEntryResolver],
  exports: [WaitingListEntryService],
})
export class WaitingListEntryModule {}
