import { Fragment } from 'react';

import { Layout, PageContentLayout } from 'src/components';
import CommunityHeader from 'src/container/Community/CommunityHeader';
import CommunityRight from 'src/container/Community/CommunityRight';
import CommunityLeft from 'src/container/Community/CommunityLeft';

const CommunityPage = () => {
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
        <CommunityHeader />
        {/* Posts & Sidebar */}
        <PageContentLayout>
          <><CommunityLeft /></>
          <><CommunityRight /></>
        </PageContentLayout>
      </Fragment>
    </Layout>
  );
};

export default CommunityPage;
