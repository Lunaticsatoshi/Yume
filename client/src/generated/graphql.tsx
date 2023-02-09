import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Comment = {
  __typename?: 'Comment';
  _id: Scalars['String'];
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  identifier: Scalars['String'];
  post: Post;
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
  votes?: Maybe<Array<Vote>>;
};

export type Community = {
  __typename?: 'Community';
  _id: Scalars['String'];
  bannerUrl: Scalars['String'];
  bannerUrn?: Maybe<Scalars['String']>;
  communityType: CommunityType;
  createdAt: Scalars['DateTime'];
  creator: User;
  description: Scalars['String'];
  imageUrl: Scalars['String'];
  imageUrn?: Maybe<Scalars['String']>;
  members: Array<User>;
  name: Scalars['String'];
  posts?: Maybe<Array<Post>>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type ErrorResponse = {
  __typename?: 'ErrorResponse';
  field?: Maybe<Scalars['String']>;
  message: Scalars['String'];
  statusCode: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: UserResponse;
};


export type MutationCreateUserArgs = {
  data: RegisterUserInput;
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['String'];
  body: Scalars['String'];
  commentCount: Scalars['Float'];
  comments: User;
  community: Community;
  communityName: Scalars['String'];
  createdAt: Scalars['DateTime'];
  identifier: Scalars['String'];
  imageUrn?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
  user: User;
  userId: Scalars['String'];
  voteCount: Scalars['Float'];
  votes: Vote;
};

export type Query = {
  __typename?: 'Query';
  getAllUsers?: Maybe<Array<User>>;
  getCurrentUser?: Maybe<User>;
};

export type RegisterUserInput = {
  authType?: AuthType;
  email: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  authType: AuthType;
  communities: Array<Community>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  isActive: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  karma: Scalars['String'];
  posts?: Maybe<Array<Post>>;
  profilePicUrn?: Maybe<Scalars['String']>;
  profileUrl?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
  votes?: Maybe<Array<Vote>>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  user?: Maybe<User>;
};

export type Vote = {
  __typename?: 'Vote';
  _id: Scalars['String'];
  comment: Comment;
  createdAt: Scalars['DateTime'];
  post: Post;
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
  voteType: VoteType;
};

/** Type of the authentication method used */
export enum AuthType {
  EmailAndPassword = 'EMAIL_AND_PASSWORD',
  Google = 'GOOGLE'
}

/** Type of the community */
export enum CommunityType {
  Private = 'PRIVATE',
  Public = 'PUBLIC',
  Restricted = 'RESTRICTED'
}

/** Type of the vote */
export enum VoteType {
  Downvote = 'DOWNVOTE',
  Upvote = 'UPVOTE'
}

export type CreateUserMutationVariables = Exact<{
  data: RegisterUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserResponse', user?: { __typename?: 'User', _id: string, email: string, username: string, authType: AuthType, profilePicUrn?: string | null, profileUrl?: string | null } | null, errors?: Array<{ __typename?: 'ErrorResponse', field?: string | null, statusCode: string, message: string }> | null } };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser?: { __typename?: 'User', _id: string, email: string, username: string, authType: AuthType, profilePicUrn?: string | null, profileUrl?: string | null } | null };


export const CreateUserDocument = gql`
    mutation CreateUser($data: RegisterUserInput!) {
  createUser(data: $data) {
    user {
      _id
      email
      username
      authType
      profilePicUrn
      profileUrl
    }
    errors {
      field
      statusCode
      message
    }
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  getCurrentUser {
    _id
    email
    username
    authType
    profilePicUrn
    profileUrl
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;