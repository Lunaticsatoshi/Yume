import {
  Resolver,
  // Ctx,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
  FieldResolver,
  Root,
} from 'type-graphql';

import { UserErrors, GeneralErrors } from '../../common/enums/errors.enum';
import { RequestContext } from '../../common/interfaces/RequestContext';
import { User } from '../../entities/UserModel';
import { isStrictAuth } from '../../common/middleware/isAuth';

import { RegisterUserInput, UserResponse } from './user.interface';
import { getUserById, getUsers, createUser } from './user.service';
import { GraphQLError } from 'graphql';

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  @UseMiddleware(isStrictAuth)
  async getCurrentUser(@Ctx() { user }: RequestContext): Promise<User> {
    try {
      console.log('Getting current user', { user });
      const currentUser = await getUserById(user.id);

      if (!currentUser) {
        throw new Error(UserErrors.GetUser);
      }

      return currentUser;
    } catch (error) {
      switch (error.message) {
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
        throw new Error('Users not found!');
      }

      return users;
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }

  @Mutation(() => UserResponse)
  async createUser(@Arg('data') data: RegisterUserInput) {
    try {
      console.log('Creating user', { data });
      const createdData = await createUser(data);

      return createdData;
    } catch (error) {
      throw new GraphQLError(UserErrors.CreateUser);
    }
  }

  @FieldResolver(() => String)
  profileUrl(@Root() user: User): string {
    try {
      if (!user.profilePicUrn) {
        return 'https://via.placeholder.com/200/000000/FFFFFF/?text=LL';
      }

      return user.profilePicUrn;
    } catch (error) {
      console.error('Error resolving profile pic: ', { error });

      return 'https://via.placeholder.com/200/000000/FFFFFF/?text=LL';
    }
  }
}
