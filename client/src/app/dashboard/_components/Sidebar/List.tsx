'use client';

import { useState } from 'react';

import Item from './Item';

const List = () => {
  const [active, setActive] = useState({ id: '1' });
  const userMemberships = [
    {
      organization: {
        id: '1',
        name: 'fuzzie',
        imageUrl:
          'https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yYzZld2IxU2hHaU4zdW44RWZkN0dtak5nbGIiLCJyaWQiOiJvcmdfMmgwN09nZ2s2QnF3SjMxWElPRGVyN3FuZ0pzIiwiaW5pdGlhbHMiOiJUIn0',
      },
    },
    {
      organization: {
        id: '2',
        name: 'Airbnb',
        imageUrl:
          'https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yYzZld2IxU2hHaU4zdW44RWZkN0dtak5nbGIiLCJyaWQiOiJvcmdfMmgwN0pSTUsxNUFXTk5IakxzanNFb1dGaXZxIiwiaW5pdGlhbHMiOiJBIn0',
      },
    },
  ];
  if (userMemberships?.length === 0) return null;

  return (
    <ul className="space-y-4">
      {userMemberships?.map((membership) => {
        return (
          <Item
            id={membership.organization.id}
            key={membership.organization.id}
            imageUrl={membership.organization.imageUrl}
            name={membership.organization.name}
            isActive={active.id === membership.organization.id}
            setActive={setActive}
          />
        );
      })}
    </ul>
  );
};

export default List;
