import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import merge from 'deepmerge';
import isDeepEqual from 'fast-deep-equal/react';
import { setContext } from '@apollo/client/link/context';
import { getIdToken, getAuth, Auth, User } from 'firebase/auth';

export const APOLLO_STATE_PROP_NAME = '__STATE__';

const isServer = (): boolean => typeof window === 'undefined';

// eslint-disable-next-line init-declarations
export let apolloClient: ApolloClient<NormalizedCacheObject>;

const checkIfPublicRoute = () => {
  if (window?.location.href.includes('curation-builder')) {
    return true;
  }

  return false;
};

const waitForAuthStateChange = (auth: Auth): Promise<User> => {
  return new Promise((resolve) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      }
    });
  });
};

const authLink = setContext(async (_, { headers }) => {
  let token = '';
  const isPublicRoute = checkIfPublicRoute();
  if (!isPublicRoute) {
    const auth = getAuth();
    if (!auth.currentUser) {
      const user = await waitForAuthStateChange(auth);
      token = await user.getIdToken();
    } else {
      token = await getIdToken(auth.currentUser);
    }
  } else {
    // eslint-disable-next-line no-console
    console.log('Not authorized to make api requests');
  }
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export function createCache() {
  return new InMemoryCache();
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const httpLink = createHttpLink({
  uri: API_URL,
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: isServer(),
    link: ApolloLink.from([authLink, httpLink]),
    cache: createCache(),
    connectToDevTools: process.env.NODE_ENV !== 'production',
  });
}

function mergeCache(
  cache1: NormalizedCacheObject,
  cache2: NormalizedCacheObject,
) {
  return merge(cache1, cache2, {
    // Combine arrays using object equality (like in sets)
    arrayMerge: (destinationArray, sourceArray) => [
      ...sourceArray,
      ...destinationArray.filter((d) =>
        sourceArray.every((s) => !isDeepEqual(d, s)),
      ),
    ],
  });
}

export function initializeApollo(): ApolloClient<NormalizedCacheObject> {
  const client = apolloClient ?? createApolloClient();

  // For SSG and SSR always create a new Apollo Client
  if (isServer()) return client;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = client;

  return client;
}

export function mergeAndRestoreCache(
  client: ApolloClient<NormalizedCacheObject>,
  state: NormalizedCacheObject | undefined,
) {
  if (!state) return;

  // Get existing cache, loaded during client side data fetching
  const existingCache = client.extract();
  // Merge the existing cache into data passed from getStaticProps/getServerSideProps
  const data = mergeCache(state, existingCache);
  // Restore the cache with the merged data
  client.cache.restore(data);
}
