import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Puppy } from './entities/puppy.entity';
import { CreatePuppyInput } from './dto/create-puppy.input';
import { WaitingListEntry } from 'src/waiting-list-entry/entities/waiting-list-entry.entity';

@Injectable()
export class PuppiesService {
  constructor(
    @InjectRepository(Puppy)
    private puppyRepo: Repository<Puppy>,
    @InjectRepository(WaitingListEntry)
    private waitingListEntryRepo: Repository<WaitingListEntry>,
  ) {}

  async create(
    createPuppyInput: CreatePuppyInput,
    waitingListId: number,
  ): Promise<Puppy> {
    const puppy = this.puppyRepo.create({
      ...createPuppyInput,
    });
    const waitingListEntry = await this.waitingListEntryRepo.findOneBy({
      id: waitingListId,
    });
    if (!waitingListEntry)
      throw new NotFoundException('Waiting list not found');
    await this.puppyRepo.save(puppy);
    await this.waitingListEntryRepo.update({ id: waitingListId }, { puppy });
    return puppy;
  }

  async findAll(): Promise<Puppy[]> {
    return this.puppyRepo.find();
  }

  async createPuppies(puppies: CreatePuppyInput[]): Promise<Puppy[]> {
    const puppiesToCreate = puppies.map((puppy) =>
      this.puppyRepo.create({
        ...puppy,
      }),
    );
    return this.puppyRepo.save(puppiesToCreate);
  }

  async markAsServiced(id: number): Promise<Puppy> {
    const puppy = await this.puppyRepo.findOneBy({ id });
    if (!puppy) throw new NotFoundException('Puppy not found');
    puppy.serviced = true;
    return this.puppyRepo.save(puppy);
  }
}
