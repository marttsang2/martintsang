import Navbar from '@/components/Navbar/Navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import Router from "next/router";
import { useEffect, useState } from 'react'
import LoadingScreen from '@/components/Loading/LoadingScreen'

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("finished");
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <ThemeProvider attribute='class' defaultTheme='dark'>
          <div className='min-h-screen bg-slate-50 dark:bg-slate-800'>
            <Head>
              <title>Martin Tsang</title>
            </Head>
            <Navbar/>
            <Component {...pageProps} />
          </div>
        </ThemeProvider>
      )}
    </>
  );
}
