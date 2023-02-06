import type { NextPage } from 'next';
import { Layout } from 'src/components';

const Home: NextPage = () => {
  return (
    <Layout title="Reddit">
      <div className="w-full h-full">
        <div className="text-2xl h-200">Hello</div>
      </div>
    </Layout>
  );
};

export default Home;
