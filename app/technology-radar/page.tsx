"use client"

import * as d3 from "d3";
import Link from "next/link";

import { chartConfig, RingConfig } from "./lib/config";
import { Radar } from "./lib/models/radar";
import { Blip } from "./lib/models/blip";
import { loadRadarContent } from "./lib/io"

import { Quadrant as QuadrantView } from "./lib/view/quadrant";
import { BlipPositionGenerator } from "./lib/util/blipPositionGenerator";
import { Quadrant } from "./lib/models/quadrant";

// Set the display style of an element by ID
let setDisplayStyle = (element_id: string, displayStyle: string) => {
  return () => {
    let tooltipElement = document.getElementById(element_id);
    if (tooltipElement)
      tooltipElement.style['display'] = displayStyle;
  }
}

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

  return (
    <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {drawQuadrants(quadrants, chartConfig.rings, chartConfig.blips.radius, xScale)}
      {drawRingLabels(chartConfig.rings, { x: halfWidth, y: halfWidth }, axisWidthPx, xScale)}
    </svg>
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
    <Link href={`/technology-radar/${config.id}`} key={`quadrant-link-${config.id}`} id={`quadrant-${config.id}`}>
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
        {drawBlips(quadrant, chartConfig.rings, blipRadius, xScale)}
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

function drawBlips(quadrant: QuadrantView, rings: RingConfig[], blipRadius: number,
  xScale: d3.ScaleLinear<number, number>) {
  const radarModel: Radar = loadRadarContent(true);
  const quadrantConfig = quadrant.config;
  const quadrantModel = radarModel.quadrants().get(quadrantConfig.title) as Quadrant;
  const blipRadiusPx = toPixels(blipRadius, xScale);

  let jsx = [];
  for (let ringIndex = 0; ringIndex < rings.length; ++ringIndex) {
    const innerRadius = (ringIndex == 0) ? 0. : rings[ringIndex - 1].radius;
    const outerRadius = rings[ringIndex].radius;
    const { ringBlips, centres } = distributeBlipsInRing(quadrantModel.blipsInRing(rings[ringIndex].title), quadrant,
      innerRadius, outerRadius, blipRadius);
    for (let blipIndex = 0; blipIndex < ringBlips.length; ++blipIndex) {
      const centre = centres[blipIndex], blip = ringBlips[blipIndex];
      const cx = toPixels(centre.x, xScale), cy = toPixels(centre.y, xScale);
      const blipId = `blip-${blip.id}`, markerId = `blip-symbol-${blip.id}`, tooltipId = `blip-tooltip-${blip.id}`;
      const tooltipBox = calculateTooltipBoxDimensions(blip.title);

      jsx.push(<g id={blipId} key={blipId}>
        <g id={markerId} key={markerId} onMouseOver={setDisplayStyle(tooltipId, "block")} onMouseOut={setDisplayStyle(tooltipId, "none")}>
          <circle cx={cx} cy={cy} r={blipRadiusPx} fill={quadrantConfig.colour} />
          <text x={cx} y={cy} dy="1" textAnchor="middle" dominantBaseline="middle"
            fill="white" style={{ fontSize: `${tooltipBox.fontSize}` }}>{blip.id}</text>
        </g>
        <g key={tooltipId} id={tooltipId} style={{ display: "none" }} >
          <rect x={cx - 0.5 * tooltipBox.width} y={cy - (tooltipBox.margin + blipRadiusPx + tooltipBox.height)}
            width={tooltipBox.width} height={tooltipBox.height} rx={5} ry={5} />
          <text x={cx} y={cy - (tooltipBox.margin + blipRadiusPx + 0.5 * tooltipBox.height)}
            textAnchor="middle" dominantBaseline="middle" style={{ fontSize: `${tooltipBox.fontSize}` }} fill="white">{blip.title}</text>
        </g>
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
