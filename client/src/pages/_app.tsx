import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
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
  return (
    <ChakraProvider theme={theme}>
        <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
