import { fakeBlipTable } from "../util/testing/fakeBlipTable";
import { Blip } from "./blip";
import { BlipTable } from "./blipTable";

describe('BlipTable construction tests', () => {
  test("Default construction gives empty table", () => {
    expect(fakeBlipTable(0).size).toBe(0);
  })
  test("Construction with list of blip properties reads expected properties", () => {
    const blipProps = [
      {
        id: 1,
        refName: "refname-1",
        title: "title 1",
        quadrantId: "quadrant-1",
        ring: "ring-1",
        description: "My description 1",
        comments: "My comments 1"
      },
      {
        id: 2,
        refName: "refname-2",
        title: "title 2",
        quadrantId: "quadrant-2",
        ring: "ring-2",
        description: "My description 2",
        comments: "My comments 2"
      }
    ]

    const table = new BlipTable(blipProps);

    expect(table.size).toBe(2);
  })
});

describe('BlipTable addBlip', () => {
  test("addBlip increases size by 1", () => {
    const numEntriesBefore = 1;
    const table = fakeBlipTable(numEntriesBefore);
    table.appendBlip("ref-name", "blipTitle", "quadrant", "ring", "desc", "comments");
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

    const blip = table.getById(1);
    expect(blip?.title).toBe("blipTitle-1");
    expect(blip?.quadrantId).toBe("quadrant-1");
    expect(blip?.ring).toBe("ring-1");
    expect(blip?.description).toBe("descr");
    expect(blip?.comments).toBe("comments");
  })
});

describe('BlipTable map-like functions', () => {
  test('ids returns iterable of all ids', () => {
    const numEntries = 3;
    const table = fakeBlipTable(numEntries);

    expect([1, 2, 3]).toEqual(Array.from(table.ids()));
  })
  test('values returns iterable of all Blips', () => {
    const numEntries = 3;
    const table = fakeBlipTable(numEntries);

    expect([table.getById(1), table.getById(2), table.getById(3)]).toEqual(Array.from(table.values()));
  })
  test('map iterates through all blips and produces new array', () => {
    const numEntries = 2;
    const table = fakeBlipTable(numEntries);

    const ids = table.map((blip: Blip) => blip.id);
    expect(ids).toEqual(Array.from(table.ids()));
  })
});

describe('BlipTable get', () => {
  test('getById returnd expected blip if it exists', () => {
    const table = fakeBlipTable(2);

    expect(table.getById(2)?.title).toBe('blipTitle-2');
  })
  test('getById return undefined if id does not exist', () => {
    const table = fakeBlipTable(2);

    expect(table.getById(3)).toBe(undefined);
  })
  test('getByRef returnd expected blip if it exists', () => {
    const table = fakeBlipTable(2);

    expect(table.getByRef('blip-ref-2')?.title).toBe('blipTitle-2');
  })
  test('getByRef return undefined if id does not exist', () => {
    const table = fakeBlipTable(2);

    expect(table.getByRef('unknown')).toBe(undefined);
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
