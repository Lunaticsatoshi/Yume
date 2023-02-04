import {
    Resolver,
    // Ctx,
    Query,
  } from "type-graphql";
//   import { MyContext } from "../../common/interfaces/RequestContext";
  import { User } from "../../entities/UserModel";

  @Resolver(User)
  export class UserResolver {
    @Query(() => String, { nullable: true })
    hello() {
      return "hello";
    }
  }