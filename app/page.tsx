import FormattedDate from '@/components/formatted-date'
import { getAllPosts } from '@/lib/blog'
import { ssgInventory, loadProductDescriptions } from '@/lib/products'
import Link from 'next/link'

import { markdownToHtml } from '@/lib/markdown';

const introductoryText =
  'Software that enables researchers to process and interpret the experimental data\
  from more than 30 different instruments at the ISIS facility. \
  This software is essential for advancing scientific research and innovation in \
  various fields and domains.'

export default async function Page() {
  return (<>
    <article className="prose max-w-full">
      <p>{introductoryText}</p>
      {await productsJSX()}
    </article>
    <div className="prose max-w-full">
      {postsJSX()}
    </div>
  </>
  )
}

async function productsJSX() {
  const products = await loadProductDescriptions(ssgInventory);
  // Processing the markdown to HTML results in an outer <p></p> tag but we
  // dont need that as we want it inline with the list so strip it out
  let descriptionAsHtml = (product: ProductDescription) => {
    return markdownToHtml(product.description).replace(/^<p>(.*)<\/p>/, "$1")
  };
  return (
    <ul>
      {
        Object.values(products).map((product) => (
          <li key={product.name}><Link href={product.url || ''}>{product.name} </Link>
            <span dangerouslySetInnerHTML={{ __html: descriptionAsHtml(product) }}></span>
          </li>
        ))
      }
    </ul>
  )
}

function postsJSX() {
  const posts = getAllPosts();
  return (<div>
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
  </div>)
}
