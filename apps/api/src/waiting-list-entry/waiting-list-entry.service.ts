import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WaitingListEntry } from './entities/waiting-list-entry.entity';
import { CreateWaitingListEntryInput } from './dto/create-waiting-list-entry.input';
import { WaitingList } from 'src/waiting-list/entities/waiting-list.entity';

@Injectable()
export class WaitingListEntryService {
  constructor(
    @InjectRepository(WaitingListEntry)
    private entriesRepo: Repository<WaitingListEntry>,
    @InjectRepository(WaitingList)
    private waitingListRepo: Repository<WaitingList>,
  ) {}

  async findAll(): Promise<WaitingListEntry[]> {
    return this.entriesRepo.find({
      relations: ['puppy', 'waitingList'],
      order: { position: 'ASC' },
    });
  }

  async findByWaitingListId(
    waitingListId: number,
  ): Promise<WaitingListEntry[]> {
    return this.entriesRepo.find({
      relations: ['puppy', 'waitingList'],
      where: { waitingList: { id: waitingListId } },
      order: { position: 'ASC' },
    });
  }

  async create(
    createWaitingListEntryInput: CreateWaitingListEntryInput,
    waitingListId: number,
  ): Promise<WaitingListEntry> {
    const waitingList = await this.waitingListRepo.findOneBy({
      id: waitingListId,
    });
    if (!waitingList) throw new NotFoundException('Waiting list not found');

    const waitingListEntry = this.entriesRepo.create({
      ...createWaitingListEntryInput,
      waitingList,
    });

    return this.entriesRepo.save(waitingListEntry);
  }

  async updatePosition(
    id: number,
    newPosition: number,
  ): Promise<WaitingListEntry> {
    const entry = await this.entriesRepo.findOneByOrFail({ id });
    entry.position = newPosition;
    return this.entriesRepo.save(entry);
  }

  async markAsServiced(id: number): Promise<void> {
    await this.entriesRepo.delete(id);
  }
}
