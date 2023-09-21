import MDXContent, { frontmatter } from './about.md'

export default function Page() {
  return (<>
    <article className="prose">
      <header className="mb-8">
        <h1>{frontmatter.title}</h1>
      </header>
      <MDXContent />
    </article>
  </>
  )
}
