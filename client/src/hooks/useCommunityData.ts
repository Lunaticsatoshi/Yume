import { useState } from 'react';
import {
  GetCommunityByNameQuery,
  GetCommunityByNameDocument,
  useJoinCommunityMutation,
  useLeaveCommunityMutation,
} from 'src/generated/graphql';

const useCommunityData = () => {
  const [loading, setLoading] = useState(false);
  const [communityError, setCommunityError] = useState<unknown>();
  const [joinCommunity] = useJoinCommunityMutation();
  const [leaveCommunity] = useLeaveCommunityMutation();

  const joinRedditCommunity = async (
    communityId: string,
    communityName: string,
  ) => {
    try {
      await joinCommunity({
        variables: {
          communityId,
        },
        refetchQueries: [
          {
            query: GetCommunityByNameDocument,
            variables: { name: communityName },
          },
        ],
      });
    } catch (error) {
      setCommunityError(error);
    }
    setLoading(false);
  };

  const leaveRedditCommunity = async (
    communityId: string,
    communityName: string,
  ) => {
    try {
      await leaveCommunity({
        variables: {
          communityId,
        },
        refetchQueries: [
          {
            query: GetCommunityByNameDocument,
            variables: { name: communityName },
          },
        ],
      });
    } catch (error) {
      setCommunityError(error);
    }
    setLoading(false);
  };

  const onJoinOrLeaveCommunity = async (
    community: GetCommunityByNameQuery['getCommunityByName']['community'],
    isMember: boolean,
  ) => {
    setLoading(true);
    if (isMember) {
      await leaveRedditCommunity(community._id, community.name);
      return;
    }

    await joinRedditCommunity(community._id, community.name);
  };

  return { onJoinOrLeaveCommunity, loading, communityError } as const;
};

export default useCommunityData;
