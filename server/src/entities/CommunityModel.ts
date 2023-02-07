import {
  Entity,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Field, ObjectType, registerEnumType } from "type-graphql";

import BaseModel from './BaseModel';
import { User } from './UserModel';
import { Post } from './PostModel';

export enum COMMUNITY_TYPE {
  PUBLIC = 'PUBLIC',
  RESTRICTED = 'RESTRICTED',
  PRIVATE = 'PRIVATE',
}

registerEnumType(COMMUNITY_TYPE, {
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

  @Field(() => COMMUNITY_TYPE)
  @Column({ type: "enum", default: COMMUNITY_TYPE.PUBLIC, enum: COMMUNITY_TYPE })
  communityType: COMMUNITY_TYPE;

  @Field()
  @Column()
  username: string;

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (post) => post.community)
  posts: Post[];

  @Field()
  imageUrl: string;

  @Field()
  bannerUrl: string;
}
