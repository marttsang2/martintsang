import NotionService from '@/services/notion-service';
import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType, PreviewData } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { ParsedUrlQuery } from 'querystring';
import ReactMarkdown from 'react-markdown';

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>) => {
  const notionService = new NotionService()

  if (!context.params?.slug || Array.isArray(context.params?.slug)) {
    throw ''
  }

  const p = await notionService.getSingleBlogPost(context.params?.slug)

  if (!p) {
    throw ''
  }

  return {
    props: {
      markdown: p.markdown,
      post: p.post
    },
  }
}

export async function getStaticPaths() {
  const notionService = new NotionService()

  const posts = await notionService.getPublishedBlogPosts()

  // Because we are generating static paths, you will have to redeploy your site whenever
  // you make a change in Notion.
  const paths = posts.map(post => {
    return `/blog/${post.slug}`
  })

  return {
    paths,
    fallback: false,
  }
}

const BlogPost = ({ markdown, post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name={"description"} title={"description"} content={post.description}/>
        <meta name={"og:title"} title={"og:title"} content={post.title}/>
        <meta name={"og:description"} title={"og:description"} content={post.description}/>
        <meta name={"og:image"} title={"og:image"} content={post.cover}/>
      </Head>

      <div className="pt-20 min-h-screen px-4">

        <main className="max-w-5xl mx-auto relative">
          <div className='relative w-full h-[320px] rounded-lg overflow-hidden mb-6'>
            <Image className='object-cover' src={post.cover} alt={post.title} fill />
          </div>
          <div className="flex items-center justify-center">
            <article className="prose text">
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </article>
          </div>
        </main>
      </div>
    </>
  )
}

export default BlogPost