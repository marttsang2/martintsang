import type { ReactElement } from 'react'
import type { NextPageContext } from "next";
import Error, { ErrorProps } from "next/error";
import Image from 'next/image';
import Link from 'next/link';

function CustomError({ statusCode }: ErrorProps) {
  return (
    <div className='fixed top-0 left-0 w-full h-[90vh] flex flex-col gap-3 justify-center items-center'>
      <Image src='/error.svg' alt='not found error' width={700} height={600} quality={100} />
      <p className='text-2xl font-bold'>Oops! Page not Found</p>
      <p className='text-md text-slate-500'>{`We couldn't find the page you were looking for.`}</p>
      <Link href='/' className='mt-4'>
        <p className='text-md font-bold bg-slate-400 hover:bg-slate-600 text-white px-2 py-1 rounded-md'>Go back to Home</p>
      </Link>
    </div>
  );
}

CustomError.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

CustomError.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default CustomError;