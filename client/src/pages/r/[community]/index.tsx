import { Fragment, useState } from 'react';
import { useRouter } from 'next/router';

import { Layout, PageContentLayout } from 'src/components';
import CommunityHeader from 'src/container/Community/CommunityHeader';
import Image from 'next/image';
import classNames from 'src/utils/classnames';

const CommunityPage = () => {
  // Local state
  const [ownCommunity, setOwnCommunity] = useState(false);
  // Global state
  //   const { authenticated, user } = useAuthState();
  // Utils
  const router = useRouter();

  const subName = router.query.sub;
  const community = {
    name: '',
    imageUrl: '',
    bannerUrl: '',
    title: '',
  };

  //   useEffect(() => {
  //     if (!sub) return;
  //     setOwnSub(authenticated && user.username === sub.username);
  //   }, [sub]);

  //   if (error) router.push('/');

  //   let postsMarkup;
  //   if (!sub) {
  //     postsMarkup = <p className="text-lg text-center">Loading..</p>;
  //   } else if (sub.posts.length === 0) {
  //     postsMarkup = <p className="text-lg text-center">No posts submitted yet</p>;
  //   } else {
  //     postsMarkup = sub.posts.map((post) => (
  //       <PostCard key={post.identifier} post={post} revalidate={revalidate} />
  //     ));
  //   }

  return (
    <Layout title="Reddit">
      <Fragment>
          <CommunityHeader community={community} ownCommunity={ownCommunity} />
        {/* Posts & Sidebar */}
        <PageContentLayout>
            <>Left Content</>
            <>Right Content</>
        </PageContentLayout>
      </Fragment>
    </Layout>
  );
};

export default CommunityPage;
