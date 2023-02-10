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
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => CommunityType, { nullable: true })
  communityType?: CommunityType;
}

@ObjectType()
export class CreateCommunityResponse {
  @Field(() => [ErrorResponse], { nullable: true })
  errors?: ErrorResponse[];

  @Field(() => Community, { nullable: true })
  community?: Community | null;
}