export enum GeneralErrors {
  SERVER = 'Error: something went wrong',
}

export enum UserErrors {
  GetUser = 'Error: user not found',
  GetUsers = 'Error: cannot get user list',
  CreateUser = 'Error: unable to register user',
  UpdateUser = 'Error: unable to update user',
}

export enum CommunityErrors {
    GetCommunity = 'Error: community not found',
    GetCommunities = 'Error: cannot get community list',
    CreateCommunity = 'Error: unable to create community! Please try again',
    UpdateCommunity = 'Error: unable to update community! Please try again',
    NotCommunityCreator = 'Error: You are not the creator of this community',
    JoinCommunity = 'Error: unable to join the community! Please try again',
    LeaveCommunity = 'Error: unable to leave the community! Please try again',
    AlreadyInCommunity = 'Error: you are already a part of this community',
    NotInCommunity = 'Error: you are not a part of this community',
    DeleteCommunity = 'Error: unable to delete community! Please try again',
  }
