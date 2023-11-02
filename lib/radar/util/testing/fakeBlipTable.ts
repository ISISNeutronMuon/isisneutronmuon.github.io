import { BlipTable } from "../../models/blipTable";


// Create a fake table of data for testing
// The entries are distributed over 4 rings and 4 quadrants in the pattern
//   id, quadrant-1, ring-{1-4}
//   id, quadrant-2, ring-{1-4}
//   id, quadrant-3, ring-{1-4}
//   id, quadrant-4, ring-{1-4}
export function fakeBlipTable(numEntries: number) {
  const table = new BlipTable();
  const numQuadrants = 4;
  const numRings = 4;

  let blipIndex = 0, quadrantIndex = 0, ringIndex = 0;
  while (blipIndex < numEntries) {
    table.appendBlip(`blip-ref-${blipIndex + 1}`, `blipTitle-${blipIndex + 1}`,
      `quadrant-${quadrantIndex + 1}`, `ring-${ringIndex + 1}`, "descr");
    blipIndex += 1;
    quadrantIndex += 1;
    ringIndex += 1;
    // wrap around if we need to
    quadrantIndex = quadrantIndex % numQuadrants;
    ringIndex = ringIndex % numRings;
  }

  return table;
}
