import { FC, ReactNode, useEffect } from 'react';
import Head from 'next/head';

import { AuthModalContextProvider } from 'src/contexts';

import Navbar from '../navigation/Navbar';

type LayoutProps = {
  title: string;
  description?: string;
  keywords?: string;
  children: JSX.Element | ReactNode;
};

const Layout: FC<LayoutProps> = ({
  title,
  description,
  keywords,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <AuthModalContextProvider>
        <div className="relative">
          <Navbar />
          <div className="main-content flex justify-between h-full bg-gray-100">
            {children}
          </div>
        </div>
      </AuthModalContextProvider>
    </>
  );
};

Layout.defaultProps = {
  title: 'Reddit',
  description: 'A blogging platform for developers',
  keywords: 'social media, youtuber, social media influencer',
};

export default Layout;
