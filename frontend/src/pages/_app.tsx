import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import MainLayout from '../components/layouts/SimpleLayout';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);
  return getLayout(<Component {...pageProps} />);
}

export default MyApp;