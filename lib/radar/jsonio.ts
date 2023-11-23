import { BlipTable } from "./models/blipTable";

// Load all blips as a flat table
export function loadAllBlips(development: boolean): BlipTable {
  return new BlipTable();
}

// Load blips for a given quadrant
export function loadBlipsByQuadrant(quadrantId: string, development: boolean): BlipTable {
  return loadAllBlips(development).filterByQuadrant(quadrantId);
}
