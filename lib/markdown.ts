import remarkParse from 'remark-parse'
import remarkHtml from 'remark-html'
import { unified } from 'unified'


export function markdownToHtml(markdown: string) {
  // @ts-expect-error: unknown node.
  const result = unified().use(remarkParse).use(remarkHtml).processSync(markdown)
  return result.toString()
}
