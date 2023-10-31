import { Blip } from "./blip";
import { BlipTable } from "./blipTable";

// Create a fake table of data for testing
// The entries are distributed over 4 rings and 4 quadrants in the pattern
//   id, quadrant-1, ring-{1-4}
//   id, quadrant-2, ring-{1-4}
//   id, quadrant-3, ring-{1-4}
//   id, quadrant-4, ring-{1-4}
function fakeBlipTable(numEntries: number) {
  const table = new BlipTable();
  const numQuadrants = 4;
  const numRings = 4;

  let blipIndex = 0, quadrantIndex = 0, ringIndex = 0;
  while (blipIndex < numEntries) {
    table.appendBlip(`blipTitle-${blipIndex + 1}`,
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

describe('BlipTable construction tests', () => {
  test("Default construction gives empty table", () => {
    expect(fakeBlipTable(0).size).toBe(0);
  })
});

describe('BlipTable addBlip', () => {
  test("addBlip increases size by 1", () => {
    const numEntriesBefore = 1;
    const table = fakeBlipTable(numEntriesBefore);
    table.appendBlip("blipTitle", "quadrant", "ring", "desc");
    expect(table.size).toBe(numEntriesBefore + 1);
  })
  test("addBlip assigns unique id to new blip", () => {
    const numEntries = 2;
    const table = fakeBlipTable(numEntries);

    expect(table.size).toBe(numEntries);
    expect(new Set(table.ids()).size).toBe(numEntries);
  })
  test("addBlip assigns correct arguments to new blip", () => {
    const table = fakeBlipTable(1);

    const blip = table.get(1);
    expect(blip?.title).toBe("blipTitle-1");
    expect(blip?.quadrantId).toBe("quadrant-1");
    expect(blip?.ring).toBe("ring-1");
    expect(blip?.description).toBe("descr");
  })
});

describe('BlipTable.blips', () => {
  test('returns all added blips', () => {
    const numEntries = 2;
    const table = fakeBlipTable(numEntries);
    const blips = table.blips();

    expect(Array.from(blips).length).toBe(numEntries);
    const expectedIds = [1, 2];
    let counter = 0;
    Array.from(blips).forEach((blip: Blip) => {
      expect(blip.id).toBe(expectedIds[counter]);
      counter += 1;
    });
  })
});

describe('BlipTable.entries', () => {
  test('allows iteration over all elements', () => {
    const numEntries = 3;
    const table = fakeBlipTable(numEntries);

    let count = 0;
    for (const [_, blip] of table.entries()) {
      count += 1;
      expect(blip.title).toBe(`blipTitle-${count}`);
    }
    expect(count).toBe(numEntries);
    expect(count).toBe(table.size);
  })
}
);

describe('BlipTable get', () => {
  test('return expected blip if it exists', () => {
    const table = fakeBlipTable(2);

    expect(table.get(2)?.title).toBe('blipTitle-2');
  })
  test('return undefined if id does not exist', () => {
    const table = fakeBlipTable(2);

    expect(table.get(3)).toBe(undefined);
  })
});

describe('BlipTable.filterByQuadrant', () => {
  test('returns only blips with the requested quadrant', () => {
    const numEntries = 8;
    const table = fakeBlipTable(numEntries)

    const filtered = table.filterByQuadrant('quadrant-1');
    expect(filtered.size).toBe(2);
    expect(Array.from(filtered.ids())).toStrictEqual([1, 5]);
  })
}
);
describe('BlipTable.filterByRing', () => {
  test('returns only blips with the requested ring', () => {
    const numEntries = 8;
    const table = fakeBlipTable(numEntries);
    const filtered = table.filterByRing('ring-2');

    expect(filtered.size).toBe(2);
    expect(Array.from(filtered.ids())).toStrictEqual([2, 6]);
  })
}
);
