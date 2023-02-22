import { useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import { withAuthUser, AuthAction } from 'next-firebase-auth';
import { useRouter } from 'next/router';

import { useAuthState } from 'src/hooks';
import {
  PageContentLayout,
  CreatePostForm,
  AboutCommunity,
  Layout,
} from 'src/components';
import useCommunityData from '../../../hooks/useCommunityData';
import CommunityRight from 'src/container/Community/CommunityRight';
import CreateCommunity from 'src/container/Community/CreateCommunity';

const CreateCommunityPostPage = () => {
  const { user } = useAuthState();
  const router = useRouter();
  const { community } = router.query;
  // const visitedCommunities = useRecoilValue(communityState).visitedCommunities;
  const { loading } = useCommunityData();

  /**
   * Not sure why not working
   * Attempting to redirect user if not authenticated
   */
  //   useEffect(() => {
  //     if (!user && !loadingUser && communityStateValue.currentCommunity.id) {
  //       router.push(`/r/${communityStateValue.currentCommunity.id}`);
  //     }
  //   }, [user, loadingUser, communityStateValue.currentCommunity]);

  //   console.log("HERE IS USER", user, loadingUser);

  return (
    <Layout title="Submit">
      <PageContentLayout maxWidth="max-w-[1060px]">
        <>
          <div className="border-solid border-b border-white px-4">
            <Text fontWeight={600}>Create a post</Text>
          </div>
          <CreateCommunity />
        </>
        <>
          <CommunityRight />
        </>
      </PageContentLayout>
    </Layout>
  );
};

export default withAuthUser({
  whenAuthed: AuthAction.RENDER,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: () => <>Loading...</>,
})(CreateCommunityPostPage);
