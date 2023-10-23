import { BlipTable } from "./models/blipTable";

import { BLIPS_TEST_CONTENT } from "@/data/radar/testing-blips";

// Load all blips as a table
export function loadAllBlips(development: boolean): BlipTable {
  let blipTable = new BlipTable();
  if (development) {
    for (const blipFields of BLIPS_TEST_CONTENT) {
      blipTable.appendBlip(blipFields[0], blipFields[1], blipFields[2]);
    }
  }
  else throw Error("Loading production data has not been implemented yet");

  return blipTable;
}

// Load blips for a given quadrant
export function loadBlipsByQuadrant(quadrantId: string, development: boolean): BlipTable {
  return loadAllBlips(development).filterByQuadrant(quadrantId);
}
