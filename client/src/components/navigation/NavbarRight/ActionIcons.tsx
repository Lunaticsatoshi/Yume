import React from 'react';
import {
  ArrowCircleUpRight,
  Bell,
  ChatCircleDots,
  Funnel,
  Plus,
  VideoCamera,
} from 'phosphor-react';

const ActionIcons = () => {
  return (
    <div className="flex items-center">
      <div className="justify-between items-center hidden md:flex">
        <div className="mx-1.5 p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-black-400 rounded-3xl">
          <ArrowCircleUpRight size={25} />
        </div>
        <div className="mx-1.5 p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-black-400 rounded-3xl">
          <Funnel size={25} />
        </div>
        <div className="mx-1.5 p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-black-400 rounded-3xl">
          <VideoCamera size={25} />
        </div>
      </div>
      <>
        <div className="mx-1.5 p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-black-400 rounded-3xl">
          <ChatCircleDots size={25} />
        </div>
        <div className="mx-1.5 p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-black-400 rounded-3xl">
          <Bell size={25} />
        </div>
        <div className="mx-1.5 p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-black-400 rounded-3xl">
          <Plus size={25} />
        </div>
      </>
    </div>
  );
};

export default ActionIcons;
