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
  bannerUrl?: Maybe<Scalars['String']>;
  bannerUrn?: Maybe<Scalars['String']>;
  communityType: CommunityType;
  createdAt: Scalars['DateTime'];
  creator: User;
  description?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  imageUrn?: Maybe<Scalars['String']>;
  isCreator: Scalars['Boolean'];
  members?: Maybe<Array<User>>;
  name: Scalars['String'];
  posts?: Maybe<Array<Post>>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type CreateCommunityInput = {
  communityType?: CommunityType;
  name: Scalars['String'];
  title: Scalars['String'];
};

export type CreateCommunityResponse = {
  __typename?: 'CreateCommunityResponse';
  community?: Maybe<Community>;
  errors?: Maybe<Array<ErrorResponse>>;
};

export type ErrorResponse = {
  __typename?: 'ErrorResponse';
  field?: Maybe<Scalars['String']>;
  message: Scalars['String'];
  statusCode?: Maybe<Scalars['String']>;
};

export type GetCommunityDataResponse = {
  __typename?: 'GetCommunityDataResponse';
  community: Community;
  isMember: Scalars['Boolean'];
  memberCount: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCommunity: CreateCommunityResponse;
  createUser: UserResponse;
  deleteCommunity: SuccessResponse;
  joinCommunity: Community;
  leaveCommunity: Community;
  updateCommunity: Community;
  updateCommunityProfile: Community;
};


export type MutationCreateCommunityArgs = {
  data: CreateCommunityInput;
};


export type MutationCreateUserArgs = {
  data: RegisterUserInput;
};


export type MutationDeleteCommunityArgs = {
  communityId: Scalars['String'];
};


export type MutationJoinCommunityArgs = {
  communityId: Scalars['String'];
};


export type MutationLeaveCommunityArgs = {
  communityId: Scalars['String'];
};


export type MutationUpdateCommunityArgs = {
  communityId: Scalars['String'];
  data: UpdateCommunityInput;
};


export type MutationUpdateCommunityProfileArgs = {
  communityId: Scalars['String'];
  data: UpdateCommunityProfile;
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['String'];
  body: Scalars['String'];
  commentCount: Scalars['Float'];
  comments: Array<Comment>;
  community: Community;
  communityId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  identifier: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  imageUrn?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
  user: User;
  userId: Scalars['String'];
  voteCount: Scalars['Float'];
  votes: Array<Vote>;
};

export type Query = {
  __typename?: 'Query';
  getAllUsers?: Maybe<Array<User>>;
  getCommunities?: Maybe<Array<Community>>;
  getCommunityByName: GetCommunityDataResponse;
  getCurrentUser?: Maybe<User>;
};


export type QueryGetCommunityByNameArgs = {
  name: Scalars['String'];
};

export type RegisterUserInput = {
  authType?: AuthType;
  email: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
};

export type SuccessResponse = {
  __typename?: 'SuccessResponse';
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type UpdateCommunityInput = {
  communityType?: InputMaybe<CommunityType>;
  description?: InputMaybe<Scalars['String']>;
};

export type UpdateCommunityProfile = {
  bannerUrn?: InputMaybe<Scalars['String']>;
  imageUrn?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  authType: AuthType;
  communities?: Maybe<Array<Community>>;
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

export type CreateCommunityMutationVariables = Exact<{
  data: CreateCommunityInput;
}>;


export type CreateCommunityMutation = { __typename?: 'Mutation', createCommunity: { __typename?: 'CreateCommunityResponse', community?: { __typename?: 'Community', _id: string, name: string } | null, errors?: Array<{ __typename?: 'ErrorResponse', field?: string | null, statusCode?: string | null, message: string }> | null } };

export type UpdateCommunityMutationVariables = Exact<{
  communityId: Scalars['String'];
  data: UpdateCommunityInput;
}>;


export type UpdateCommunityMutation = { __typename?: 'Mutation', updateCommunity: { __typename?: 'Community', _id: string, name: string, title: string, description?: string | null, communityType: CommunityType, createdAt: any, updatedAt: any } };

export type UpdateCommunityProfileMutationVariables = Exact<{
  communityId: Scalars['String'];
  data: UpdateCommunityProfile;
}>;


export type UpdateCommunityProfileMutation = { __typename?: 'Mutation', updateCommunityProfile: { __typename?: 'Community', _id: string, name: string, imageUrl?: string | null, bannerUrl?: string | null, createdAt: any, updatedAt: any } };

export type JoinCommunityMutationVariables = Exact<{
  communityId: Scalars['String'];
}>;


export type JoinCommunityMutation = { __typename?: 'Mutation', joinCommunity: { __typename?: 'Community', _id: string, name: string, imageUrl?: string | null } };

export type LeaveCommunityMutationVariables = Exact<{
  communityId: Scalars['String'];
}>;


export type LeaveCommunityMutation = { __typename?: 'Mutation', leaveCommunity: { __typename?: 'Community', _id: string, name: string, imageUrl?: string | null } };

export type CreateUserMutationVariables = Exact<{
  data: RegisterUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserResponse', user?: { __typename?: 'User', _id: string, email: string, username: string, authType: AuthType, profilePicUrn?: string | null, profileUrl?: string | null } | null, errors?: Array<{ __typename?: 'ErrorResponse', field?: string | null, statusCode?: string | null, message: string }> | null } };

export type GetCommunityByNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type GetCommunityByNameQuery = { __typename?: 'Query', getCommunityByName: { __typename?: 'GetCommunityDataResponse', memberCount: string, isMember: boolean, community: { __typename?: 'Community', _id: string, name: string, title: string, description?: string | null, communityType: CommunityType, imageUrl?: string | null, bannerUrl?: string | null, userId: string, createdAt: any, updatedAt: any } } };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser?: { __typename?: 'User', _id: string, email: string, username: string, authType: AuthType, profilePicUrn?: string | null, profileUrl?: string | null, karma: string, communities?: Array<{ __typename?: 'Community', _id: string, name: string, imageUrl?: string | null }> | null } | null };


export const CreateCommunityDocument = gql`
    mutation CreateCommunity($data: CreateCommunityInput!) {
  createCommunity(data: $data) {
    community {
      _id
      name
    }
    errors {
      field
      statusCode
      message
    }
  }
}
    `;
export type CreateCommunityMutationFn = Apollo.MutationFunction<CreateCommunityMutation, CreateCommunityMutationVariables>;

/**
 * __useCreateCommunityMutation__
 *
 * To run a mutation, you first call `useCreateCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommunityMutation, { data, loading, error }] = useCreateCommunityMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCommunityMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommunityMutation, CreateCommunityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommunityMutation, CreateCommunityMutationVariables>(CreateCommunityDocument, options);
      }
export type CreateCommunityMutationHookResult = ReturnType<typeof useCreateCommunityMutation>;
export type CreateCommunityMutationResult = Apollo.MutationResult<CreateCommunityMutation>;
export type CreateCommunityMutationOptions = Apollo.BaseMutationOptions<CreateCommunityMutation, CreateCommunityMutationVariables>;
export const UpdateCommunityDocument = gql`
    mutation UpdateCommunity($communityId: String!, $data: UpdateCommunityInput!) {
  updateCommunity(communityId: $communityId, data: $data) {
    _id
    name
    title
    description
    communityType
    createdAt
    updatedAt
  }
}
    `;
export type UpdateCommunityMutationFn = Apollo.MutationFunction<UpdateCommunityMutation, UpdateCommunityMutationVariables>;

/**
 * __useUpdateCommunityMutation__
 *
 * To run a mutation, you first call `useUpdateCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommunityMutation, { data, loading, error }] = useUpdateCommunityMutation({
 *   variables: {
 *      communityId: // value for 'communityId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateCommunityMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommunityMutation, UpdateCommunityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCommunityMutation, UpdateCommunityMutationVariables>(UpdateCommunityDocument, options);
      }
export type UpdateCommunityMutationHookResult = ReturnType<typeof useUpdateCommunityMutation>;
export type UpdateCommunityMutationResult = Apollo.MutationResult<UpdateCommunityMutation>;
export type UpdateCommunityMutationOptions = Apollo.BaseMutationOptions<UpdateCommunityMutation, UpdateCommunityMutationVariables>;
export const UpdateCommunityProfileDocument = gql`
    mutation UpdateCommunityProfile($communityId: String!, $data: UpdateCommunityProfile!) {
  updateCommunityProfile(communityId: $communityId, data: $data) {
    _id
    name
    imageUrl
    bannerUrl
    createdAt
    updatedAt
  }
}
    `;
export type UpdateCommunityProfileMutationFn = Apollo.MutationFunction<UpdateCommunityProfileMutation, UpdateCommunityProfileMutationVariables>;

/**
 * __useUpdateCommunityProfileMutation__
 *
 * To run a mutation, you first call `useUpdateCommunityProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommunityProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommunityProfileMutation, { data, loading, error }] = useUpdateCommunityProfileMutation({
 *   variables: {
 *      communityId: // value for 'communityId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateCommunityProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommunityProfileMutation, UpdateCommunityProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCommunityProfileMutation, UpdateCommunityProfileMutationVariables>(UpdateCommunityProfileDocument, options);
      }
export type UpdateCommunityProfileMutationHookResult = ReturnType<typeof useUpdateCommunityProfileMutation>;
export type UpdateCommunityProfileMutationResult = Apollo.MutationResult<UpdateCommunityProfileMutation>;
export type UpdateCommunityProfileMutationOptions = Apollo.BaseMutationOptions<UpdateCommunityProfileMutation, UpdateCommunityProfileMutationVariables>;
export const JoinCommunityDocument = gql`
    mutation JoinCommunity($communityId: String!) {
  joinCommunity(communityId: $communityId) {
    _id
    name
    imageUrl
  }
}
    `;
export type JoinCommunityMutationFn = Apollo.MutationFunction<JoinCommunityMutation, JoinCommunityMutationVariables>;

/**
 * __useJoinCommunityMutation__
 *
 * To run a mutation, you first call `useJoinCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinCommunityMutation, { data, loading, error }] = useJoinCommunityMutation({
 *   variables: {
 *      communityId: // value for 'communityId'
 *   },
 * });
 */
export function useJoinCommunityMutation(baseOptions?: Apollo.MutationHookOptions<JoinCommunityMutation, JoinCommunityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinCommunityMutation, JoinCommunityMutationVariables>(JoinCommunityDocument, options);
      }
export type JoinCommunityMutationHookResult = ReturnType<typeof useJoinCommunityMutation>;
export type JoinCommunityMutationResult = Apollo.MutationResult<JoinCommunityMutation>;
export type JoinCommunityMutationOptions = Apollo.BaseMutationOptions<JoinCommunityMutation, JoinCommunityMutationVariables>;
export const LeaveCommunityDocument = gql`
    mutation LeaveCommunity($communityId: String!) {
  leaveCommunity(communityId: $communityId) {
    _id
    name
    imageUrl
  }
}
    `;
export type LeaveCommunityMutationFn = Apollo.MutationFunction<LeaveCommunityMutation, LeaveCommunityMutationVariables>;

/**
 * __useLeaveCommunityMutation__
 *
 * To run a mutation, you first call `useLeaveCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveCommunityMutation, { data, loading, error }] = useLeaveCommunityMutation({
 *   variables: {
 *      communityId: // value for 'communityId'
 *   },
 * });
 */
export function useLeaveCommunityMutation(baseOptions?: Apollo.MutationHookOptions<LeaveCommunityMutation, LeaveCommunityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeaveCommunityMutation, LeaveCommunityMutationVariables>(LeaveCommunityDocument, options);
      }
export type LeaveCommunityMutationHookResult = ReturnType<typeof useLeaveCommunityMutation>;
export type LeaveCommunityMutationResult = Apollo.MutationResult<LeaveCommunityMutation>;
export type LeaveCommunityMutationOptions = Apollo.BaseMutationOptions<LeaveCommunityMutation, LeaveCommunityMutationVariables>;
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
export const GetCommunityByNameDocument = gql`
    query GetCommunityByName($name: String!) {
  getCommunityByName(name: $name) {
    community {
      _id
      name
      title
      description
      communityType
      imageUrl
      bannerUrl
      userId
      createdAt
      updatedAt
    }
    memberCount
    isMember
  }
}
    `;

/**
 * __useGetCommunityByNameQuery__
 *
 * To run a query within a React component, call `useGetCommunityByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommunityByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommunityByNameQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetCommunityByNameQuery(baseOptions: Apollo.QueryHookOptions<GetCommunityByNameQuery, GetCommunityByNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommunityByNameQuery, GetCommunityByNameQueryVariables>(GetCommunityByNameDocument, options);
      }
export function useGetCommunityByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommunityByNameQuery, GetCommunityByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommunityByNameQuery, GetCommunityByNameQueryVariables>(GetCommunityByNameDocument, options);
        }
export type GetCommunityByNameQueryHookResult = ReturnType<typeof useGetCommunityByNameQuery>;
export type GetCommunityByNameLazyQueryHookResult = ReturnType<typeof useGetCommunityByNameLazyQuery>;
export type GetCommunityByNameQueryResult = Apollo.QueryResult<GetCommunityByNameQuery, GetCommunityByNameQueryVariables>;
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  getCurrentUser {
    _id
    email
    username
    authType
    profilePicUrn
    profileUrl
    karma
    communities {
      _id
      name
      imageUrl
    }
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