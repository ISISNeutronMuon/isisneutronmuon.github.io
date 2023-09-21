import FormattedDate from "@/components/formatted-date"
import { getAllPosts, getPostBySlug, markdownToHtml } from "@/lib/blog"

type Params = {
  params: {
    slug: string
  }
}

// Only pages that exist in _posts should return content, everything else should
// be a 404
// See https://nextjs.org/docs/app/api-reference/functions/generate-static-params
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPost({ params }: Params) {
  const post = getPostBySlug(params.slug)
  const content = await markdownToHtml(post.content || '')

  return (
    <article className="prose">
      <div className="mb-1 px-1 text-center leading-none">
        <div className="mb-1 text-slate-500">
          <FormattedDate date={post.date} />
        </div>
        <h1 className="ml-1">{post.title}</h1>
        <hr />
      </div>
      <div dangerouslySetInnerHTML={{ __html: content.toString() }} />
    </article>
  )
}
