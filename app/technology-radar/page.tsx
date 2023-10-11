'use client'

import * as d3 from "d3";

import { chartConfig, QuadrantConfig, RingConfig } from "./lib/config";

// Define an svg transform with a translate(x y) and rotate(angleDeg)
type QuadrantTransform = {
  x: number,
  y: number,
  angleDeg: number
};

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

// Create an SVG definition for a single quadrant. We arbitrarily a quadrant from
// 0->90 deg clockwise quadrant
function defineSingleQuadrant(quadrantDefId: string, rings: RingConfig[], xScale: d3.ScaleLinear<number, number>) {
  const startStopAnglesRad: [number, number] = [0, Math.PI / 2];
  const lineThicknessPx = 1;
  return (
    <defs>
      <g id={`${quadrantDefId}`}>
        {rings.map((ring, ringIndex) =>
          <path key={`quadrant-ring-${ringIndex}`} fill={ring.colour}
            d={arcPath(startStopAnglesRad, toPixels(rings[ringIndex].radius, xScale), lineThicknessPx)} />)}
        {<line x1="0" x2={toPixels(rings[rings.length - 1].radius, xScale)} y1="0" y2="0" stroke={rings[0].colour} />}
        {<line x1="0" x2="0" y1="0" y2={-toPixels(rings[rings.length - 1].radius, xScale)} stroke={rings[0].colour} />}
      </g>
    </defs>
  )
}

function drawQuadrants(quadrantDefId: string, quadrants: QuadrantTransform[]) {
  return quadrants.map((quadrant, index) => {
    return <use key={`quadrant-${index}`} href={`#${quadrantDefId}`} transform={`translate(${quadrant.x} ${quadrant.y}) rotate(${quadrant.angleDeg})`} />
  });
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
    <g>
      {rings.map((_, ringIndex) => {
        // The <div> is only necessary to silence a react warning that each child requires
        // a unique key attribute
        return (<g key={`labels-${rings[ringIndex].title}`}>
          <text textAnchor="middle" y={`${centre.y}`} dy={`${quadrantGapPx / 4}`}
            x={centre.x + 0.5 * quadrantGapPx + labelPositionsX[ringIndex]}>{rings[ringIndex].title}</text>
          <text textAnchor="middle" y={`${centre.y}`} dy={`${quadrantGapPx / 4}`}
            x={centre.x - 0.5 * quadrantGapPx - labelPositionsX[ringIndex]}>{rings[ringIndex].title}</text>
        </g>)
      })}
    </g>
  )
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
  const axisWidthPx = chartConfig.axisWidthPx;
  const axisWidthHalfPx = axisWidthPx / 2.;
  const quadrants: { x: number, y: number, angleDeg: number }[] = [
    { x: halfWidth + axisWidthHalfPx, y: halfWidth - axisWidthHalfPx, angleDeg: 0 },
    { x: halfWidth + axisWidthHalfPx, y: halfWidth + axisWidthHalfPx, angleDeg: 90 },
    { x: halfWidth - axisWidthHalfPx, y: halfWidth + axisWidthHalfPx, angleDeg: 180 },
    { x: halfWidth - axisWidthHalfPx, y: halfWidth - axisWidthHalfPx, angleDeg: 270 }
  ];
  const quadrantDefId = "quadrant";

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {defineSingleQuadrant(quadrantDefId, chartConfig.rings, xScale)}
      {drawQuadrants(quadrantDefId, quadrants)}
      {drawRingLabels(chartConfig.rings, { x: halfWidth, y: halfWidth }, axisWidthPx, xScale)}
    </svg>
  )
}
