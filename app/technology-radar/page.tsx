//'use client'
import * as d3 from "d3";
import Link from "next/link";

import { chartConfig, RingConfig } from "./lib/config";
import { Radar } from "./lib/models/radar";
import { Blip } from "./lib/models/blip";
import { loadRadarContent } from "./lib/io"

import { Quadrant as QuadrantView } from "./lib/view/quadrant";
import { BlipPositionGenerator } from "./lib/util/blipPositionGenerator";
import { Quadrant } from "./lib/models/quadrant";

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

  const radarModel: Radar = loadRadarContent(true);

  return (
    <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {drawQuadrants(quadrants, chartConfig.rings, chartConfig.blips.radius, xScale)}
      {drawRingLabels(chartConfig.rings, { x: halfWidth, y: halfWidth }, axisWidthPx, xScale)}
    </svg>
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

function drawQuadrants(quadrants: QuadrantView[], rings: RingConfig[], blipRadius: number,
  xScale: d3.ScaleLinear<number, number>) {
  return quadrants.map((quadrant) =>
    drawQuadrant(quadrant, rings, blipRadius, xScale))
}

function drawQuadrant(quadrant: QuadrantView, rings: RingConfig[], blipRadius: number,
  xScale: d3.ScaleLinear<number, number>) {
  const config = quadrant.config;
  const centre = quadrant.centre;
  const outerRadiusPx = toPixels(rings[rings.length - 1].radius, xScale);
  const quadrantLabelPos = quadrant.labelPosition(outerRadiusPx);
  const linkRectOrigin = quadrant.linkRectOrigin(outerRadiusPx);
  const lineThicknessPx = 1;


  return (
    <Link href={`/technology-radar/${config.id}`} key={`quadrant-${config.id}`} id={`quadrant-${config.id}`}>
      <g transform={`translate(${centre.x} ${centre.y})`}>
        <rect x={linkRectOrigin.x} y={linkRectOrigin.y} width={outerRadiusPx} height={outerRadiusPx} fill="white" z="1"></rect>
        <text x={quadrantLabelPos.x} y={quadrantLabelPos.y} textAnchor={quadrantLabelPos.anchor} fill={config.colour}>{config.title.toUpperCase()}</text>
        {rings.map((ring, ringIndex) =>
          <path key={`quadrant-ring-${ringIndex}`} fill={config.colour}
            d={arcPath(quadrant.startEndAngles, toPixels(ring.radius, xScale), lineThicknessPx)} />)}
        {<line x1="0" x2={quadrant.radialBasis.x * outerRadiusPx} y1="0" y2="0" stroke={config.colour} />}
        {<line x1="0" x2="0" y1="0" y2={quadrant.radialBasis.y * outerRadiusPx} stroke={config.colour} />}
        {drawBlips(quadrant, chartConfig.rings, blipRadius, xScale)}
      </g>
    </Link>)
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
          <text textAnchor="middle" dominantBaseline="middle" y={`${centre.y}`}
            x={centre.x + 0.5 * quadrantGapPx + labelPositionsX[ringIndex]}>{rings[ringIndex].title.toUpperCase()}</text>
          <text textAnchor="middle" dominantBaseline="middle" y={`${centre.y}`}
            x={centre.x - 0.5 * quadrantGapPx - labelPositionsX[ringIndex]}>{rings[ringIndex].title.toUpperCase()}</text>
        </g>)
      })}
    </g>
  )
}

function drawBlips(quadrant: QuadrantView, rings: RingConfig[], blipRadius: number,
  xScale: d3.ScaleLinear<number, number>) {
  const radarModel: Radar = loadRadarContent(true);
  const quadrantConfig = quadrant.config;
  const quadrantModel = radarModel.quadrants.get(quadrantConfig.title) as Quadrant;

  let jsx = [];
  for (let index = 0; index < rings.length; ++index) {
    const innerRadius = (index == 0) ? 0. : rings[index - 1].radius;
    const outerRadius = rings[index].radius;
    const { ringBlips, centres } = distributeBlipsInRing(quadrantModel.blipsInRing(rings[index].title), quadrant, innerRadius, outerRadius, blipRadius);
    for (let blipIndex = 0; blipIndex < ringBlips.length; ++blipIndex) {
      jsx.push(
        <g>
          <circle cx={toPixels(centres[blipIndex].x, xScale)} cy={toPixels(centres[blipIndex].y, xScale)}
            r={toPixels(blipRadius, xScale)} fill={quadrantConfig.colour} />
        </g>
      );
    }
  }
  return jsx;
}

// Determine the (x,y) position of a set of blips for a quadrant. The blips are
// distributed with random positions also taking care that they do not overlap.
function distributeBlipsInRing(blips: Blip[], quadrant: QuadrantView, innerRadius: number, outerRadius: number, blipRadius: number) {
  const generator = new BlipPositionGenerator(quadrant.radialBasis, innerRadius, outerRadius, blipRadius);
  return { ringBlips: blips, centres: generator.generateCentres(blips.length) };
}
