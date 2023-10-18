import { BlipTable } from "./blipTable";
import { Quadrant } from "./quadrant";

export type QuadrantMap = Map<string, Quadrant>;

export class Radar {
  private blipData: BlipTable;

  constructor(blipData: BlipTable) {
    this.blipData = blipData;
  }

  // Return a map of blips in each quadrant
  quadrants(): QuadrantMap {
    let quadrants = new Map();
    for (const [_, blip] of this.blipData.entries()) {
      if (quadrants.has(blip.quadrantTitle)) {
        quadrants.get(blip.quadrantTitle).addBlip(blip);
      } else {
        quadrants.set(blip.quadrantTitle, new Quadrant(blip.quadrantTitle, [blip]));
      }
    };

    return quadrants;
  }

};
