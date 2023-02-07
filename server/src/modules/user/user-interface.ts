import { IsEmail, Length } from 'class-validator';
import { InputType, Field, ObjectType } from 'type-graphql';
import { ErrorResponse } from '../../common/objects/error';
import { User, AUTH_TYPE } from '../../entities/UserModel';

@InputType()
export class RegisterUserInput {
  @IsEmail(undefined, { message: 'Must be a valid email address' })
  @Length(1, 255, { message: 'Email is empty' })
  @Field()
  email: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  password?: string;

  @Field(() => AUTH_TYPE, { defaultValue: AUTH_TYPE.EMAIL_AND_PASSWORD })
  authType: AUTH_TYPE;
}

@ObjectType()
export class UserResponse {
  @Field(() => [ErrorResponse], { nullable: true })
  errors?: ErrorResponse[];

  @Field(() => User, { nullable: true })
  user?: User;
}
