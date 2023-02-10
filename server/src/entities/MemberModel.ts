import {
  Entity,
  Column,
  PrimaryColumn,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType, registerEnumType } from 'type-graphql';

export enum MemberType {
  MODERATOR = 'MODERATOR',
  MEMBER = 'MEMBER',
}

registerEnumType(MemberType, {
  name: 'memberType',
  description: 'Type of the member',
});

@ObjectType()
@Entity('members')
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => MemberType)
  @Column({ default: MemberType.MEMBER })
  memberType: MemberType;

  @Field()
  @PrimaryColumn({ type: 'uuid' })
  userId: string;

  @Field()
  @PrimaryColumn({ type: 'uuid' })
  communityId: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
