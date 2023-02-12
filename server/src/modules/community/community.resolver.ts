import {
  Resolver,
  Ctx,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  FieldResolver,
  Root,
} from 'type-graphql';
import { GraphQLError } from 'graphql';

import {
  AuthErrors,
  CommunityErrors,
  GeneralErrors,
} from './../../common/enums/errors.enum';
import { RequestContext } from '../../common/interfaces/RequestContext';
import { Community } from '../../entities/CommunityModel';
import { isAuth, isStrictAuth } from '../../common/middleware/isAuth';
import { SuccessResponse } from '../../common/objects/success';

import {
  getCommunityByName,
  getCommunities,
  createCommunity,
  updateCommunity,
  updateCommunityProfile,
  joinCommunity,
  leaveCommunity,
  deleteCommunity,
} from './community.service';
import {
  CreateCommunityResponse,
  CreateCommunityInput,
  GetCommunityDataResponse,
  UpdateCommunityInput,
  UpdateCommunityProfile,
} from './community.interface';

@Resolver(Community)
export class CommunityResolver {
  @Query(() => [Community], { nullable: true })
  async getCommunities(): Promise<Community[]> {
    try {
      console.log('Getting all communities');
      const communities = await getCommunities();

      if (!communities || communities.length < 0) {
        throw new Error('Error: communities not found!');
      }

      return communities;
    } catch (error) {
      console.log('Error getting communities', { error, name });
      throw new GraphQLError(error.message);
    }
  }

  @Query(() => GetCommunityDataResponse)
  @UseMiddleware(isAuth)
  async getCommunityByName(
    @Arg('name') name: string,
    @Ctx() { user }: RequestContext,
  ): Promise<GetCommunityDataResponse> {
    try {
      const communityResponse = await getCommunityByName(name, user);

      return communityResponse;
    } catch (error) {
      console.log('Error getting community data by name', { error, name });
      switch (error.message) {
        case CommunityErrors.GetCommunity:
          throw new GraphQLError(CommunityErrors.GetCommunity);
          case AuthErrors.NotAuthorized:
            throw new GraphQLError(AuthErrors.NotAuthorized);
        default:
          throw new GraphQLError(GeneralErrors.SERVER);
      }
    }
  }

  @Mutation(() => CreateCommunityResponse)
  @UseMiddleware(isStrictAuth)
  async createCommunity(
    @Arg('data') data: CreateCommunityInput,
    @Ctx() { user }: RequestContext,
  ): Promise<CreateCommunityResponse> {
    try {
      console.log('Creating community', { user, data });
      const createdData = await createCommunity(user.id, data);

      return createdData;
    } catch (error) {
      console.log('Unable to create community', { error });
      throw new GraphQLError(CommunityErrors.CreateCommunity);
    }
  }

  @Mutation(() => CreateCommunityResponse)
  @UseMiddleware(isStrictAuth)
  async updateCommunity(
    @Arg('communityId') communityId: string,
    @Arg('data') data: UpdateCommunityInput,
    @Ctx() { user }: RequestContext,
  ): Promise<CreateCommunityResponse> {
    try {
      console.log('Updating community', { user, data });
      const updatedData = await updateCommunity(communityId, user.id, data);

      return updatedData;
    } catch (error) {
      console.log('Unable to update community', { error, name });
      switch (error.message) {
        case CommunityErrors.NotCommunityCreator:
          throw new GraphQLError(CommunityErrors.NotCommunityCreator);
        default:
          throw new GraphQLError(CommunityErrors.UpdateCommunity);
      }
    }
  }

  @Mutation(() => CreateCommunityResponse)
  @UseMiddleware(isStrictAuth)
  async updateCommunityProfile(
    @Arg('communityId') communityId: string,
    @Arg('data') data: UpdateCommunityProfile,
    @Ctx() { user }: RequestContext,
  ): Promise<CreateCommunityResponse> {
    try {
      console.log('Updating community profile', { user, data });
      const updatedData = await updateCommunityProfile(communityId, user.id, data);

      return updatedData;
    } catch (error) {
      console.log('Unable to update community profile', { error, name });
      switch (error.message) {
        case CommunityErrors.NotCommunityCreator:
          throw new GraphQLError(CommunityErrors.NotCommunityCreator);
        default:
          throw new GraphQLError(CommunityErrors.UpdateCommunity);
      }
    }
  }

  @Mutation(() => Community)
  @UseMiddleware(isStrictAuth)
  async joinCommunity(
    @Arg('communityId') communityId: string,
    @Ctx() { user }: RequestContext,
  ): Promise<Community> {
    try {
      console.log('Joining community', { user, communityId });
      const updatedData = await joinCommunity(communityId, user.id);

      return updatedData;
    } catch (error) {
      console.log('Unable to join community', { error, name });
      switch (error.message) {
        case CommunityErrors.AlreadyInCommunity:
          throw new GraphQLError(CommunityErrors.AlreadyInCommunity);
        default:
          throw new GraphQLError(CommunityErrors.JoinCommunity);
      }
    }
  }

  @Mutation(() => Community)
  @UseMiddleware(isStrictAuth)
  async leaveCommunity(
    @Arg('communityId') communityId: string,
    @Ctx() { user }: RequestContext,
  ): Promise<Community> {
    try {
      console.log('leaving community', { user, communityId });
      const updatedData = await leaveCommunity(communityId, user.id);

      return updatedData;
    } catch (error) {
      console.log('Unable to leave community', { error, name });
      switch (error.message) {
        case CommunityErrors.NotInCommunity:
          throw new GraphQLError(CommunityErrors.NotInCommunity);
        default:
          throw new GraphQLError(CommunityErrors.LeaveCommunity);
      }
    }
  }

  @Mutation(() => SuccessResponse)
  @UseMiddleware(isStrictAuth)
  async deleteCommunity(
    @Arg('communityId') communityId: string,
    @Ctx() { user }: RequestContext,
  ): Promise<SuccessResponse> {
    try {
      console.log('Deleting community', { user, communityId });
      await deleteCommunity(communityId, user.id);

      return {
        success: true,
        message: 'Successfully deleted the community',
      };
    } catch (error) {
      console.log('Unable to delete community', { error, name });
      switch (error.message) {
        case CommunityErrors.NotCommunityCreator:
          throw new GraphQLError(CommunityErrors.NotCommunityCreator);
        default:
          throw new GraphQLError(CommunityErrors.DeleteCommunity);
      }
    }
  }

  @FieldResolver(() => String)
  imageUrl(@Root() community: Community): string | null {
    try {
      if (!community.imageUrn) {
        return null;
      }

      return community.imageUrn;
    } catch (error) {
      console.error('Error resolving community profile pic: ', { error });

      return null;
    }
  }

  @FieldResolver(() => String)
  bannerUrl(@Root() community: Community): string | null {
    try {
      if (!community.bannerUrn) {
        return null;
      }

      return community.bannerUrn;
    } catch (error) {
      console.error('Error resolving banner pic: ', { error });

      return null;
    }
  }

  @FieldResolver(() => Boolean)
  @UseMiddleware(isAuth)
  isCreator(
    @Root() community: Community,
    @Ctx() { user }: RequestContext,
  ): boolean {
    try {
      if (user.id && community.userId === user.id) {
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error resolving creator: ', { error });

      return false;
    }
  }
}
