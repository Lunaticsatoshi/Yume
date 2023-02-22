import React, { useState } from 'react';
import { MenuItem } from '@chakra-ui/react';
import { Plus } from 'phosphor-react';

import { CreateCommunityModal } from 'src/components';
import { GetCurrentUserQuery } from 'src/generated/graphql';
import DirectoryMenuListItem from './DirectoryMenuListItem';

type CommunitiesProps = {
  menuOpen: boolean;
  user: GetCurrentUserQuery['getCurrentUser'];
};

const Communities: React.FC<CommunitiesProps> = ({ menuOpen, user }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CreateCommunityModal isOpen={open} handleClose={() => setOpen(false)} />
      {/* COULD DO THIS FOR CLEANER COMPONENTS */}
      {/* <Moderating snippets={snippetState.filter((item) => item.isModerator)} />
      <MyCommunities snippets={snippetState} setOpen={setOpen} /> */}
      {/* {mySnippets.find((item) => item.isModerator) && (
        <div mt={3} mb={4}>
          <div pl={3} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">
            MODERATING
          </div>
          {mySnippets
            .filter((item) => item.isModerator)
            .map((snippet) => (
              <DirectoryMenuListItem
                key={snippet.communityId}
                displayText={`r/${snippet.communityId}`}
                link={`/r/${snippet.communityId}`}
                icon={FaReddit}
                iconColor="brand.100"
              />
            ))}
        </div>
      )} */}
      <div className="mt-3 mb-4">
        <div
          style={{ fontSize: '8pt' }}
          className="pl-4 mb-2 font-medium text-gray-500"
        >
          MY COMMUNITIES
        </div>
        <MenuItem
          width="100%"
          fontSize="10pt"
          _hover={{ bg: 'gray.100' }}
          onClick={() => setOpen(true)}
        >
          <div className="flex items-center">
            <Plus size={20} className="mr-2" />
            Create Community
          </div>
        </MenuItem>
        {user?.communities ? (
          <>
            {user.communities.map((community) => (
              <DirectoryMenuListItem
                key={community._id}
                displayText={`r/${community.name}`}
                link={`/r/${community.name}`}
                imageURL={community.imageUrl || ''}
              />
            ))}
          </>
        ) : null}
      </div>
    </>
  );
};

export default Communities;
