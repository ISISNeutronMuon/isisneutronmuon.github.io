import PageTitle from "@/components/page-title";
import { markdownToHtml } from "@/lib/markdown";
import { QuadrantConfig, RingConfig } from "@/lib/radar/config-types";
import { Blip } from "@/lib/radar/models/blip";

import Badge from "../../components/badge";
import { quadrantConfig, ringConfig } from "../../config";
import { loadRadarData } from "../../loadRadarData";

type Params = {
  params: {
    quadrantId: string;
    blipRefName: string;
  }
};

// Only pages that exist as blips in the existing radar should be generated
// See https://nextjs.org/docs/app/api-reference/functions/generate-static-params
export const dynamicParams = false;

export async function generateStaticParams() {
  return loadRadarData().blips.map((blip) => ({ quadrantId: blip.quadrantId, blipRefName: blip.refname }));
}

export default async function RadarQuadrant({ params }: Params) {
  const radar = loadRadarData();
  const blip = radar.blips.getByRef(params.blipRefName) as Blip;
  const quadrantConf = quadrantConfig(blip.quadrantId) as QuadrantConfig;
  const ringConf = ringConfig(blip.ring) as RingConfig;
  const description = markdownToHtml(blip.description || '')

  return (
    <>
      <div className="flex flex-row place-content-between items-center">
        <PageTitle title={blip.title} />
        <Badge title={quadrantConf.title} colour={quadrantConf.colour} href={`/technology-radar/${quadrantConf.id}`} />
      </div>
      <p className="inline text-lg">Ring: </p><Badge className="inline" title={ringConf.title} colour={ringConf.badgeColour} />
      <div className="prose mt-8">
        <div dangerouslySetInnerHTML={{ __html: description.toString() }} />
      </div>
    </>
  )
}
