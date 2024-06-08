import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

import { AvatarSetProps, Variant, AvatarProps } from './types';

const FallbackAvatar = () => {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
      <div>FA</div>
    </div>
  );
};

const getVariantSize = (variant: Variant): number => {
  switch (variant) {
    case 'xl':
      return 80;
    case 'lg':
      return 50;
    case 'lmd':
      return 40;
    case 'md':
      return 30;
    case 'sm':
      return 20;
  }
};

export const CustomAvatar = ({
  imageUri,
  variant,
  className,
  margins,
}: AvatarProps) => {
  return (
    <Avatar
      className={cn('w-5 h-5 rounded-full shadow-mdl', className)}
      style={{
        height: getVariantSize(variant),
        width: getVariantSize(variant),
        ...margins,
      }}
    >
      <AvatarImage src={imageUri} alt="avatar" />
      <AvatarFallback>
        <FallbackAvatar />
      </AvatarFallback>
    </Avatar>
  );
};

export const AvatarSet = ({
  avatarArray,
  variant,
  className,
}: AvatarSetProps) => {
  if (avatarArray.length === 1) {
    return (
      <CustomAvatar imageUri={avatarArray[0].imageUri} variant={variant} />
    );
  }

  return (
    <div
      className={cn(
        'flex flex-row-reverse gap-2 items-center justify-center',
        className,
      )}
    >
      {avatarArray.map((avatar, index) => (
        <CustomAvatar
          key={index}
          imageUri={avatar.imageUri}
          variant={variant}
          className={`w-5 h-5 rounded-full ${
            index === avatarArray.length - 1 ? '' : '-ml-4'
          } shadow-md border-2 border-card-border`}
          margins={{ marginLeft: index === avatarArray.length - 1 ? 0 : -8 }}
        />
      ))}
    </div>
  );
};

export default CustomAvatar;
