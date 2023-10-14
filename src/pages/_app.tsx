import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import Layout from '@/components/Layout/Layout'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  console.log(router);
  if(router.pathname === '/_error') return <Component {...pageProps} />;

  return (
    <ThemeProvider attribute='class' defaultTheme='light'>
      <div className='min-h-screen bg-slate-50 dark:bg-slate-800'>
        <Head>
          <title>{`Martin's Personal Web`}</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </ThemeProvider>
  );
}
