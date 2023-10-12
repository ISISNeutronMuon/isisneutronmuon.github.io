'use client'
import * as d3 from "d3";
import Link from "next/link";

import { chartConfig, QuadrantConfig, RingConfig } from "./lib/config";

// Define an svg transform with a translate(x y) and rotate(angleDeg)
type QuadrantTransform = {
  x: number,
  y: number,
  angleDeg: number
};

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
  const quadrantTransforms: QuadrantTransform[] = [
    { x: halfWidth + axisWidthHalfPx, y: halfWidth - axisWidthHalfPx, angleDeg: 0 },
    { x: halfWidth + axisWidthHalfPx, y: halfWidth + axisWidthHalfPx, angleDeg: 90 },
    { x: halfWidth - axisWidthHalfPx, y: halfWidth + axisWidthHalfPx, angleDeg: 180 },
    { x: halfWidth - axisWidthHalfPx, y: halfWidth - axisWidthHalfPx, angleDeg: 270 }
  ];

  return (
    <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {drawQuadrants(quadrantTransforms, chartConfig.quadrants, chartConfig.rings, xScale)}
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

function drawQuadrants(quadrantTransforms: QuadrantTransform[], quadrantConfigs: QuadrantConfig[], rings: RingConfig[], xScale: d3.ScaleLinear<number, number>) {
  return quadrantTransforms.map((quadrantTransform, index) =>
    drawQuadrant(quadrantTransform, quadrantConfigs[index], rings, xScale))
}

function drawQuadrant(quadrantTransform: QuadrantTransform, quadrantConfig: QuadrantConfig, rings: RingConfig[], xScale: d3.ScaleLinear<number, number>) {
  // Draws an arc segment from 0->90 degs then applies svg transforms to place it in the
  // final position in the radar as defined by the QuadrantTransfroms
  const startStopAnglesRad: [number, number] = [0, Math.PI / 2];
  const lineThicknessPx = 1;
  const outerRadiusPx = toPixels(rings[rings.length - 1].radius, xScale);

  // Determine where the label should be written based on the rotation angle along
  // with  the origin of a rectangle drawn underneath the quadrant so that the
  // whole area is clickable.
  const { quadrantLabelPos, linkRectOrigin } = (() => {
    if (quadrantTransform.angleDeg < 90)
      return { quadrantLabelPos: { x: outerRadiusPx, y: -outerRadiusPx, anchor: "end" }, linkRectOrigin: { x: 0, y: -outerRadiusPx } }
    else if (quadrantTransform.angleDeg < 180)
      return { quadrantLabelPos: { x: outerRadiusPx, y: outerRadiusPx, anchor: "end" }, linkRectOrigin: { x: 0, y: 0 } }
    else if (quadrantTransform.angleDeg < 270)
      return { quadrantLabelPos: { x: -outerRadiusPx, y: outerRadiusPx, anchor: "start" }, linkRectOrigin: { x: -outerRadiusPx, y: 0 } }
    else
      return { quadrantLabelPos: { x: -outerRadiusPx, y: -outerRadiusPx, anchor: "start" }, linkRectOrigin: { x: -outerRadiusPx, y: -outerRadiusPx } }
  })();


  return (
    <Link href={`/technology-radar/${quadrantConfig.id}`} key={`quadrant-${quadrantConfig.id}`} id={`quadrant-${quadrantConfig.id}`}>
      <g transform={`translate(${quadrantTransform.x} ${quadrantTransform.y})`}>
        <rect x={linkRectOrigin.x} y={linkRectOrigin.y} width={outerRadiusPx} height={outerRadiusPx} fill="white" z="1"></rect>
        <text x={quadrantLabelPos.x} y={quadrantLabelPos.y} textAnchor={quadrantLabelPos.anchor}>{quadrantConfig.title.toUpperCase()}</text>
        <g transform={`rotate(${quadrantTransform.angleDeg})`}>
          {rings.map((ring, ringIndex) =>
            <path key={`quadrant-ring-${ringIndex}`} fill={ring.colour}
              d={arcPath(startStopAnglesRad, toPixels(rings[ringIndex].radius, xScale), lineThicknessPx)} />)}
          {<line x1="0" x2={outerRadiusPx} y1="0" y2="0" stroke={rings[0].colour} />}
          {<line x1="0" x2="0" y1="0" y2={-outerRadiusPx} stroke={rings[0].colour} />}
        </g>
      </g >
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
