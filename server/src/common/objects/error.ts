import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class ErrorResponse {
  @Field({ nullable: true })
  statusCode?: string;

  @Field({ nullable: true })
  field?: string;

  @Field()
  message: string;
}
