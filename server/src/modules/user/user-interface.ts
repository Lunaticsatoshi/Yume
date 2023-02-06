import { IsEmail, Length } from 'class-validator';
import { InputType, Field, ObjectType } from 'type-graphql';
import { ErrorResponse } from '../../common/objects/error';
import { User } from '../../entities/UserModel';

@InputType()
export class RegisterUserInput {
  @IsEmail(undefined, { message: 'Must be a valid email address' })
  @Length(1, 255, { message: 'Email is empty' })
  @Field()
  email: string;

  @Field()
  username: string;

  @Length(3, 255, { message: 'Password Must be at least 3 characters long' })
  @Field()
  password: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => [ErrorResponse], { nullable: true })
  errors?: ErrorResponse[];

  @Field(() => User, { nullable: true })
  user?: User;
}
