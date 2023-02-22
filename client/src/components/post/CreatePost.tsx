import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { Image, Link, RedditLogo } from 'phosphor-react';

import CreatePostInput from '../ui/CreatePostInput';

type CreatePostProps = {};

const CreatePostLink: FC<CreatePostProps> = () => {
  const router = useRouter();
  const onClick = () => {
    // Could check for user to open auth modal before redirecting to submit
    const { community } = router.query;
    if (community) {
      router.push(`/r/${router.query.community}/submit`);
    }
    // Open directory menu to select community to post to
  };
  return (
    <div
    className="flex justify-evenly gap-2 items-center bg-white h-14 rounded-md border border-solid border-gray-300 p-2 mb-4"
    >
      <RedditLogo size={36} className="text-gray-300" />
      <CreatePostInput onClick={onClick} />
      <Image size={24} className="mr-4 text-gray-400 cursor-pointer" />
      <Link size={24} className="mr-4 text-gray-400 cursor-pointer" />
    </div>
  );
};
export default CreatePostLink;
