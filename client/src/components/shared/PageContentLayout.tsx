import React, { ReactNode } from 'react';

interface PageContentLayoutProps {
  children: ReactNode;
  maxWidth?: string;
}

// Assumes array of two children are passed
const PageContentLayout: React.FC<PageContentLayoutProps> = ({
  children,
  maxWidth,
}) => {
  return (
    <div className="flex justify-center pt-4 pl-4">
      <div
        className={`flex justify-center w-[95%] ${maxWidth || 'max-w-[860px]'}`}
      >
        <div className="flex flex-col w-full md:w-[65%] md:mr-6">
          {children && children[0 as keyof typeof children]}
        </div>
        {/* Right Content */}
        <div className="hidden md:flex flex-col flex-grow">
          {children && children[1 as keyof typeof children]}
        </div>
      </div>
    </div>
  );
};

export default PageContentLayout;
