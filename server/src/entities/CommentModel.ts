import {
  Entity,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { Field } from 'type-graphql';

import { makeId } from '../common/utils/random-data-generator';
import BaseModel from './BaseModel';
import { User } from './UserModel';
import { Post } from './PostModel';
import { Vote } from './VoteModel';

@Entity('comments')
export class Comment extends BaseModel {
  constructor(sub: Partial<Comment>) {
    super();
    Object.assign(this, sub);
  }

  @Field()
  @Index()
  @Column()
  identifier: string;

  @Field()
  @Column()
  body: string;

  @Field()
  @Column()
  username: string;

  @Field(() => User)
  @ManyToOne(() => User)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.comments, { nullable: false })
  post: Post;

  @Field(() => [Vote], { nullable: true })
  @OneToMany(() => Vote, (vote) => vote.comment)
  votes: Vote[];

  @BeforeInsert()
  makeIdAndSlug() {
    this.identifier = makeId(8);
  }
}
