import Navbar from '@/components/Navbar';
import '@/styles/globals.css'
import {
  ClerkProvider, SignedIn,
  SignedOut,
  RedirectToSignIn,
} from '@clerk/nextjs';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import type { AppProps } from 'next/app'
import { useRouter } from "next/router";
import { useEffect } from 'react';

const publicPages: Array<string> = ['/', '/gallery'];

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  const isPublicPage = publicPages.includes(pathname);
  return (
    <ClerkProvider appearance={{baseTheme:'dark'}} {...pageProps} >
      <Navbar />
      {isPublicPage ? (
        <Component {...pageProps} />
      ) : (
        <>
          <SignedIn>
            <Component {...pageProps} />
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>
      )}
    </ClerkProvider>
  );
}
