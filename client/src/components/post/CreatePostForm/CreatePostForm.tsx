import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { NotePencil, ImageSquare, Link, ListNumbers, Microphone } from 'phosphor-react';

import TabItem from '../../tabs/TabItem';
import TextInputs from './TextInputs';
import ImageUpload from './ImageUpload';

const formTabs = [
  {
    title: 'Post',
    icon: <NotePencil size={14} />,
  },
  {
    title: 'Images & Video',
    icon: <ImageSquare size={14} />,
  },
  {
    title: 'Link',
    icon: <Link size={14} />,
  },
  {
    title: 'Poll',
    icon: <ListNumbers size={14} />,
  },
  {
    title: 'Talk',
    icon: <Microphone size={14} />,
  },
];

export type TabItem = {
  title: string;
  icon: JSX.Element;
};

type CreatePostFormProps = {
  communityId: string;
  communityImageURL?: string;
//   user: User;
};

const CreatePostForm: React.FC<CreatePostFormProps> = ({
  communityId,
  communityImageURL,
//   user,
}) => {
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: '',
    body: '',
  });
  const [selectedFile, setSelectedFile] = useState<string>();
  const selectFileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [createPostError, setCreatePostError] = useState('');
  const router = useRouter();

  const handleCreatePost = async () => {
    setLoading(true);
    const { title, body } = textInputs;
    try {
      await console.log('HERE IS NEW POST ID');

      // Clear the cache to cause a refetch of the posts
    //   setPostItems((prev) => ({
    //     ...prev,
    //     postUpdateRequired: true,
    //   }));
      router.back();
    } catch (error) {
      console.log('createPost error', error);
      setCreatePostError('Error creating post');
    }
    setLoading(false);
  };

  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target?.result as string);
      }
    };
  };

  const onTextChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col bg-white dark:bg-black-500 rounded-md mt-2">
      <div className="w-full flex justify-between gap-2 mb-2">
        {formTabs.map((item, index) => (
          <TabItem
            key={index}
            item={item}
            selected={item.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </div>
      <div className="p-4">
        {selectedTab === 'Post' && (
          <TextInputs
            textInputs={textInputs}
            onChange={onTextChange}
            handleCreatePost={handleCreatePost}
            loading={loading}
          />
        )}
        {selectedTab === 'Images & Video' && (
          <ImageUpload
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            setSelectedTab={setSelectedTab}
            selectFileRef={selectFileRef}
            onSelectImage={onSelectImage}
          />
        )}
      </div>
    </div>
  );
};
export default CreatePostForm;
