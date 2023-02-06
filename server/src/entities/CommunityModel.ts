import {
  Entity,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Field, ObjectType } from "type-graphql";

import BaseModel from './BaseModel';
import { User } from './UserModel';
import { Post } from './PostModel';
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

  @Field()
  @Column({ nullable: true })
  imageUrn: string;

  @Field()
  @Column({ nullable: true })
  bannerUrn: string;

  @Field()
  @Column()
  username: string;

  @Field(() => User)
  @ManyToOne(() => User)
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
