import { CommunityErrors } from './../../common/enums/errors.enum';
import { isEmpty } from 'class-validator';

import {
  CreateCommunityInput,
  CreateCommunityResponse,
  UpdateCommunityInput,
} from './community.interface';
import { ErrorResponse } from '../../common/objects/error';
import { createDataSource } from '../../common/utils/dataSource';
import { getUserRepository } from '../user/user.service';
import { getMemberRepository } from '../member/member.service';
import { Community } from '../../entities/CommunityModel';
import { MemberType } from './../../entities/MemberModel';

export const getCommunityRepository = async () => {
  const dataSource = await createDataSource();

  return await dataSource.getRepository(Community);
};

const validateCreateCommunityInput = (
  data: CreateCommunityInput,
  errors: ErrorResponse[],
) => {
  if (isEmpty(data.name)) {
    errors.push({
      field: 'name',
      message: 'Community name cannot be empty',
    });
  }

  if (isEmpty(data.title)) {
    errors.push({
      field: 'title',
      message: 'Community title cannot be empty',
    });
  }
};

export const getCommunities = async () => {
  const communityRepository = await getCommunityRepository();

  return await communityRepository.find();
};

export const getCommunityByName = async (name: string) => {
  const communityRepository = await getCommunityRepository();

  return await communityRepository.findOne({ where: { name }, relations: ['creator', 'members'] });
};

export const getCommunitiesCreatedByUser = async (userId: string) => {
  const communityRepository = await getCommunityRepository();

  return await communityRepository.find({
    where: { creator: { _id: userId } },
  });
};

export const getCommunityDataByCommunityName = async (name: string) => {
  const communityRepository = await getCommunityRepository();

  return await communityRepository
    .createQueryBuilder('community')
    .leftJoinAndSelect('community.posts', 'post')
    .leftJoinAndSelect('community.members', 'member')
    .where('community.name = :name', { name })
    .andWhere('member.memberType = :memberType', {
      memberType: MemberType.MODERATOR,
    })
    .getOne();
};

export const createCommunity = async (
  userId: string,
  { name, title, communityType }: CreateCommunityInput,
): Promise<CreateCommunityResponse> => {
  const communityRepository = await getCommunityRepository();
  const userRepository = await getUserRepository();
  const memberRepository = await getMemberRepository();
  const errors: ErrorResponse[] = [];

  validateCreateCommunityInput({ name, title, communityType }, errors);

  const existingCommunity = await communityRepository
    .createQueryBuilder('community')
    .where('lower(community.name) = :name', { name: name.toLowerCase() })
    .getOne();

  if (existingCommunity) {
    errors.push({
      field: 'name',
      message: 'A community with this name already exists',
    });
  }

  if (errors.length > 0) {
    return {
      community: null,
      errors,
    };
  }

  const user = await userRepository.findOneByOrFail({ _id: userId });

  console.log("Creating community", { user });

  const createdCommunity = communityRepository.create({
    name,
    title,
    communityType,
    username: user.username,
    creator: user,
    members: [user]
  });

  await communityRepository.save(createdCommunity);

  await memberRepository.update(
    { userId: user._id, communityId: createdCommunity._id },
    { memberType: MemberType.MODERATOR },
  );

  console.log(await memberRepository.findOneByOrFail({ userId: user._id, communityId: createdCommunity._id }));

  return {
    community: createdCommunity,
    errors: [],
  };
};

export const updateCommunity = async (
  communityId: string,
  userId: string,
  data: UpdateCommunityInput,
): Promise<CreateCommunityResponse> => {
  const communityRepository = await getCommunityRepository();

  if (data.title && isEmpty(data.title)) {
    return {
      errors: [
        {
          field: 'title',
          message: 'Community title cannot be empty',
        },
      ],
    };
  }

  const communityToUpdate = await communityRepository.findOneOrFail({
    where: { _id: communityId, creator: { _id: userId } },
  });

  if (!communityToUpdate) {
    throw new Error(CommunityErrors.NotCommunityCreator);
  }

  await communityRepository.update({ _id: communityId }, { ...data });

  const updatedCommunity = await communityRepository.findOneOrFail({
    where: { _id: communityId },
  });

  return {
    community: updatedCommunity,
    errors: [],
  };
};

export const joinCommunity = async (communityId: string, userId: string) => {
  const communityRepository = await getCommunityRepository();
  const userRepository = await getUserRepository();

  const user = await userRepository.findOneByOrFail({ _id: userId });
  const community = await communityRepository.findOneByOrFail({
    _id: communityId,
  });

  if (community.members.includes(user)) {
    throw new Error(CommunityErrors.AlreadyInCommunity);
  }

  community.members.push(user);

  return await community.save();
};

export const leaveCommunity = async (communityId: string, userId: string) => {
  const communityRepository = await getCommunityRepository();
  const community = await communityRepository.findOneByOrFail({
    _id: communityId,
  });

  if (!community.members.find((member) => member._id === userId)) {
    throw new Error(CommunityErrors.NotInCommunity);
  }

  community.members = community.members.filter(
    (member) => member._id !== userId,
  );

  return await community.save();
};

export const deleteCommunity = async (communityId: string, userId: string) => {
  const communityRepository = await getCommunityRepository();

  const communityToDelete = await communityRepository.findOneOrFail({
    where: { _id: communityId, creator: { _id: userId } },
  });

  if (!communityToDelete) {
    throw new Error(CommunityErrors.NotCommunityCreator);
  }

  return await communityRepository.delete({ _id: communityId, userId });
};
