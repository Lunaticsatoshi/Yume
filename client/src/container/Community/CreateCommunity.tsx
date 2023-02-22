import React, { useContext } from 'react';
import { CreatePostForm } from 'src/components';
import { DirectoryContext } from 'src/contexts';

const CreateCommunity = () => {
  const { state: directoryState, dispatch: setDirectoryState } =
    useContext(DirectoryContext);
  return (
    <>
      <CreatePostForm
        communityId={directoryState.communityData.community?._id}
      />
    </>
  );
};

export default CreateCommunity;
