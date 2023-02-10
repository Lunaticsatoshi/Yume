import React, { ChangeEvent, createRef, FC } from 'react';
import Image from 'next/image';

import { DefaultCircularAvatar, HeaderBanner } from 'src/components';

interface ICommunityHeader {
  community: {
    bannerUrl: string;
    imageUrl: string;
    name: string;
    title: string;
  };
  ownCommunity: boolean;
}

const CommunityHeader: FC<ICommunityHeader> = ({ community, ownCommunity }) => {
  const fileInputRef = createRef<HTMLInputElement>();

  const openFileInput = (type: string) => {
    // if (!ownSub) return;
    // fileInputRef.current.name = type;
    // fileInputRef.current.click();
  };

  const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    // const file = event.target.files[0];

    // const formData = new FormData();
    // formData.append('file', file);
    // formData.append('type', fileInputRef.current.name);

    try {
      await console.log('upload Image');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {' '}
      <input
        type="file"
        hidden={true}
        ref={fileInputRef}
        onChange={uploadImage}
      />
      {/* Sub info and images */}
      <div className="flex flex-col w-full h-36">
        {/* Banner image */}
        <div
          className={`bg-blue-500 h-1/2 ${
            ownCommunity ? 'cursor-pointer' : ''
          }`}
          onClick={() => openFileInput('banner')}
        >
          {community.bannerUrl ? (
            <HeaderBanner bannerUrl={community.bannerUrl} />
          ) : (
            <div className="h-full bg-blue-500"></div>
          )}
        </div>
        {/* Sub meta data */}
        <div className="h-1/2 flex justify-center bg-white dark:bg-black-500">
          <div className="container relative flex w-full max-w-[860px]">
            <div className="absolute" style={{ top: -15 }}>
              {community.imageUrl ? (
                <Image
                  src={community.imageUrl}
                  alt="community"
                  className={`rounded-full ${
                    ownCommunity ? 'cursor-pointer' : ''
                  }`}
                  onClick={() => openFileInput('image')}
                  width={80}
                  height={80}
                />
              ) : (
                <DefaultCircularAvatar
                  className={'w-[80px] h-[80px]'}
                  onClick={() => openFileInput('image')}
                />
              )}
            </div>
            <div className="pt-1 pl-24">
              <div className="flex items-center">
                <h1 className="mb-1 text-2xl font-bold">{community.title || 'Community'}</h1>
              </div>
              <p className="text-sm font-bold text-gray-500">
                /r/{community.name || 'Community'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityHeader;
