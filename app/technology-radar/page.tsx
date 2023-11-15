import * as d3 from "d3";
import Link from "next/link";

import Heading from "@/components/heading";
import { RingConfig } from "@/lib/radar/config-types";
import { BlipTable } from "@/lib/radar/models/blipTable";
import { Radar } from "@/lib/radar/models/radar";
import { BlipPositionGenerator } from "@/lib/radar/util/blipPositionGenerator";
import { Quadrant as QuadrantView } from "@/lib/radar/view/quadrant";

import BlipMarker from "./components/blipMarker";
import BlipTableView from "./components/blipTable";
import { chartConfig, technologyRadarQuadrantUrl } from "./config";

import radarJson from '@/public/radar.json'
import { jsonToRadar } from "@/lib/radar/io/json";

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "2-digit",
};

const radar = jsonToRadar(radarJson);

let pageTitle = (radarVersion: string) => `Technology Radar #${radarVersion}`

export default function TechnologyRadar() {
  // Create a d3 scale to map from pixels in the browser to the point scale defined
  // by the domain
  const size = chartConfig.sizePx;
  const halfWidth = chartConfig.sizePx / 2.;
  const xScale = d3
    .scaleLinear()
    .domain(chartConfig.scale)
    .range([0, size]);
  const axisWidthPx = toPixels(chartConfig.axisWidth, xScale);
  const axisWidthHalfPx = axisWidthPx / 2.;
  const quadrants: QuadrantView[] = [
    new QuadrantView(chartConfig.quadrants[0], { x: halfWidth - axisWidthHalfPx, y: halfWidth - axisWidthHalfPx }, 'top-left'),
    new QuadrantView(chartConfig.quadrants[1], { x: halfWidth + axisWidthHalfPx, y: halfWidth - axisWidthHalfPx }, 'top-right'),
    new QuadrantView(chartConfig.quadrants[2], { x: halfWidth + axisWidthHalfPx, y: halfWidth + axisWidthHalfPx }, 'bottom-right'),
    new QuadrantView(chartConfig.quadrants[3], { x: halfWidth - axisWidthHalfPx, y: halfWidth + axisWidthHalfPx }, 'bottom-left'),
  ];

  return (<>
    <Heading level={1} title={pageTitle(radar.version)} />
    <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {drawQuadrants(quadrants, chartConfig.rings, xScale)}
      {drawRingLabels(chartConfig.rings, { x: halfWidth, y: halfWidth }, axisWidthPx, xScale)}
      {drawAllBlips(radar, quadrants, chartConfig.rings, chartConfig.blips.radius, xScale)}
    </svg>
    <div className="w-full mb-10">
      <p className="text-right text-sm">{`Published: ${Intl.DateTimeFormat('en-GB', dateFormatOptions).format(radar.releaseDate)}`}</p>
    </div>
    <hr className="mb-4" />
    <div>
      <Heading level={2} title="Blip search" />
      <BlipTableView />
    </div>
  </>
  )
}

// Take a value on the scale defined by d3 and calculate the pixel
// value in the browser
function toPixels(d3ScaleValue: number, d3Scale: d3.ScaleLinear<number, number>) {
  return d3Scale(d3ScaleValue) - d3Scale(0);
}

// Compute the svg path string for an arc using d3
function arcPath(
  startStopAnglesRad: [number, number],
  radiusPx: number,
  lineThicknessPx: number
) {
  const [startAngle, endAngle] = startStopAnglesRad;
  // Radius in grid units, convert to pixels
  const outerRadiusPx = radiusPx;
  const innerRadiusPx = outerRadiusPx - lineThicknessPx;

  return (
    d3.arc()({
      innerRadius: innerRadiusPx,
      outerRadius: outerRadiusPx,
      startAngle,
      endAngle,
    }) || undefined
  );
}

function drawQuadrants(quadrants: QuadrantView[], rings: RingConfig[],
  xScale: d3.ScaleLinear<number, number>) {
  return quadrants.map((quadrant) =>
    drawQuadrant(quadrant, rings, xScale))
}

function drawQuadrant(quadrant: QuadrantView, rings: RingConfig[],
  xScale: d3.ScaleLinear<number, number>) {
  const config = quadrant.config;
  const centre = quadrant.centre;
  const outerRadiusPx = toPixels(rings[rings.length - 1].radius, xScale);
  const quadrantLabelPos = quadrant.labelPosition(outerRadiusPx);
  const linkRectOrigin = quadrant.linkRectOrigin(outerRadiusPx);
  const lineThicknessPx = 1;


  return (
    <Link href={technologyRadarQuadrantUrl({ quadrantId: config.id })}
      key={`quadrant-link-${config.id}`} id={`quadrant-${config.id}`}>
      <g key={`quadrant-${config.id}`} transform={`translate(${centre.x} ${centre.y})`}>
        <rect x={linkRectOrigin.x} y={linkRectOrigin.y} width={outerRadiusPx} height={outerRadiusPx} fill="white"
          data-cy={`quadrant-rect-${config.id}`} />
        <text x={quadrantLabelPos.x} y={quadrantLabelPos.y} textAnchor={quadrantLabelPos.anchor}
          fill={config.colour} data-cy={`quadrant-title-${config.id}`} > {config.title.toUpperCase()}</text>
        {rings.map((ring, ringIndex) =>
          <path key={`quadrant-ring-${ringIndex}`} fill={config.colour}
            d={arcPath(quadrant.startEndAngles, toPixels(ring.radius, xScale), lineThicknessPx)} />)}
        {<line x1="0" x2={quadrant.radialBasis.x * outerRadiusPx} y1="0" y2="0" stroke={config.colour} />}
        {<line x1="0" x2="0" y1="0" y2={quadrant.radialBasis.y * outerRadiusPx} stroke={config.colour} />}
      </g>
    </Link >)
}

// Centre defines the centre coordinates of the radar
function drawRingLabels(rings: RingConfig[], centre: { x: number, y: number }, quadrantGapPx: number,
  xScale: d3.ScaleLinear<number, number>) {
  // Labels should appear half way between 2 rings
  // These values are w.r.t 0,0 at the centre of the radar
  const labelPositionsX: number[] = [];
  for (let index = 0; index < rings.length; ++index) {
    const r1 = (index > 0) ? rings[index - 1].radius : 0;
    const r2 = rings[index].radius;
    labelPositionsX.push(toPixels(r1 + 0.5 * (r2 - r1), xScale));
  }

  return (
    <g id="ring-labels">
      {rings.map((_, ringIndex) => {
        // The <div> is only necessary to silence a react warning that each child requires
        // a unique key attribute
        return (<g key={`labels-${rings[ringIndex].title}`}>
          <text data-cy={`ring-label-left-${rings[ringIndex].title}`} textAnchor="middle" dominantBaseline="middle"
            y={`${centre.y}`} x={centre.x + 0.5 * quadrantGapPx + labelPositionsX[ringIndex]}>{rings[ringIndex].title.toUpperCase()}</text>
          <text data-cy={`ring-label-right-${rings[ringIndex].title}`} textAnchor="middle" dominantBaseline="middle"
            y={`${centre.y}`} x={centre.x - 0.5 * quadrantGapPx - labelPositionsX[ringIndex]}>{rings[ringIndex].title.toUpperCase()}</text>
        </g>)
      })}
    </g>
  )
}

function drawAllBlips(radar: Radar, quadrants: QuadrantView[], rings: RingConfig[], blipRadius: number,
  xScale: d3.ScaleLinear<number, number>) {
  return quadrants.map((quadrant) => drawBlipsInQuadrant(radar, quadrant, rings, blipRadius, xScale));
}

function drawBlipsInQuadrant(radar: Radar, quadrant: QuadrantView, rings: RingConfig[], blipRadius: number,
  xScale: d3.ScaleLinear<number, number>) {
  const quadrantConfig = quadrant.config;
  const blipsInQuadrant = radar.blips.filterByQuadrant(quadrantConfig.id);
  const blipRadiusPx = toPixels(blipRadius, xScale);

  return (
    <g key={`quadrant-blips-${quadrantConfig.id}`} transform={`translate(${quadrant.centre.x} ${quadrant.centre.y})`}>
      {rings.map((ring, ringIndex) => {
        const innerRadius = (ringIndex == 0) ? 0. : rings[ringIndex - 1].radius;
        const outerRadius = ring.radius;
        const { ringBlips, centres } = distributeBlipsInRing(blipsInQuadrant.filterByRing(ring.title), quadrant,
          innerRadius, outerRadius, blipRadius);
        return ringBlips.map((blip, index) => {
          const centre = centres[index];
          return (<BlipMarker key={`blip-${blip.id}`} blip={blip}
            centre_x={toPixels(centre.x, xScale)} centre_y={toPixels(centre.y, xScale)}
            radius={blipRadiusPx} colour={quadrantConfig.colour} />)
        });
      })}
    </g>
  )
}

// Determine the (x,y) position of a set of blips for a quadrant. The blips are
// distributed with random positions also taking care that they do not overlap.
function distributeBlipsInRing(blips: BlipTable, quadrant: QuadrantView,
  innerRadius: number, outerRadius: number, blipRadius: number) {
  const generator = new BlipPositionGenerator(quadrant.radialBasis, innerRadius, outerRadius, blipRadius);
  return { ringBlips: blips, centres: generator.generateCentres(blips.size) };
}
