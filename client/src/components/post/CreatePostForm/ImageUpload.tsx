import React, { Ref } from 'react';
import { Flex, Stack, Button, Image } from '@chakra-ui/react';
import { ActionButton, OutlineActionButton } from '../../ui/Button';

type ImageUploadProps = {
  selectedFile?: string;
  setSelectedFile: (value: string) => void;
  setSelectedTab: (value: string) => void;
  selectFileRef: React.RefObject<HTMLInputElement>;
  onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  selectedFile,
  setSelectedFile,
  setSelectedTab,
  selectFileRef,
  onSelectImage,
}) => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      {selectedFile ? (
        <>
          <Image
            src={selectedFile as string}
            maxWidth="400px"
            maxHeight="400px"
          />
          <Stack direction="row" mt={4}>
            <ActionButton onClick={() => setSelectedTab('Post')}>
              Back to Post
            </ActionButton>
            <OutlineActionButton onClick={() => setSelectedFile('')}>
              Remove
            </OutlineActionButton>
          </Stack>
        </>
      ) : (
        <div className="flex justify-center items-center p-20 border border-dashed border-gray-200 dark:border-black-200 rounded-md w-full">
          <OutlineActionButton onClick={() => selectFileRef.current?.click()}>
            Upload
          </OutlineActionButton>
          <input
            id="file-upload"
            type="file"
            accept="image/x-png,image/gif,image/jpeg"
            hidden
            ref={selectFileRef}
            onChange={onSelectImage}
          />
        </div>
      )}
    </div>
  );
};
export default ImageUpload;
