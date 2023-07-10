import Layout from '@/components/Layout';
import { IsLoginProvider } from '@/modules/context/IsLoginContext';

import '@/styles/globals.css';
import '@/styles/font.css'
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <IsLoginProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </IsLoginProvider>
  );
}
