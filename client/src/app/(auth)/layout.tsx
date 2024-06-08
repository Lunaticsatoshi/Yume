import React from 'react';

type Props = { children: React.ReactNode };

const Layout = ({ children }: Props) => {
  return (
    <div className="bg-background flex items-center justify-center h-screen w-full">
      {children}
    </div>
  );
};

export default Layout;
