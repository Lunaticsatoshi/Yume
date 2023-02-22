import React, { useContext } from 'react';
import { AboutCommunity, CreatePostLink } from 'src/components';
import { DirectoryContext } from 'src/contexts';

const CommunityRight = () => {
  const { state: directoryState, dispatch: setDirectoryState } =
    useContext(DirectoryContext);

  return (
    <>
      <CreatePostLink />
    </>
  );
};

export default CommunityRight;
