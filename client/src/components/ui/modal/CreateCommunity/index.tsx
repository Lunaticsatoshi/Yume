import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  Divider,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Stack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Eye, LockSimple, User } from 'phosphor-react';

import { useCreateCommunityMutation, CommunityType } from 'src/generated/graphql';

import ModalWrapper from '../ModalWrapper';

type CreateCommunityModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  isOpen,
  handleClose,
}) => {
  //   const setSnippetState = useSetRecoilState(communityState);
  const [name, setName] = useState('');
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [nameError, setNameError] = useState('');
  const [communityType, setCommunityType] = useState<CommunityType>(CommunityType.Public);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [createCommunity] = useCreateCommunityMutation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;
    setName(event.target.value);
    setCharsRemaining(21 - event.target.value.length);
  };

  const handleCreateCommunity = () => {
    const communityName = name.replace(/\s/g, '').toLowerCase();
    createCommunity({
      variables: {
        data: {
          name: communityName,
          title: name,
          communityType,
        }
      }
    });
    handleClose();
    setTimeout(() => {
      router.push(`r/${communityName}`);
    }, 2000);
    setLoading(false);
  };

  const onCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      target: { value },
    } = event;
    if (value === communityType) return;
    setCommunityType(value as CommunityType);
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={handleClose}>
      <ModalHeader
        display="div"
        className="flex flex-col text-sm p-3 dark:bg-black-500 dark:text-white rounded-t-md"
      >
        Create a community
      </ModalHeader>
      <div className="px-3 dark:bg-black-500 dark:text-white">
        <Divider />
        <ModalCloseButton />
        <ModalBody display="div" flexDirection="column" padding="10px 0px">
          <div className="text-lg font-semibold">Name</div>
          <div className="text-gray-500 text-sm">
            Community names including capitalization cannot be changed
          </div>
          <div className="text-gray-400 relative top-[28px] left-[10px] w-5">
            r/
          </div>
          <Input
            position="relative"
            name="name"
            value={name}
            onChange={handleChange}
            pl="22px"
            type={''}
            size="sm"
          />
          <div
            className={`text-xs pt-2 ${
              charsRemaining === 0 ? 'text-red-500' : 'text-gray-500'
            }`}
          >
            {charsRemaining} Characters remaining
          </div>
          <div className="text-xs text-red-600 pt-1">{nameError}</div>
          <div className="mx-4 my-2">
            <div className="text-lg font-semibold">Community Type</div>
            <Stack spacing={2} pt={1}>
              <Checkbox
                colorScheme="blue"
                value={CommunityType.Public}
                isChecked={communityType === CommunityType.Public}
                onChange={onCommunityTypeChange}
              >
                <div className="flex items-center">
                  <User size={12} className="text-gray-500 mr-2" />
                  <div className="text-xs mr-1">Public</div>
                  <div className="text-xs text-gray-500">
                    Anyone can view, post, and comment to this community
                  </div>
                </div>
              </Checkbox>
              <Checkbox
                colorScheme="blue"
                value={CommunityType.Restricted}
                isChecked={communityType === CommunityType.Restricted}
                onChange={onCommunityTypeChange}
              >
                <div className="flex items-center">
                  <Eye size={12} className="text-gray-500 mr-2" />
                  <div className="text-xs mr-1">Restricted</div>
                  <div className="text-xs text-gray-500 whitespace-nowrap">
                    Anyone can view this community, but only approved users can
                    post
                  </div>
                </div>
              </Checkbox>
              <Checkbox
                colorScheme="blue"
                value={CommunityType.Private}
                isChecked={communityType === CommunityType.Private}
                onChange={onCommunityTypeChange}
              >
                <div className="flex items-center">
                  <LockSimple size={12} className="text-gray-500 mr-2" />
                  <div className="text-xs mr-1">Private</div>
                  <div className="text-xs text-gray-500">
                    Only approved users can view and submit to this community
                  </div>
                </div>
              </Checkbox>
            </Stack>
          </div>
        </ModalBody>
      </div>
      <ModalFooter className="dark:bg-black-200 rounded-b-md">
        <Button
          variant="outline"
          height="30px"
          mr={2}
        //   color="white"
          borderRadius="20px"
          className=" text-white"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="solid"
          height="30px"
          onClick={handleCreateCommunity}
          isLoading={loading}
          borderRadius="20px"
        >
          Create Community
        </Button>
      </ModalFooter>
    </ModalWrapper>
  );
};
export default CreateCommunityModal;
