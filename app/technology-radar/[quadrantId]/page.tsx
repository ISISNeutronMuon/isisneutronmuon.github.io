import PageTitle from "@/components/page-title";
import Link from "next/link";
import { QuadrantConfig } from "@/lib/radar/config-types";

import { chartConfig, quadrantConfig } from "../config";
import Badge from "../components/badge";

import radarJSON from '@/public/radar.json';
import { jsonToRadar } from "@/lib/radar/io/json";

const radar = jsonToRadar(radarJSON);

type Params = {
  params: {
    quadrantId: string;
  }
};

// Only pages that exist as radar quadrants should be generated
// See https://nextjs.org/docs/app/api-reference/functions/generate-static-params
export const dynamicParams = false;

export async function generateStaticParams() {
  return chartConfig.quadrants.map((quadrant) => ({ quadrantId: quadrant.id }));
}

export default async function RadarQuadrant({ params }: Params) {
  // guaranteed to exist due to generateStaticParams & dynamicParams=false
  const quadrantConf = quadrantConfig(params.quadrantId) as QuadrantConfig;
  const quadrantBlips = radar.blips.filterByQuadrant(params.quadrantId);

  return (
    <>
      <PageTitle title={quadrantConf.title} />
      <div className="flex flex-row justify-between mx-12">
        {chartConfig.rings.map((ring) => {
          const ringBlips = quadrantBlips.filterByRing(ring.title);
          return (<div key={`ring-blips-${ring.title}`} id={`ring-blips-${ring.title}`} className="mb-2">
            <Badge title={ring.title} colour={ring.badgeColour} />
            <ul>
              {ringBlips.map((blip) =>
                <div key={`ring-blip-title-${blip.id}`} className="prose px-2 my-6 border-b-[1px] border-slate-400">
                  <Link href={`${quadrantConf.id}/${blip.refname}`}>
                    <li>{blip.title}</li>
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
