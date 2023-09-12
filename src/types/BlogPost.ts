type BlogTag = {
    id: string;
    name: string;
    color: string;
}

export type BlogPost = {
    id: string;
    cover: string;
    title: string;
    tags: BlogTag[];
    description: string;
    slug: string;
    date: Date;
}