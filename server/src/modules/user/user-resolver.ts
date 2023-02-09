import {
  Resolver,
  // Ctx,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
} from 'type-graphql';
import { RequestContext } from '../../common/interfaces/RequestContext';
import { User } from '../../entities/UserModel';
import { isAuth } from '../../common/middleware/isAuth';

import { RegisterUserInput, UserResponse } from './user-interface';
import { getUserById, createUser } from './user-service';
import { GraphQLError } from 'graphql';

@Resolver(User)
export class UserResolver {
  @Query(() => UserResponse, { nullable: true })
  @UseMiddleware(isAuth)
  async getCurrentUser(@Ctx() { user }: RequestContext): Promise<UserResponse> {
    try {
      const currentUser = await getUserById(user.id);

      if (!currentUser) {
        return {
          user: null,
          errors: [
            {
              statusCode: '404',
              message: 'user not found',
            },
          ],
        };
      }

      return {
        user: currentUser,
        errors: [],
      };
    } catch (error) {
      return {
        user: null,
        errors: [
          {
            statusCode: '500',
            message: 'Something went wrong',
          },
        ],
      };
    }
  }

  @Mutation(() => UserResponse)
  async createUser(@Arg('data') data: RegisterUserInput) {
    try {
      const createdData = await createUser(data);

      return createdData;
    } catch (error) {
      throw new GraphQLError('Error while creating user');
    }
  }
}
