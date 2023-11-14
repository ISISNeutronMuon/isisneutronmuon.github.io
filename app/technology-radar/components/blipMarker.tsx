import Link from "next/link";

import { Blip as BlipModel } from "@/lib/radar/models/blip";
import { technologyRadarBlipUrl } from "../config";
import BlipTooltipHandler from "./blipTooltipHandler";

type Params = {
  blip: BlipModel
  centre_x: number;
  centre_y: number;
  radius: number;
  colour: string;
};

// Radius of corner in pixels of tooltipBox
const tooltipBoxRadius = 5;

export default function BlipMarker({ blip, centre_x, centre_y, radius, colour }: Params) {
  const blipId = `blip-${blip.id}`,
    markerId = `blip-symbol-${blip.id}`,
    tooltipId = `blip-tooltip-${blip.id}`;
  const tooltipBox = calculateTooltipBoxDimensions(blip.title);

  return (
    <g id={blipId}>
      <Link href={technologyRadarBlipUrl(blip)}>
        <g id={markerId} >
          <circle cx={centre_x} cy={centre_y} r={radius} fill={colour} />
          <text x={centre_x} y={centre_y} dy="1" textAnchor="middle" dominantBaseline="middle"
            fill="white" style={{ fontSize: `${tooltipBox.fontSize}` }}>{blip.id}</text>
        </g>
      </Link>
      <g id={tooltipId} style={{ display: "none" }}>
        <rect x={centre_x - 0.5 * tooltipBox.width} y={centre_y - (tooltipBox.margin + radius + tooltipBox.height)}
          width={tooltipBox.width} height={tooltipBox.height} rx={tooltipBoxRadius} ry={tooltipBoxRadius} />
        <text x={centre_x} y={centre_y - (tooltipBox.margin + radius + 0.5 * tooltipBox.height)}
          textAnchor="middle" dominantBaseline="middle" style={{ fontSize: `${tooltipBox.fontSize}` }} fill="white">{blip.title}</text>
      </g>
      <BlipTooltipHandler targetId={blipId} tooltipId={tooltipId} />
    </g>
  )
}


function calculateTooltipBoxDimensions(text: string): { width: number, height: number, fontSize: string, margin: number } {
  // We can't use the browser APIs during the static build process so we take a guess at
  // a rough width per character
  const widthPerChar = 10, charMaxHeight = 10,
    widthPadding = 5, heightPadding = 15, margin = 5;
  return {
    width: widthPadding + text.length * widthPerChar,
    height: heightPadding + charMaxHeight,
    fontSize: "medium",
    margin: margin
  }
}
