import { addBasePath } from 'next/dist/client/add-base-path';
import Link from 'next/link';
import FormattedDate from '@/components/formatted-date';
import { loadProductDescriptions, getLatestReleases, ssgInventory } from '@/lib/products';

const defaultReleaseIcon = 'deploy.png'

let releasesJSX = async () => {
  const products = await loadProductDescriptions(ssgInventory);
  const releases = await getLatestReleases(products);
  releases.sort((a, b) => a.date > b.date ? -1 : 1)

  return releases.map((releaseItem) => {
    const productName = releaseItem.productName;
    const product = products[productName];
    return <div key={productName} className="prose flex flex-col flex-wrap justify-around text-center border-dotted border-[1px] mx-[1px]">
      <Link href={releaseItem.url}>
        <div className="relative text-center h-[175px]">
          <img className="absolute inset-0 m-auto h-auto max-w-[175px] max-h-[150px]"
            alt={`${productName} - ${releaseItem.title}`} src={product.imgUrl || addBasePath(`/${defaultReleaseIcon}`)} />
        </div>
      </Link>
      <p className="my-0">{productName}: <Link href={releaseItem.url}>{releaseItem.title}</Link></p>
      <p className="mt-0 text-sm">Published: <FormattedDate date={releaseItem.date} /></p>
    </div>
  });
}

export default async function Releases() {
  return (<>
    <header className="prose mb-4">
      <h1>Releases</h1>
    </header>
    <div className="flex flex-col flex-wrap">
      <div>
        <h3 className="text-2xl font-normal mb-4">Scientific Software</h3>
        <div className="grid grid-cols-3">
          {await releasesJSX()}
        </div>
      </div>
    </div>
    <div className="mt-8 text-xs text-right">
      <p>Deploy Icon by SBTS from <a href="https://thenounproject.com/browse/icons/term/deploy/" target="_blank"
        title="Deploy Icons">Noun Project</a> (CC BY 3.0)
      </p>
    </div>
  </>);
}
