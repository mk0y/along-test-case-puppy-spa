import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { WaitingListEntry } from '../../waiting-list-entry/entities/waiting-list-entry.entity';

@ObjectType()
@Entity()
export class Puppy {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  ownerName: string;

  @Field()
  @Column()
  puppyName: string;

  @Field()
  @Column()
  serviceRequested: string;

  @Field()
  @Column()
  arrivalTime: string;

  @Field()
  @Column({ default: false })
  serviced: boolean;

  @OneToMany(() => WaitingListEntry, (entry) => entry.puppy, { nullable: true })
  entries?: WaitingListEntry[];
}

