import Link from "next/link";

import { QuadrantConfig, chartConfig, quadrantConfig } from "../lib/config";
import { loadBlipsByQuadrant } from "../lib/io";

type Params = {
  params: {
    quadrantId: string;
  }
};

// Only pages that exist in _posts should return content, everything else should
// be a 404
// See https://nextjs.org/docs/app/api-reference/functions/generate-static-params
export const dynamicParams = false;

export async function generateStaticParams() {
  return chartConfig.quadrants.map((quadrant) => ({ quadrantId: quadrant.id }));
}

export default async function RadarQuadrant({ params }: Params) {
  // guaranteed to exist due to generateStaticParams & dynamicParams=false
  const quadrantConf = quadrantConfig(params.quadrantId) as QuadrantConfig;
  const quadrantBlips = loadBlipsByQuadrant(params.quadrantId, true);

  return (
    <>
      <header className="prose mb-4">
        <h1>{quadrantConf.title}</h1>
      </header>
      <div className="flex flex-row justify-between mx-12">
        {chartConfig.rings.map((ring) => {
          const ringBlips = Array.from(quadrantBlips.filterByRing(ring.title).blips());
          return (<div key={`ring-blips-${ring.title}`} id={`ring-blips-${ring.title}`} className="mb-2">
            <h2 className={`my-3 text-base text-center text-white max-w-[5rem] px-2 py-1 mx-auto
            border-0 border-solid rounded-2xl`} style={{ backgroundColor: ring.badgeColor }}>{ring.title.toUpperCase()}</h2>
            <ul>
              {ringBlips.map((blip) =>
                <div className="prose px-2 my-6 border-b-[1px] border-slate-400">
                  <Link href={`${quadrantConf.id}/${blip.title}`}>
                    <li key={`ring-blip-title-${blip.id}`} >{blip.title}</li>
                  </Link>
                </div>
              )}
            </ul>
          </div>)
        }
        )}
      </div >
    </>
  )
}
