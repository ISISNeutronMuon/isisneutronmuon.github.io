import { Quadrant } from "./quadrant";

export class Radar {
  // Map the title to the quadrant object
  quadrants: Map<string, Quadrant>;

  constructor(quadrants: Quadrant[]) {
    this.quadrants = new Map<string, Quadrant>();
    quadrants.forEach((quadrant) => this.quadrants.set(quadrant.title, quadrant));

    this.throwIfObjectInvalid();
  }

  private throwIfObjectInvalid() {
    if (this.quadrants.size < 4) {
      throw Error(`Only ${this.quadrants.size} quadrants found in Radar. At least 4 are required.`);
    }
  }
};
