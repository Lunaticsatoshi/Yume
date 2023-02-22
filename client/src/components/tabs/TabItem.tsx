import React from 'react';

import { TabItem } from '../post/CreatePostForm/CreatePostForm';

type TabItemProps = {
  item: TabItem;
  selected: boolean;
  setSelectedTab: (value: string) => void;
};

const TabItem: React.FC<TabItemProps> = ({
  item,
  selected,
  setSelectedTab,
}) => {
  return (
    <div
      className={`flex justify-center items-center px-6 py-4 w-full whitespace-nowrap cursor-pointer font-bold border-r-gray-200 hover:bg-gray-50 ${
        selected
          ? 'text-blue-500 border-t-0 border-r-1 border-b-2 border-l-0 border-b-blue-500 dark:border-b-white'
          : 'text-gray-500 border-t-0 border-r-1 border-b-1 border-l-0 border-gray-200'
      }`}
      onClick={() => setSelectedTab(item.title)}
    >
      <div className="flex items-center h-5 mr-2">
        {item.icon}
      </div>
      <div className="text-sm">{item.title}</div>
    </div>
  );
};
export default TabItem;
