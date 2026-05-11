import Heading from '@/components/heading'

import MDXContent, { frontmatter } from './about.mdx'

export default function Page() {
  return (<>
    <article className="prose">
      <Heading level={1}>{frontmatter.title}</Heading>
      <MDXContent />
    </article>
  </>
  )
}
