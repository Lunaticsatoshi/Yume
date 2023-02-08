import { Entity, Column, JoinColumn, OneToOne } from 'typeorm';
import { Field, ObjectType, registerEnumType } from 'type-graphql';

import BaseModel from './BaseModel';
import { User } from './UserModel';
import { Community } from './CommunityModel';

export enum MemberType {
  MODERATOR = 'MODERATOR',
  MEMBER = 'MEMBER'
}

registerEnumType(MemberType, {
  name: 'memberType',
  description: 'Type of the member',
});

@ObjectType()
@Entity('members')
export class Member extends BaseModel {
  @Field(() => MemberType)
  @Column({ default: MemberType.MEMBER })
  memberType: MemberType;

  @Field()
  @Column()
  userId: string;

  @Field()
  @Column()
  name: string;

  @Field(() => User)
  @OneToOne(() => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  user: User;

  @Field(() => Community)
  @OneToOne(() => Community)
  @JoinColumn({ name: 'communityName', referencedColumnName: 'name' })
  community: Community;
}
