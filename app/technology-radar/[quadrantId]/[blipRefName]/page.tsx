import Heading from "@/components/heading";
import { markdownToHtml } from "@/lib/markdown";
import { QuadrantConfig, RingConfig } from "@/lib/radar/config-types";
import { Blip } from "@/lib/radar/models/blip";

import Badge from "../../components/badge";
import {
  quadrantConfig,
  ringConfig,
  technologyRadarQuadrantUrl
} from "../../config";

import radarJSON from '@/public/radar.json';
import { jsonToRadar } from "@/lib/radar/io/json";
import FormattedDate from "@/components/formatted-date";

const radar = jsonToRadar(radarJSON);

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
  return radar.blips.map((blip) => ({ quadrantId: blip.quadrantId, blipRefName: blip.refName }));
}

export default async function RadarQuadrant({ params }: Params) {
  const blip = radar.blips.getByRef(params.blipRefName) as Blip;
  const quadrantConf = quadrantConfig(blip.quadrantId) as QuadrantConfig;
  const ringConf = ringConfig(blip.ring) as RingConfig;
  const description = markdownToHtml(blip.description || '')
  const comments = markdownToHtml(blip.comments || '')

  return (
    <>
      <div className="flex flex-row place-content-between items-center">
        <Heading level={1}>{blip.title}</Heading>
        <Badge title={quadrantConf.title} colour={quadrantConf.colour} href={technologyRadarQuadrantUrl(blip)} />
      </div>
      <p className="inline text-lg">Ring: </p><Badge className="inline" title={ringConf.title} colour={ringConf.badgeColour} />
      <div className="prose mt-4">
        <div dangerouslySetInnerHTML={{ __html: description.toString() }} />
      </div>
      <Heading level={2}>{`v${radar.version}`} - <FormattedDate date={radar.releaseDate} /></Heading>
      <div className="prose">
        <div dangerouslySetInnerHTML={{ __html: comments.toString() }} />
      </div>
    </>
  )
}
