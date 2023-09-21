import FormattedDate from '@/components/formatted-date'
import { getAllPosts } from '@/lib/blog'
import Link from 'next/link'

import MDXContent from './index.md'

export default function Page() {
  const posts = getAllPosts()
  return (<>
    <article className="prose mb-4">
      <MDXContent />
    </article>
    <div className="prose">
      <h2 className="my-0">Posts</h2>
      <ul className="list-none">
        {
          posts.map((item) => (
            <li key={item.title}><span className="text-xs text-slate-400"><FormattedDate date={item.date} /></span>
              <Link href={`/blog/${item.slug}`}><h3 className="my-0 text-2xl">{item.title}</h3></Link>
            </li>
          ))
        }
      </ul>
    </div>
  </>
  )
}
