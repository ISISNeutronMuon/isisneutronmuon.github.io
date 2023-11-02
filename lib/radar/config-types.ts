// --- Configuration types ---

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
  badgeColor: string;
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
