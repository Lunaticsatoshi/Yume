import { Entity, Column, Index, OneToMany } from 'typeorm';
import { IsEmail, Length } from 'class-validator';

import BaseModel from './BaseModel';
import { Post } from './PostModel';
import { Vote } from './VoteModel';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity('users')
export class User extends BaseModel {
  @Field()
  @Column({ type: 'uuid', unique: true })
  @Index()
  userId: string;

  @Field()
  @Index()
  @IsEmail(undefined, { message: 'Must be a valid email address' })
  @Length(1, 255, { message: 'Email is empty' })
  @Column({ unique: true })
  email: string;

  @Field()
  @Index()
  @Length(3, 255, { message: 'Must be at least 3 characters long' })
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Field()
  @Column()
  profilePicUrn: string;

  @Field({
    defaultValue: 'https://via.placeholder.com/200/000000/FFFFFF/?text=LL',
  })
  profileUrl: string;

  @Field()
  @Column({ default: false, type: 'boolean' })
  isActive: boolean;

  @Field()
  @Column({ default: false, type: 'boolean' })
  isVerified: boolean;

  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @Field(() => [Vote], { nullable: true })
  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];
}
