import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import Layout from '@/components/Layout/Layout'
import { useRouter } from 'next/router'
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  if(['404'].some((errorCode) => router.pathname.includes(errorCode))) return <Component {...pageProps} />;

  return (
    <ThemeProvider attribute='class' defaultTheme='light'>
      <div className='min-h-screen bg-slate-50 dark:bg-slate-800'>
        <Head>
          <title>{`Martin's Personal Web`}</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </div>
    </ThemeProvider>
  );
}
