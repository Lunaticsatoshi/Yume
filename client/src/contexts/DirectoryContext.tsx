import React, {
  FC,
  useState,
  Dispatch,
  ReactNode,
  createContext,
  useEffect,
} from 'react';
import { useRouter } from 'next/router';
import { RedditLogo } from 'phosphor-react';

import {
  useGetCommunityByNameQuery,
  GetCommunityByNameQuery,
} from 'src/generated/graphql';
import { BaseError, CommunityNotFound } from 'src/components';
export interface IDirectoryState {
  isOpen: boolean;
  loading: boolean;
  selectedCommunity: {
    _id: string;
    displayText: string;
    link: string;
    imageURL: string;
  };
  communityData: GetCommunityByNameQuery['getCommunityByName'];
}

export const defaultDirectoryState: IDirectoryState = {
  isOpen: false,
  loading: false,
  selectedCommunity: {
    _id: '',
    displayText: '',
    link: '',
    imageURL: '',
  },
  communityData: {} as GetCommunityByNameQuery['getCommunityByName'],
};

type Props = {
  children: ReactNode;
};

export const DirectoryContext = createContext<{
  state: IDirectoryState;
  dispatch: Dispatch<IDirectoryState>;
}>({
  state: defaultDirectoryState,
  dispatch: (arg: IDirectoryState) => null,
});

const DirectoryContextProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useState<IDirectoryState>(defaultDirectoryState);
  const router = useRouter();
  const {
    data: communityData,
    error,
    loading,
  } = useGetCommunityByNameQuery({
    variables: {
      name: (router.query.community as string) || '',
    },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    dispatch((prev) => ({
      ...prev,
      loading,
    }));
  }, [loading]);

  useEffect(() => {
    if (!communityData?.getCommunityByName) {
      return;
    }

    dispatch((prev) => ({
      ...prev,
      selectedCommunity: {
        _id: communityData.getCommunityByName.community._id,
        displayText: `r/${communityData.getCommunityByName.community.name}`,
        link: `r/${communityData.getCommunityByName.community.name}`,
        imageURL: communityData.getCommunityByName.community.imageUrl || '',
      },
      communityData: communityData.getCommunityByName,
    }));
  }, [communityData?.getCommunityByName]);

  console.log(error);

  if (
    router.query.community &&
    error?.message === 'Error: community not found'
  ) {
    return <CommunityNotFound />;
  }

  if (router.query.community && error) {
    return <BaseError />;
  }

  return (
    <DirectoryContext.Provider value={{ state, dispatch }}>
      {children}
    </DirectoryContext.Provider>
  );
};

export default DirectoryContextProvider;
