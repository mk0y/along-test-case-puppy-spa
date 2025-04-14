import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WaitingList } from './entities/waiting-list.entity';
import { WaitingListEntry } from '../waiting-list-entry/entities/waiting-list-entry.entity';
import { CreateWaitingListInput } from './dto/create-waiting-list.input';

@Injectable()
export class WaitingListService {
  constructor(
    @InjectRepository(WaitingList)
    private waitingListRepo: Repository<WaitingList>,

    @InjectRepository(WaitingListEntry)
    private entriesRepo: Repository<WaitingListEntry>,
  ) {}

  async create(input: CreateWaitingListInput): Promise<WaitingList> {
    const { date } = input;
    const createdAt = new Date();

    const waitingList = this.waitingListRepo.create({ date, createdAt });
    await this.waitingListRepo.save(waitingList);

    return { ...waitingList };
  }

  async createWaitingLists(
    waitingLists: CreateWaitingListInput[],
  ): Promise<WaitingList[]> {
    const waitingListsToCreate = waitingLists.map((waitingList) =>
      this.waitingListRepo.create({
        ...waitingList,
      }),
    );
    return this.waitingListRepo.save(waitingListsToCreate);
  }

  findAll(): Promise<WaitingList[]> {
    return this.waitingListRepo.find();
  }

  async findByDate(date: string): Promise<WaitingList> {
    const waitingList = await this.waitingListRepo.findOne({
      where: { date },
    });
    if (!waitingList) {
      throw new NotFoundException('Waiting list not found');
    }
    return waitingList;
  }

  async getEntries(): Promise<WaitingListEntry[]> {
    return this.entriesRepo.find({
      relations: ['waitingList'],
      order: { position: 'ASC' },
    });
  }
}
