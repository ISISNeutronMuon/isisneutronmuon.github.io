import { Blip } from "./models/blip";
import { BlipTable } from "./models/blipTable";
import { type QuadrantMap, Radar } from "./models/radar";
import { Quadrant } from "./models/quadrant";
import { chartConfig } from "./config";

import { BLIPS_TEST_CONTENT } from "@/data/radar/testing-blips";

// Load all blips as a table
export function loadBlipContent(development: boolean): BlipTable {
  let blipTable = new BlipTable();
  if (development) {
    for (const blipFields of BLIPS_TEST_CONTENT) {
      blipTable.appendBlip(blipFields[0], blipFields[1], blipFields[2]);
    }
  }
  else throw Error("Loading production data has not been implemented yet");

  return blipTable;
}


export function loadRadarContent(development: boolean = false): Radar {
  const blipsTable = loadBlipContent(development);
  return new Radar(blipsTable);
}
