import { Blip } from "./blip";
import { BlipTable } from "./blipTable";

describe('BlipTable construction tests', () => {
  test("Default construction gives empty table", () => {
    expect(new BlipTable().size).toBe(0);
  })
});

describe('BlipTable addBlip', () => {
  test("addBlip increases size by 1", () => {
    const table = new BlipTable();
    table.appendBlip("blipTitle", "quadrant", "ring");
    expect(table.size).toBe(1);
  })
  test("addBlip assigns unique id to new blip", () => {
    const table = new BlipTable();
    table.appendBlip("blipTitle-1", "quadrant", "ring");
    table.appendBlip("blipTitle-2", "quadrant", "ring");

    expect(table.size).toBe(2);
    expect(new Set(table.ids()).size).toBe(2);
  })
});

describe('BlipTable.blips', () => {
  test('returns all added blips', () => {
    const table = new BlipTable();
    table.appendBlip("blipTitle-1", "quadrant", "ring");
    table.appendBlip("blipTitle-2", "quadrant", "ring");
    const blips = table.blips();

    expect(Array.from(blips).length).toBe(2);
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
    const table = new BlipTable();
    table.appendBlip("blipTitle-1", "quadrant", "ring");
    table.appendBlip("blipTitle-2", "quadrant", "ring");
    table.appendBlip("blipTitle-3", "quadrant", "ring");

    let count = 0;
    for (const [_, blip] of table.entries()) {
      count += 1;
      expect(blip.title).toBe(`blipTitle-${count}`);
    }
    expect(count).toBe(table.size);
  })
}
);

describe('BlipTable get', () => {
  test('return expected blip if it exists', () => {
    const table = new BlipTable();
    table.appendBlip("blipTitle-1", "quadrant", "ring");
    table.appendBlip("blipTitle-2", "quadrant", "ring");

    expect(table.get(2)?.title).toBe('blipTitle-2');
  })
  test('return undefined if id does not exist', () => {
    const table = new BlipTable();
    table.appendBlip("blipTitle-1", "quadrant", "ring");
    table.appendBlip("blipTitle-2", "quadrant", "ring");

    expect(table.get(3)).toBe(undefined);
  })
});

describe('BlipTable.filterByQuadrant', () => {
  test('returns only blips with the requested quadrant', () => {
    const table = new BlipTable();
    table.appendBlip("blipTitle-1", "quadrant-1", "ring");
    table.appendBlip("blipTitle-2", "quadrant-2", "ring");
    table.appendBlip("blipTitle-3", "quadrant-1", "ring");
    table.appendBlip("blipTitle-4", "quadrant-2", "ring");

    const filtered = table.filterByQuadrant('quadrant-1');
    expect(filtered.size).toBe(2);
    expect(Array.from(filtered.ids())).toStrictEqual([1, 3]);
  })
}
);
describe('BlipTable.filterByRing', () => {
  test('returns only blips with the requested ring', () => {
    const table = new BlipTable();
    table.appendBlip("blipTitle-1", "quadrant-1", "ring-1");
    table.appendBlip("blipTitle-2", "quadrant-2", "ring-2");
    table.appendBlip("blipTitle-3", "quadrant-1", "ring-3");
    table.appendBlip("blipTitle-4", "quadrant-2", "ring-2");

    const filtered = table.filterByRing('ring-2');
    expect(filtered.size).toBe(2);
    expect(Array.from(filtered.ids())).toStrictEqual([2, 4]);
  })
}
);
