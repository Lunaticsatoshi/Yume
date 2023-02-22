import React from 'react';
import Link from 'next/link';
import { RedditLogo } from 'phosphor-react';

const BaseError = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col items-center">
        <RedditLogo size={52} />
        <div>Something went wrong</div>
        <Link href="/">Go Home</Link>
      </div>
    </div>
  );
};

export default BaseError;
