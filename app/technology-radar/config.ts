import { ChartConfig, QuadrantConfig, RingConfig } from "@/lib/radar/config-types";
import { Blip } from "@/lib/radar/models/blip";

export const technologyRadarBasename = '/technology-radar';

export type BlipUrlParams = {
  blip?: Blip,
  quadrantId?: string,
  refName?: string
}

export const technologyRadarQuadrantUrl =
  (params: BlipUrlParams) => `${technologyRadarBasename}/${params.blip ? params.blip.quadrantId : params.quadrantId}`

export const technologyRadarBlipUrl = (params: BlipUrlParams) => {
  const quadrantId = params.blip ? params.blip.quadrantId : params.quadrantId;
  const refName = params.blip ? params.blip.refName : params.refName;
  return `${technologyRadarQuadrantUrl({ quadrantId })}/${refName}`
}

export const chartConfig: ChartConfig = {
  sizePx: 896,
  scale: [-19, 19],
  axisWidth: 1.5,
  quadrants: [
    // id is used as the basename for the path to a page describing the quadrant
    {
      id: "tools",
      title: "Tools",
      colour: "#f2a25c"
    },
    {
      id: "techniques",
      title: "Techniques",
      colour: "#248ea6"
    },
    {
      id: "platforms",
      title: "Platforms",
      colour: "#c57b67"
    },
    {
      id: "languages-and-frameworks",
      title: "Languages & Frameworks",
      colour: "#84b59c"
    },
  ],
  rings: [
    {
      title: "adopt",
      radius: 7,
      badgeColour: "#22c55e"
    },
    {
      title: "trial",
      radius: 11,
      badgeColour: "#f59e0b"
    },
    {
      title: "assess",
      radius: 15,
      badgeColour: "#38bdf8"
    },
    {
      title: "hold",
      radius: 17,
      badgeColour: "#78716c"
    }
  ],
  blips: {
    radius: 0.5
  }
};

// Return the config for a given quadrant or undefined
// if a quadrant with that ID cannot be found
export function quadrantConfig(quadrantId: string): QuadrantConfig | undefined {
  const configs = chartConfig.quadrants.filter((quadrant) => quadrant.id == quadrantId);
  return (configs.length == 1) ? configs[0] : undefined;
}

// Return the ring for a given ring name or undefined
export function ringConfig(ringId: string): RingConfig | undefined {
  const configs = chartConfig.rings.filter((ring) => ring.title == ringId);
  return (configs.length == 1) ? configs[0] : undefined;
}
