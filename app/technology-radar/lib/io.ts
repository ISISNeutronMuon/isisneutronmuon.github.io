import { Blip } from "./models/blip";
import { type QuadrantMap, Radar } from "./models/radar";
import { Quadrant } from "./models/quadrant";
import { chartConfig } from "./config";

import { TESTING_BLIPS } from "@/data/radar/testing-blips";

export function loadRadarContent(development: boolean = false): Radar {
  const emptyQuadrants = createQuadrantModels();
  const blips = loadBlipContent(development);

  const { quadrants, incorrectCategories } = addBlipsTo(emptyQuadrants, blips);
  if (incorrectCategories.length > 0) {
    let helpMessages = ["The following blips have unknown quadrant assignments:"];
    for (const blip of incorrectCategories) {
      helpMessages.push(`  - ${blip.title}: ${blip.quadrantTitle}`)
    }
    console.error(helpMessages.join("\n"))
  }

  return new Radar(quadrants);
}

function createQuadrantModels(): QuadrantMap {
  let quadrants: QuadrantMap = new Map();
  for (let config of chartConfig.quadrants) {
    quadrants.set(config.title, new Quadrant(config.title));
  }

  return quadrants;
}

// Load all blips as a flat list
function loadBlipContent(development: boolean): Blip[] {
  if (development) return TESTING_BLIPS
  else throw Error("Loading production data has not been implemented yet");
}

function addBlipsTo(quadrants: QuadrantMap, blips: Blip[]): { quadrants: QuadrantMap, incorrectCategories: Blip[] } {
  let incorrectCategories: Blip[] = [];
  for (let blip of blips) {
    if (quadrants.has(blip.quadrantTitle)) {
      // @ts-ignore
      quadrants.get(blip.quadrantTitle)?.addBlip(blip);
    }
    else {
      incorrectCategories.push(blip);
    }
  }

  return {
    quadrants: quadrants,
    incorrectCategories: incorrectCategories
  }
}
