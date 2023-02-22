import React from 'react';
import Link from 'next/link';
import { RedditLogo } from 'phosphor-react';

const CommunityNotFound = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col items-center">
        <RedditLogo size={52} />
        <div>Sorry, that community does not exist or has been banned</div>
        <Link href="/">Go Home</Link>
      </div>
    </div>
  );
};

export default CommunityNotFound;
