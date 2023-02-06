import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { useApollo } from 'src/hooks';
import initAuth from 'src/utils/initAuth';

initAuth();

export const theme = extendTheme({
  colors: {
    brand: {
      100: '#FF3C00',
    },
  },
  fonts: {
    body: 'Open Sans, sans-serif',
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const { client } = useApollo(pageProps);
  return (
    <>
      {client && (
        <ApolloProvider client={client}>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </ApolloProvider>
      )}
    </>
  );
}

export default MyApp;
