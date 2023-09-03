import Navbar from '@/components/Navbar/Navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute='class' defaultTheme='dark'>
      <div className='min-h-screen bg-slate-50 dark:bg-slate-800'>
        <Head>
          <title>Martin Tsang</title>
        </Head>
        <Navbar/>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  )
}
