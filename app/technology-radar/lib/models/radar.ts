import { Quadrant } from "./quadrant";

export type QuadrantMap = Map<string, Quadrant>;

export class Radar {
  // Map the title to the quadrant object
  quadrants: QuadrantMap;

  constructor(quadrants: QuadrantMap) {
    this.quadrants = quadrants;

    this.throwIfObjectInvalid();
  }

  private throwIfObjectInvalid() {
    if (this.quadrants.size < 4) {
      throw Error(`Only ${this.quadrants.size} quadrants found in Radar. At least 4 are required.`);
    }
  }
};
