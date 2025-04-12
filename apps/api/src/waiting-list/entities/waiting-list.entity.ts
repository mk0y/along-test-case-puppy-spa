import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { WaitingListEntry } from '../../waiting-list-entry/entities/waiting-list-entry.entity';

@ObjectType()
@Entity()
export class WaitingList {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'date' })
  date: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @OneToMany(() => WaitingListEntry, (entry) => entry.waitingList)
  entries: WaitingListEntry[];
}

