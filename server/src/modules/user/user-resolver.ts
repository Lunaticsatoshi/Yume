import {
  Resolver,
  // Ctx,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
} from 'type-graphql';

import { UserErrors, GeneralErrors } from './../../common/enums/errors.enum';
import { RequestContext } from '../../common/interfaces/RequestContext';
import { User } from '../../entities/UserModel';
import { isAuth } from '../../common/middleware/isAuth';

import { RegisterUserInput, UserResponse } from './user-interface';
import { getUserById, getUsers, createUser } from './user-service';
import { GraphQLError } from 'graphql';

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async getCurrentUser(@Ctx() { user }: RequestContext): Promise<User> {
    try {
      const currentUser = await getUserById(user.id);

      if (!currentUser) {
        throw new Error(UserErrors.GetUser);
      }

      return currentUser;
    } catch (error) {
      switch(error.message) {
        case UserErrors.GetUser:
          throw new GraphQLError(UserErrors.GetUser);
        default:
          throw new GraphQLError(GeneralErrors.SERVER);
      }
    }
  }

  @Query(() => [User], { nullable: true })
  async getAllUsers(): Promise<User[]> {
    try {
      const users = await getUsers();

      if (!users || users.length < 0) {
        throw new Error("Users not found!");
      }

      return users;
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }

  @Mutation(() => UserResponse)
  async createUser(@Arg('data') data: RegisterUserInput) {
    try {
      const createdData = await createUser(data);

      return createdData;
    } catch (error) {
      throw new GraphQLError(UserErrors.CreateUser);
    }
  }
}
