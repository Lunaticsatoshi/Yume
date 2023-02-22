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
    <div className="rounded-full border-4 border-solid border-white">
      <Image
        src={imageUrl}
        alt="community"
        className={className}
        onClick={onClick}
        width={75}
        height={75}
        objectFit="contain"
      />
    </div>
  );
};

export const DefaultCircularAvatar: FC<Omit<ICircularAvatar, 'imageUrl'>> = ({
  className,
  onClick,
}) => {
  return (
    <div
      className={classNames(
        'rounded-full flex justify-center items-center bg-blue-500 border-solid border-white',
        className,
      )}
      onClick={onClick}
    >
      <RedditLogo size={22} />
    </div>
  );
};

export const DefaultSmallCircularAvatar: FC<
  Omit<ICircularAvatar, 'imageUrl'>
> = ({ className, onClick }) => {
  return (
    <div
      className={classNames(
        'rounded-full flex justify-center items-center bg-blue-500 border-solid border-white',
        className,
      )}
      onClick={onClick}
    >
      <RedditLogo size={12} />
    </div>
  );
};
