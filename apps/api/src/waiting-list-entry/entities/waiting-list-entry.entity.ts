import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Puppy } from '../../puppies/entities/puppy.entity';
import { WaitingList } from '../../waiting-list/entities/waiting-list.entity';

@ObjectType()
@Entity()
export class WaitingListEntry {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column({ type: 'int', nullable: true })
  position?: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: string;

  @Field(() => WaitingList)
  @ManyToOne(() => WaitingList, (waitingList) => waitingList.entries, {
    onDelete: 'CASCADE',
  })
  waitingList: WaitingList;

  @Field(() => Puppy)
  @ManyToOne(() => Puppy, (puppy) => puppy.entries, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  puppy?: Puppy;
}

