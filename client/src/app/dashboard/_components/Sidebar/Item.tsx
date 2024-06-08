'use client';

import { FC } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

import { ItemPropsType } from './types';

const Item: FC<ItemPropsType> = ({
  id,
  imageUrl,
  name,
  isActive,
  setActive,
}) => {
  const onClick = () => {
    if (!setActive) return;

    setActive({
      id,
    });
  };

  return (
    <div className="aspect-square relative">
      <Image
        src={imageUrl}
        onClick={onClick}
        alt={name}
        fill
        className={cn(
          "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
          isActive && "opacity-100"
        )}
      />
    </div>
  );
};

export default Item;
