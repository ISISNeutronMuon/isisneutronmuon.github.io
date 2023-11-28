import matter from 'gray-matter';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
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
  const result = unified()
    .use(remarkParse)
    .use(remarkRehype).use(rehypeSanitize).use(rehypeStringify)
    .processSync(markdown)
  return result.toString()
}
