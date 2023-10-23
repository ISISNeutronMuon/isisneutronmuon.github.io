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
};

export type BlipConfig = {
  radius: number;
};

// Unless Px has been added to the variable name all sizes
// are defined w.r.t the scale defined by scale parameter
export type ChartConfig = {
  sizePx: number
  scale: number[]
  axisWidth: number,
  quadrants: QuadrantConfig[],
  rings: RingConfig[],
  blips: BlipConfig
};

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
      title: "Adopt",
      radius: 7
    },
    {
      title: "Trial",
      radius: 11
    },
    {
      title: "Assess",
      radius: 15
    },
    {
      title: "Hold",
      radius: 17
    }
  ],
  blips: {
    radius: 0.5
  }
};
