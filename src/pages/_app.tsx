import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import { useState } from 'react'
import LoadingScreen from '@/components/Loading/LoadingScreen'
import Layout from '@/components/Layout/Layout'

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  
  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <ThemeProvider attribute='class' defaultTheme='light'>
          <div className='min-h-screen bg-slate-50 dark:bg-slate-800'>
            <Head>
              <title>{`Martin's Personal Website`}</title>
            </Head>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </div>
        </ThemeProvider>
      )}
    </>
  );
}
