import { BlogPost } from "@/pages/types/BlogPost";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
export default class NotionService {
  client: Client
  n2m: NotionToMarkdown

  constructor() {
    this.client = new Client({
      auth: process.env.NOTION_SECRET,
    });
    this.n2m = new NotionToMarkdown({
      notionClient: this.client,
    });
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    const database = process.env.NOTION_DATABASE_ID ?? ''

    const response = await this.client.databases.query({
      database_id: database,
    });

    return response.results.map((res) => {
      return NotionService.pageToPostTransformer(res);
    });
  }

  async getSingleBlogPost(slug: string) {
    let post, markdown

    const database = process.env.NOTION_DATABASE_ID ?? ''
    const response = await this.client.databases.query({
      database_id: database,
      filter: {
        property: 'Slug',
        rich_text: {
          contains: slug
        }
      }
    })

    if (!response.results[0]) {
      throw "No results found"
    }

    const page = response.results[0]

    const mdBlocks = await this.n2m.pageToMarkdown(page.id);
    markdown = this.n2m.toMarkdownString(mdBlocks)
    post = NotionService.pageToPostTransformer(page);

    return {
      post,
      markdown: markdown?.parent ?? '',
    }
  }

  private static pageToPostTransformer(page: any): any {
    let cover = page.cover;

    switch (cover.type) {
    case 'file':
      cover = page.cover.file
      break;
    case 'external':
      cover = page.cover.external.url;
      break;
    default:
      // Add default cover image if you want...
      cover = ''
    }

    return {
      id: page.id,
      cover: cover,
      title: page.properties.Name.title[0].plain_text,
      tags: page.properties?.Tags?.multi_select,
      description: page.properties?.Description?.rich_text[0]?.text?.content ?? '',
      date: page.properties?.Updated?.last_edited_time,
      slug: page.properties?.Slug?.formula.string
    }
  }
}