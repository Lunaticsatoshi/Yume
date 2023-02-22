import React, { FC } from 'react';

interface ICreatePostInput {
  onClick: () => unknown;
}

const CreatePostInput: FC<ICreatePostInput> = ({ onClick }) => {
  return (
    <input
      placeholder="Create Post"
      type="text"
      className="text-sm w-full placeholder:text-gray-500 hover:bg-white hover:border hover:border-solid hover:border-blue-500 focus:outline-none focus:bg-white focus:border focus:border-solid focus:border-blue-500 bg-gray-50 dark:bg-black-400 border-gray-200 dark:border-black-200 h-9 rounded-md mr-4 px-4 py-1"
      onClick={onClick}
    />
  );
};

export default CreatePostInput;
