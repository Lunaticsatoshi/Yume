import React, { ChangeEvent, useRef, FC, useContext } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import {
  CircularAvatar,
  DefaultCircularAvatar,
  HeaderBanner,
  JoinButton,
} from 'src/components';
import { storage } from 'src/utils/firebaseClient';
import { DirectoryContext } from 'src/contexts';
import {
  useUpdateCommunityProfileMutation,
  UpdateCommunityProfile,
  GetCommunityByNameDocument,
} from 'src/generated/graphql';
import useCommunityData from 'src/hooks/useCommunityData';

interface ICommunityHeader {}

const CommunityHeader: FC<ICommunityHeader> = ({}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { state: directoryState, dispatch: setDirectoryState } =
    useContext(DirectoryContext);

  const { onJoinOrLeaveCommunity, loading } = useCommunityData();

  const [updateCommunityProfile] = useUpdateCommunityProfileMutation();

  const community = directoryState.communityData.community;
  const ownCommunity = directoryState.communityData.isMember;

  const openFileInput = (type: string) => {
    if (!ownCommunity || !fileInputRef || !fileInputRef.current) return;
    fileInputRef.current.name = type;
    fileInputRef.current.click();
  };

  const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!fileInputRef || !fileInputRef.current) return;

    try {
      if (selectedFile) {
        const imageRef = ref(
          storage,
          `communities/${community._id}/${fileInputRef.current.name}/image`,
        );
        await uploadBytes(imageRef, selectedFile);
        const downloadURL = await getDownloadURL(imageRef);

        console.log('HERE IS DOWNLOAD URL', downloadURL);
        const data: UpdateCommunityProfile = {};

        if (fileInputRef.current.name === 'banner') {
          data.bannerUrn = downloadURL;
        } else {
          data.imageUrn = downloadURL;
        }

        await updateCommunityProfile({
          variables: {
            communityId: community._id,
            data,
          },
          refetchQueries: [
            {
              query: GetCommunityByNameDocument,
              variables: {
                name: community.name,
              },
            },
          ],
        });
      }
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
        accept="image/x-png,image/gif,image/jpeg"
      />
      {/* Sub info and images */}
      <div className="flex flex-col w-full h-44">
        {/* Banner image */}
        <div
          className={`bg-blue-500 h-1/2 ${
            ownCommunity ? 'cursor-pointer' : ''
          }`}
          onClick={() => openFileInput('banner')}
        >
          {community?.bannerUrl ? (
            <HeaderBanner bannerUrl={community.bannerUrl} />
          ) : (
            <div className="h-full bg-blue-400"></div>
          )}
        </div>
        {/* Sub meta data */}
        <div className="h-1/2 flex justify-center bg-white dark:bg-black-500">
          <div className="container relative flex w-full max-w-[860px]">
            <div className="absolute" style={{ top: -15 }}>
              {community?.imageUrl ? (
                <CircularAvatar
                  imageUrl={community.imageUrl}
                  className={`rounded-full border border-solid border-white bg-blue-500 ${
                    ownCommunity ? 'cursor-pointer' : ''
                  }`}
                  onClick={() => openFileInput('image')}
                />
              ) : (
                <DefaultCircularAvatar
                  className={'w-[80px] h-[80px] border-4'}
                  onClick={() => openFileInput('image')}
                />
              )}
            </div>
            <div className="flex pt-1 pl-24">
              <div className="flex flex-col items-start">
                <h1 className="mb-1 text-3xl font-extrabold dark:text-white">
                  {community?.title || ''}
                </h1>
                <div className="text-sm font-bold text-gray-500">
                  /r/{community?.name || ''}
                </div>
              </div>

              <JoinButton
                className="ml-7 mt-1"
                isJoined={directoryState.communityData.isMember}
                onClick={() =>
                  onJoinOrLeaveCommunity(
                    directoryState.communityData.community,
                    directoryState.communityData.isMember,
                  )
                }
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityHeader;
