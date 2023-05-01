import Navbar from '@/components/Navbar';
import { getUser, registerUser } from '@/lib/db';
import '@/styles/globals.css'
import {
  ClerkProvider, SignedIn,
  SignedOut,
  RedirectToSignIn,
} from '@clerk/nextjs';
import type { AppProps } from 'next/app'
import { useRouter } from "next/router";

const publicPages: Array<string> = ['/', '/gallery'];

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  const isPublicPage = publicPages.includes(pathname);
  return (
    <ClerkProvider {...pageProps} >
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
