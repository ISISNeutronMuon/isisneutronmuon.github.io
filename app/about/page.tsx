import PageTitle from '@/components/page-title'

import MDXContent, { frontmatter } from './about.md'

export default function Page() {
  return (<>
    <article className="prose">
      <PageTitle title={frontmatter.title} />
      <MDXContent />
    </article>
  </>
  )
}
