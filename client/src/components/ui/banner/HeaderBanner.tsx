import React, { FC } from 'react';
import classNames from 'src/utils/classnames';

interface IHeaderBanner {
    bannerUrl: string;
    className?: string;
}
const HeaderBanner: FC<IHeaderBanner> = ({ bannerUrl, className }) => {
  return (
    <div
      className={classNames("h-full bg-blue-500", className)}
      style={{
        backgroundImage: `url(${bannerUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    ></div>
  );
};

export default HeaderBanner;
