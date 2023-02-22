import React from 'react';
import {
  Button,
  Divider,
  Flex,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Cake, DotsThreeOutline } from 'phosphor-react';
import moment from 'moment';

import classNames from 'src/utils/classnames';
import { useAuthState } from 'src/hooks';
import { GetCommunityByNameQuery } from 'src/generated/graphql';
import { ActionButton } from '../ui/Button';

type AboutProps = {
  communityData: GetCommunityByNameQuery['getCommunityByName'];
  className: string;
  onCreatePage?: boolean;
  loading?: boolean;
};

const AboutCommunity: React.FC<AboutProps> = ({
  communityData,
  className,
  onCreatePage,
  loading,
}) => {
  const { user } = useAuthState(); // will revisit how 'auth' state is passed
  const router = useRouter();

  console.log(communityData.community);

  return (
    <div className={classNames('sticky top-4', className)}>
      <div className="flex justify-between items-center p-3 bg-blue-400 dark:bg-black-500 text-white rounded-t-md">
        <div className="text-sm font-bold">About Community</div>
        <DotsThreeOutline size={15} className="cursor-pointer" />
      </div>
      <div className="flex flex-col p-3 bg-white dark:bg-black-500 rounded-b-md">
        {loading ? (
          <Stack mt={2}>
            <SkeletonCircle size="10" />
            <Skeleton height="10px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        ) : (
          <>
            {user?._id === communityData.community.userId && (
              <div className="bg-gray-100 dark:bg-black-400 w-full p-2 border border-solid border-gray-300 rounded-md cursor pointer mt-4">
                <div className="text-xs font-bold text-blue-500 dark:text-white">
                  Add description
                </div>
              </div>
            )}

            <div className="flex items-center w-full p-2 font-medium text-sm dark:text-white mt-1">
              <Cake size={18} className="mr-2" />
              {communityData?.community.createdAt && (
                <div className="text-gray-500">
                  Created{' '}
                  {moment(new Date(communityData?.community.createdAt)).format(
                    'MMM DD, YYYY',
                  )}
                </div>
              )}
            </div>

            <Divider />

            <div className="flex w-full p-2 font-semibold text-sm dark:text-white my-2">
              <div className="flex flex-col flex-grow">
                <div>{communityData?.memberCount?.toLocaleString()}</div>
                <div className="text-gray-500 text-[12px]">Members</div>
              </div>
              <div className="flex flex-col flex-grow">
                <div>1</div>
                <div className="text-gray-500 text-[12px]">Online</div>
              </div>
            </div>
            <Divider />
            {!onCreatePage && (
              <Link href={`/r/${router.query.community}/submit`}>
                <ActionButton onClick={() => {}} className="my-4">
                  Create Post
                </ActionButton>
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default AboutCommunity;
