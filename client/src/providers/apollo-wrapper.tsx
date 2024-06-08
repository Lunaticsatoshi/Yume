'use client';

import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support';

import { initializeApollo } from '@/apollo/client';

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={initializeApollo}>
      {children}
    </ApolloNextAppProvider>
  );
}
