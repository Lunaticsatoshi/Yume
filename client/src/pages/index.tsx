import type { NextPage } from 'next';
import { withAuthUser } from 'next-firebase-auth';
import { Layout } from 'src/components';

const Home = () => {
  return (
    <Layout title="Reddit">
      <div className="w-full h-full">
        <div className="text-2xl h-200">Hello</div>
      </div>
    </Layout>
  );
};

export default withAuthUser()(Home);
