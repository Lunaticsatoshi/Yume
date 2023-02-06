import {
  Entity,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Field } from "type-graphql";

import BaseModel from './BaseModel';
import { User } from './UserModel';
import { Post } from './PostModel';

@Entity('communities')
export class Community extends BaseModel {
  constructor(sub: Partial<Community>) {
    super();
    Object.assign(this, sub);
  }

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
