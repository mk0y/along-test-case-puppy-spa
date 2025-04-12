import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaitingList } from './entities/waiting-list.entity';
import { WaitingListEntry } from '../waiting-list-entry/entities/waiting-list-entry.entity';
import { WaitingListService } from './waiting-list.service';
import { WaitingListResolver } from './waiting-list.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([WaitingList, WaitingListEntry])],
  providers: [WaitingListResolver, WaitingListService],
})
export class WaitingListModule { }

