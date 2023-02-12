import React, {
  FC,
  useState,
  Dispatch,
  ReactNode,
  createContext,
  useEffect,
} from 'react';
import { useRouter } from 'next/router';
import { useAsyncEffect } from 'use-async-effect';

import { useGetCommunityByNameForDirectoryQuery } from 'src/generated/graphql';

export interface IDirectoryState {
  isOpen: boolean;
  selectedCommunity: {
    _id: string;
    displayText: string;
    link: string;
    imageURL: string;
  };
}

export const defaultDirectoryState: IDirectoryState = {
  isOpen: false,
  selectedCommunity: {
    _id: '',
    displayText: '',
    link: '',
    imageURL: '',
  },
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
  const { refetch: getCommunityByNameForDirectory } =
    useGetCommunityByNameForDirectoryQuery({
      fetchPolicy: 'cache-and-network',
      skip: true,
    });

  useAsyncEffect(async () => {
    const { community } = router.query;
    try {
      if (community) {
        const { data: communityData } = await getCommunityByNameForDirectory({
          name: community as any,
        });

        dispatch((prev) => ({
          ...prev,
          selectedCommunity: {
            _id: communityData.getCommunityByName._id,
            displayText: `r/${communityData.getCommunityByName.name}`,
            link: `r/${communityData.getCommunityByName.name}`,
            imageURL: communityData.getCommunityByName?.imageUrl || '',
          },
        }));

        return;
      }
    } catch (error) {
      dispatch({ ...defaultDirectoryState });
    }
  }, [router.query]);

  return (
    <DirectoryContext.Provider value={{ state, dispatch }}>
      {children}
    </DirectoryContext.Provider>
  );
};

export default DirectoryContextProvider;
