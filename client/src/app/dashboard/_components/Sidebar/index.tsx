'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import List from './List';
import NewButton from './NewButton';
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from '@/components/ui/tooltip';
// import { menuOptions } from '@/lib/constant';
// import clsx from 'clsx';
import { Separator } from '@/components/ui/separator';
// import { Database, GitBranch, LucideMousePointerClick } from 'lucide-react';
// import { ModeToggle } from '../global/mode-toggle';

type Props = {};

const MenuOptions = (props: Props) => {
  const pathName = usePathname();

  return (
    <nav className="bg-blue-950 dark:bg-black fixed z-[1] left-0 h-full w-[70px] flex p-4 flex-col gap-y-4 text-white">
      <Link className="flex justify-center align-center text-center font-bold flex-row " href="/">
        Yume
      </Link>
      <Separator />
      <List />
      <NewButton />
      {/* <div className="flex items-center flex-col gap-9 dark:bg-[#353346]/30 py-4 px-2 rounded-full h-56 overflow-scroll border-[1px]">
          <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
            <LucideMousePointerClick
              className="dark:text-white"
              size={18}
            />
            <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]" />
          </div>
          <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
            <GitBranch
              className="text-muted-foreground"
              size={18}
            />
            <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]"></div>
          </div>
          <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
            <Database
              className="text-muted-foreground"
              size={18}
            />
            <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]"></div>
          </div>
          <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
            <GitBranch
              className="text-muted-foreground"
              size={18}
            />
          </div>
        </div> */}
    </nav>
  );
};

export default MenuOptions;
