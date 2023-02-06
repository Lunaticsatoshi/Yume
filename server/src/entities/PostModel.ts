import {
  Entity,
  Column,
  Index,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Field } from 'type-graphql';

import { makeId, slugify } from '../common/utils/random-data-generator';
import BaseModel from './BaseModel';
import { User } from './UserModel';
import { Community } from './CommunityModel';
import { Comment } from './CommentModel';
import { Vote } from './VoteModel';

@Entity('posts')
export class Post extends BaseModel {
  constructor(post: Partial<Post>) {
    super();
    Object.assign(this, post);
  }

  @Field()
  @Index()
  @Column()
  identifier: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Index()
  @Column()
  slug: string;

  @Field()
  @Column({ nullable: true, type: 'text' })
  body: string;

  @Field()
  @Column()
  communityName: string;

  @Field()
  @Column()
  username: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @Field(() => Community)
  @ManyToOne(() => Community, (community) => community.posts)
  @JoinColumn({ name: 'communityName', referencedColumnName: 'name' })
  community: Community;

  @Field(() => User)
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @Field(() => Vote)
  @OneToMany(() => Vote, (vote) => vote.post)
  votes: Vote[];

  @Field()
  @Column()
  voteCount: number;

  @Field()
  @Column()
  commentCount: number;

  @Field()
  url: string;

  @BeforeInsert()
  makeIdAndSlug() {
    this.identifier = makeId(7);
    this.slug = slugify(this.title);
  }
}
