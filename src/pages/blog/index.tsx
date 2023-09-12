import NotionService from '@/services/notion-service';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { format } from 'date-fns'

export async function getStaticProps() {
  const notionService = new NotionService();
  const response = await notionService.getPublishedBlogPosts();
  return {
    props: {
      blogs: response,
    },
  }
}

const Blog = ({ blogs }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className='max-w-2xl mx-auto pt-32 px-4'>
      <div>
        {blogs.map((blog) => {
          return (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className=''
            >
              <div className='flex items-start justify-between'>
                <div className=''>
                  <p className='text-xl font-bold'>{blog.title}</p>
                  <p className='text-sm'>{blog.description}</p>
                  <p className='text-xs mt-6'>Updated at {format(new Date(blog.date), 'MMM dd')}</p>
                </div>
                <Image
                  src={blog.cover}
                  alt={blog.title}
                  className='object-cover rounded-md'
                  width={120}
                  height={120}
                />
              </div>
              <div className='w-full h-[1px] bg-gradient-to-r from-black dark:from-white to-transparent my-4'></div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Blog