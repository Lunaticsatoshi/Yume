import React, { FC } from 'react';
import Image from 'next/image';

interface IGoogleOAuthButtonProps {
  onClick: () => unknown;
}

export const GoogleOAuthButton: FC<IGoogleOAuthButtonProps> = ({ onClick }) => {
  return (
    <div className="flex flex-col mb-4" onClick={onClick}>
      <div className="bg-white px-2 flex justify-between items-center py-2 border-gray-300 border-2 text-xs font-bold text-black rounded-3xl px w-full mb-4">
        <div className="w-10">
          <Image src="/images/googlelogo.png" height={20} width={20} />
        </div>
        <div className="w-full ml-14">Continue with Google</div>
      </div>
    </div>
  );
};
