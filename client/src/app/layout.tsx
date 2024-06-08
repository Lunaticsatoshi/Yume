import type { Metadata } from 'next';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from 'src/hooks';
import { Inter } from 'next/font/google';

import { ThemeProvider } from '@/providers/theme-provider';
import { ApolloWrapper } from '@/providers/apollo-wrapper';

import './global.css';

export const metadata: Metadata = {
  title: 'Yume',
  description: 'Digital collaboration whiteboard',
};
// eslint-disable-next-line new-cap
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ApolloWrapper>{children}</ApolloWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
