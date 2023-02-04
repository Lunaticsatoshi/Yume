import { Entity, Column, Index } from "typeorm";
import { IsEmail, Length } from "class-validator";

import BaseModel from "./BaseModel";
import { Field } from "type-graphql";

@Entity("users")
export class User extends BaseModel {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @Field()
  @Column({ type: "uuid", unique: true })
  @Index()
  userID: string;

  @Field()
  @Index()
  @IsEmail(undefined, { message: "Must be a valid email address" })
  @Length(1, 255, { message: "Email is empty" })
  @Column({ unique: true })
  email: string;

  @Field()
  @Index()
  @Length(3, 255, { message: "Must be at least 3 characters long" })
  @Column({ unique: true })
  username: string;

  @Column({ default: "https://via.placeholder.com/200/000000/FFFFFF/?text=LL" })
  imgUrl: string;

  @Column({ default: false, type: "boolean" })
  isActive: boolean;

  @Column({ default: false, type: "boolean" })
  isVerified: boolean;

//   @OneToMany(() => Profile, (profile) => profile.user)
//   profiles: Profile[];
}