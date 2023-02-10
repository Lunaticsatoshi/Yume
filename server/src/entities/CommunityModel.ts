import {
  Entity,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Field, ObjectType, registerEnumType } from "type-graphql";

import BaseModel from './BaseModel';
import { User } from './UserModel';
import { Post } from './PostModel';

export enum CommunityType {
  PUBLIC = 'PUBLIC',
  RESTRICTED = 'RESTRICTED',
  PRIVATE = 'PRIVATE',
}

registerEnumType(CommunityType, {
  name: 'communityType',
  description: 'Type of the community',
});
@ObjectType()
@Entity('communities')
export class Community extends BaseModel {
  @Field()
  @Index()
  @Column({ unique: true })
  name: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column({ type: 'text', nullable: true })
  description: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  imageUrn: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  bannerUrn: string;

  @Field(() => CommunityType)
  @Column({ default: CommunityType.PUBLIC })
  communityType: CommunityType;

  @Field()
  @Column()
  userId: string;

  @Column()
  username: string;

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'userId', referencedColumnName: '_id' })
  creator: User;

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User, (user) => user.communities, { onDelete: "CASCADE" })
  members: User[];

  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (post) => post.community)
  posts: Post[];

  @Field({ nullable: true })
  imageUrl?: string;

  @Field({ nullable: true })
  bannerUrl?: string;
}
