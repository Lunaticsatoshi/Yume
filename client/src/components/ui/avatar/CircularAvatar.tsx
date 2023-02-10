import React, { FC } from 'react';
import Image from 'next/image';

import { RedditLogo } from 'phosphor-react';
import classNames from 'src/utils/classnames';

interface ICircularAvatar {
  imageUrl: string;
  className: string;
  onClick: () => unknown;
}

export const CircularAvatar: FC<ICircularAvatar> = ({
  imageUrl,
  onClick,
  className,
}) => {
  return (
    <Image
      src={imageUrl}
      alt="community"
      className={className}
      onClick={onClick}
      width={70}
      height={70}
    />
  );
};

export const DefaultCircularAvatar: FC<Omit<ICircularAvatar, 'imageUrl'>> = ({
  className,
  onClick,
}) => {
  return (
    <div
      className={classNames(
        'rounded-full flex justify-center items-center bg-blue-500 border-4 border-solid border-white',
        className,
      )}
      onClick={onClick}
    >
      <RedditLogo size={22} />
    </div>
  );
};
