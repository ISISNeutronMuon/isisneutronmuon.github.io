export type QuadrantConfig = {
  // An id string without spaces
  id: string,
  // A human-readable title, can contain spaces
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
  scale: [-19, 19],
  axisWidthPx: 40,
  quadrants: [
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
    {
      id: "tools",
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
