import { ErrorResponse } from '../../common/objects/error';
import { Community, CommunityType } from '../../entities/CommunityModel';
import { Field, InputType, ObjectType } from 'type-graphql';

@InputType()
export class CreateCommunityInput {
  @Field()
  name: string;

  @Field()
  title: string;

  @Field(() => CommunityType, { defaultValue: CommunityType.PUBLIC })
  communityType: CommunityType;
}

@InputType()
export class UpdateCommunityInput {
  @Field({ nullable: true })
  description?: string;

  @Field(() => CommunityType, { nullable: true })
  communityType?: CommunityType;
}

@InputType()
export class UpdateCommunityProfile {
  @Field({ nullable: true })
  bannerUrn?: string;

  @Field({ nullable: true })
  imageUrn?: string;
}

@ObjectType()
export class CreateCommunityResponse {
  @Field(() => [ErrorResponse], { nullable: true })
  errors?: ErrorResponse[];

  @Field(() => Community, { nullable: true })
  community?: Community | null;
}

@ObjectType()
export class GetCommunityDataResponse {
  @Field(() => Community)
  community: Community | null;

  @Field({ defaultValue: "0" })
  memberCount: string;

  @Field({ defaultValue: false })
  isMember: boolean;
}
