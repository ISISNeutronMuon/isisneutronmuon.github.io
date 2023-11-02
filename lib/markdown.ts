import matter from 'gray-matter';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import { unified } from 'unified';

// Take a string and process it as if it were markdown with frontmatter formatted
// as YAML.
// Simplified interface to gray-matter to just return the frontmatter as an Object
// and content as a string
export function readMarkdownWithFrontmatter(input: string): { frontmatter: { [key: string]: any }, body: string } {
  const { data, content } = matter(input);
  return { frontmatter: data, body: content }
}

export function markdownToHtml(markdown: string) {
  // @ts-expect-error: unknown node.
  const result = unified().use(remarkParse).use(remarkHtml).processSync(markdown)
  return result.toString()
}
