import { useEffect, useState } from 'react';

import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import isDeepEqual from 'fast-deep-equal/react';
import { useEffectOnce, usePrevious } from 'react-use';

import {
  initializeApollo,
  mergeAndRestoreCache,
  APOLLO_STATE_PROP_NAME,
} from 'src/apollo/client';

export function useApollo(pageProps: Record<string, unknown>): {
  client: ApolloClient<NormalizedCacheObject> | undefined;
} {
  const state = pageProps[APOLLO_STATE_PROP_NAME] as
    | NormalizedCacheObject
    | undefined;
  const previousState = usePrevious(state);

  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();

  useEffectOnce(() => {
    function init() {
      const newClient = initializeApollo();
      // mergeAndRestoreCache(newClient, state);
      setClient(newClient);
    }

    init();
  });

  useEffect(() => {
    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here during page transitions
    if (
      client &&
      state &&
      previousState &&
      !isDeepEqual(state, previousState)
    ) {
      mergeAndRestoreCache(client, state);
    }
  }, [state, previousState, client]);

  useEffect(() => {
    const logout = async () => {
      await client?.resetStore();
      localStorage.clear();
    };

    document.addEventListener('APP_LOGOUT', logout);

    return () => document.removeEventListener('APP_LOGOUT', logout);
  });

  return { client };
}
