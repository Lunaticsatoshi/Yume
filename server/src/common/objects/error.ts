import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class ErrorResponse {
  @Field()
  statusCode: string;

  @Field({ nullable: true })
  field?: string;

  @Field()
  message: string;
}
