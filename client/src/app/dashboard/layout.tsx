import React, { FC } from 'react';
import Sidebar from './_components/Sidebar';

import Navbar from './_components/Navbar';
import OrgSidebar from './_components/OrgSideBar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}


const Layout: FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <main className="flex overflow-hidden h-full">
      <Sidebar />
      <div className="pl-[60px] h-screen flex-1">
        <div className="flex gap-x-3 h-full">
          <OrgSidebar />
          <div className="h-full flex-1 bg-background">
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Layout;
