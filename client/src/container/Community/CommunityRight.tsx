import React, { useContext } from 'react';
import { AboutCommunity } from 'src/components';
import { DirectoryContext } from 'src/contexts';

const CommunityRight = () => {
  const { state: directoryState, dispatch: setDirectoryState } =
    useContext(DirectoryContext);

  return (
    <>
      <AboutCommunity
        communityData={directoryState.communityData}
        className=""
        loading={
          directoryState.loading || !directoryState.communityData.community
        }
      />
    </>
  );
};

export default CommunityRight;
