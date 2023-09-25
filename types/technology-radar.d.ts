type QuadrantConfig = {
  title: string,
  colour: string
};

type RingConfig = {
  title: string,
  radius: number,
  colour: string
};

type ChartConfig = {
  sizePx: number
  scale: number[]
  axisWidthPx: number,
  quadrants: QuadrantConfig[],
  rings: RingConfig[]
};
