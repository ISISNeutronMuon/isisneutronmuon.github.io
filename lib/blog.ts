import fs from 'fs'
import { join } from 'path'

import { readMarkdownWithFrontmatter } from './markdown'

const postsDirectory = join(process.cwd(), 'app', 'blog', '_posts')

type Post = {
  slug: string,
  title: string,
  description: string,
  date: Date
  content: string,
}

export function getPostSlugs(): string[] {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug: string): Post {
  const { realSlug, fullPath } = mdFullPath(slug)
  const { frontmatter, body } = readMarkdownWithFrontmatter(fs.readFileSync(fullPath, 'utf8'))

  return {
    slug: realSlug,
    title: frontmatter.title,
    description: frontmatter.description,
    date: new Date(frontmatter.date),
    content: body
  }
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))

  return posts
}

export function mdFullPath(slug: string) {
  const realSlug = slug.replace(/\.md$/, '')
  return {
    realSlug: realSlug,
    fullPath: join(postsDirectory, `${realSlug}.md`)
  }
}
