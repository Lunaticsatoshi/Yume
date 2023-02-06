import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Field, ObjectType, registerEnumType } from 'type-graphql';

import BaseModel from './BaseModel';
import { User } from './UserModel';
import { Post } from './PostModel';
import { Comment } from './CommentModel';

export enum VOTE_TYPE {
  UPVOTE = 'UPVOTE',
  DOWNVOTE = 'DOWNVOTE',
}

registerEnumType(VOTE_TYPE, {
  name: 'voteType',
  description: 'Type of the vote',
});
@ObjectType()
@Entity('votes')
export class Vote extends BaseModel {
  @Field(() => VOTE_TYPE)
  @Column({ type: "enum", default: VOTE_TYPE.UPVOTE, enum: VOTE_TYPE })
  voteType: VOTE_TYPE;

  @Field(() => User)
  @ManyToOne(() => User)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @Field()
  @Column()
  username: string;

  @Field(() => Post)
  @ManyToOne(() => Post)
  post: Post;

  @Field(() => Comment)
  @ManyToOne(() => Comment)
  comment: Comment;
}
