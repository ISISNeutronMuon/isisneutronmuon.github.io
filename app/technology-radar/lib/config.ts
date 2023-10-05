export type QuadrantConfig = {
  title: string,
  colour: string
};

export type RingConfig = {
  title: string,
  radius: number,
  colour: string
};

export type ChartConfig = {
  sizePx: number
  scale: number[]
  axisWidthPx: number,
  quadrants: QuadrantConfig[],
  rings: RingConfig[]
};

export const chartConfig: ChartConfig = {
  sizePx: 896,
  scale: [-18, 18],
  axisWidthPx: 20,
  quadrants: [
    {
      title: "Languages & Frameworks",
      colour: "#84b59c"
    },
    {
      title: "Techniques",
      colour: "#248ea6"
    },
    {
      title: "Platforms",
      colour: "#c57b67"
    },
    {
      title: "Tools",
      colour: "#f2a25c"
    }
  ],
  rings: [
    {
      title: "Adopt",
      radius: 7,
      colour: "#bababa"
    },
    {
      title: "Trial",
      radius: 11,
      colour: "#bababa"
    },
    {
      title: "Assess",
      radius: 15,
      colour: "#bababa"
    },
    {
      title: "Hold",
      radius: 17,
      colour: "#bababa"
    }
  ]
};
