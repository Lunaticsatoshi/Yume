import {
  Resolver,
  // Ctx,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
} from 'type-graphql';
  import { RequestContext } from "../../common/interfaces/RequestContext";
import { User } from '../../entities/UserModel';
import { isAuth } from '../../common/middleware/isAuth';

import { RegisterUserInput, UserResponse } from './user-interface';
import { createUser } from './user-service';

@Resolver(User)
export class UserResolver {
  @Query(() => String, { nullable: true })
  @UseMiddleware(isAuth)
  getCurrentUser(@Ctx() { payload }: RequestContext) {
    console.log(payload);

    return 'hello';
  }

  @Mutation(() => UserResponse)
  async createUser(@Arg('data') data: RegisterUserInput) {
    const createdData = await createUser(data);

    return createdData;
  }
}
